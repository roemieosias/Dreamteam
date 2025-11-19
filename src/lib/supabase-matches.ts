import { supabase, Match, Connection, EventProfile } from './supabase';

/**
 * Calculate match reasons between two profiles
 */
function calculateMatchReasons(
  profileA: EventProfile,
  profileB: EventProfile
): { reasons: string[]; bucket: 'strong_complement' | 'good_potential' | 'explore' } {
  const reasons: string[] = [];
  let score = 0;

  // Check for complementary skills (A has what B needs)
  const aHelpsB = profileA.skills_have.filter((skill) =>
    profileB.skills_need.includes(skill)
  );
  if (aHelpsB.length > 0) {
    reasons.push(`They need: ${aHelpsB.slice(0, 2).join(', ')}`);
    score += aHelpsB.length * 3;
  }

  // Check for complementary skills (B has what A needs)
  const bHelpsA = profileB.skills_have.filter((skill) =>
    profileA.skills_need.includes(skill)
  );
  if (bHelpsA.length > 0) {
    reasons.push(`You need: ${bHelpsA.slice(0, 2).join(', ')}`);
    score += bHelpsA.length * 3;
  }

  // Check for shared skills
  const sharedSkills = profileA.skills_have.filter((skill) =>
    profileB.skills_have.includes(skill)
  );
  if (sharedSkills.length > 0) {
    reasons.push(`Both have: ${sharedSkills.slice(0, 2).join(', ')}`);
    score += sharedSkills.length;
  }

  // Check for role complementarity
  const roles = [profileA.role, profileB.role];
  if (
    (roles.includes('Developer') && roles.includes('Designer')) ||
    (roles.includes('Developer') && roles.includes('Product Manager')) ||
    (roles.includes('Designer') && roles.includes('Product Manager'))
  ) {
    reasons.push('Complementary roles');
    score += 2;
  }

  // Determine bucket
  let bucket: 'strong_complement' | 'good_potential' | 'explore';
  if (score >= 6) {
    bucket = 'strong_complement';
  } else if (score >= 3) {
    bucket = 'good_potential';
  } else {
    bucket = 'explore';
  }

  // If no reasons found, add a generic one
  if (reasons.length === 0) {
    reasons.push('Similar interests');
  }

  return { reasons: reasons.slice(0, 3), bucket };
}

/**
 * Generate matches for a specific user in an event
 */
export async function generateMatchesForUser(userId: string, eventId: string) {
  try {
    // 1. Get user's profile
    const { data: userProfile, error: userError } = await supabase
      .from('event_profiles')
      .select('*')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (userError) throw userError;
    if (!userProfile) throw new Error('User profile not found');

    // 2. Get all other participants' profiles
    const { data: otherProfiles, error: othersError } = await supabase
      .from('event_profiles')
      .select('*')
      .eq('event_id', eventId)
      .neq('user_id', userId);

    if (othersError) throw othersError;
    if (!otherProfiles || otherProfiles.length === 0) {
      return { matches: [], error: null };
    }

    // 3. Calculate matches
    const matches = otherProfiles.map((otherProfile: EventProfile) => {
      const { reasons, bucket } = calculateMatchReasons(userProfile, otherProfile);

      return {
        event_id: eventId,
        user_a_id: userId,
        user_b_id: otherProfile.user_id,
        reasons,
        bucket,
      };
    });

    // 4. Delete existing matches for this user in this event
    await supabase
      .from('matches')
      .delete()
      .eq('event_id', eventId)
      .eq('user_a_id', userId);

    // 5. Insert new matches
    const { data, error } = await supabase.from('matches').insert(matches).select();

    if (error) throw error;

    return { matches: data as Match[], error: null };
  } catch (error: any) {
    console.error('Generate matches error:', error);
    return { matches: [], error: error.message };
  }
}

/**
 * Get matches for a user in an event
 */
export async function getMatches(userId: string, eventId: string) {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select('*, event_profiles!matches_user_b_id_fkey(*)')
      .eq('event_id', eventId)
      .eq('user_a_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to include profile
    const matches = (data || []).map((match: any) => ({
      ...match,
      user_b_profile: match.event_profiles,
    }));

    return { matches: matches as Match[], error: null };
  } catch (error: any) {
    console.error('Get matches error:', error);
    return { matches: [], error: error.message };
  }
}

/**
 * Express interest in a match (create connection)
 */
export async function expressInterest(userId: string, targetUserId: string, eventId: string) {
  try {
    // Check if connection already exists
    const { data: existing } = await supabase
      .from('connections')
      .select('id, status')
      .eq('event_id', eventId)
      .or(`and(user_a_id.eq.${userId},user_b_id.eq.${targetUserId}),and(user_a_id.eq.${targetUserId},user_b_id.eq.${userId})`)
      .single();

    if (existing) {
      return { connection: existing, error: null, alreadyExists: true };
    }

    const { data, error } = await supabase
      .from('connections')
      .insert([
        {
          event_id: eventId,
          user_a_id: userId,
          user_b_id: targetUserId,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Check if there's a mutual interest
    const { data: mutual } = await supabase
      .from('connections')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_a_id', targetUserId)
      .eq('user_b_id', userId)
      .single();

    // If mutual interest exists, update both to accepted
    if (mutual) {
      await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', data.id);

      await supabase
        .from('connections')
        .update({ status: 'accepted' })
        .eq('id', mutual.id);

      return { connection: { ...data, status: 'accepted' }, error: null, alreadyExists: false, mutual: true };
    }

    return { connection: data as Connection, error: null, alreadyExists: false, mutual: false };
  } catch (error: any) {
    console.error('Express interest error:', error);
    return { connection: null, error: error.message, alreadyExists: false, mutual: false };
  }
}

/**
 * Pass on a match (remove from list)
 */
export async function passOnMatch(userId: string, targetUserId: string, eventId: string) {
  try {
    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('event_id', eventId)
      .eq('user_a_id', userId)
      .eq('user_b_id', targetUserId);

    if (error) throw error;

    return { error: null };
  } catch (error: any) {
    console.error('Pass on match error:', error);
    return { error: error.message };
  }
}

/**
 * Get connections for a user in an event
 */
export async function getConnections(userId: string, eventId: string) {
  try {
    const { data, error } = await supabase
      .from('connections')
      .select('*, event_profiles!connections_user_b_id_fkey(*)')
      .eq('event_id', eventId)
      .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to include profile
    const connections = (data || []).map((conn: any) => ({
      ...conn,
      user_b_profile: conn.event_profiles,
    }));

    return { connections: connections as Connection[], error: null };
  } catch (error: any) {
    console.error('Get connections error:', error);
    return { connections: [], error: error.message };
  }
}

/**
 * Get mutual connections (accepted) for a user in an event
 */
export async function getMutualConnections(userId: string, eventId: string) {
  try {
    const { data, error } = await supabase
      .from('connections')
      .select('*, event_profiles!connections_user_b_id_fkey(*)')
      .eq('event_id', eventId)
      .eq('status', 'accepted')
      .or(`user_a_id.eq.${userId},user_b_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Transform data to include the other person's profile
    const connections = (data || []).map((conn: any) => {
      const isUserA = conn.user_a_id === userId;
      return {
        ...conn,
        other_user_id: isUserA ? conn.user_b_id : conn.user_a_id,
        user_b_profile: conn.event_profiles,
      };
    });

    return { connections: connections as Connection[], error: null };
  } catch (error: any) {
    console.error('Get mutual connections error:', error);
    return { connections: [], error: error.message };
  }
}

/**
 * Subscribe to real-time match updates
 */
export function subscribeToMatches(
  userId: string,
  eventId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`matches:${eventId}:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'matches',
        filter: `event_id=eq.${eventId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Subscribe to real-time connection updates
 */
export function subscribeToConnections(
  userId: string,
  eventId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`connections:${eventId}:${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'connections',
        filter: `event_id=eq.${eventId}`,
      },
      callback
    )
    .subscribe();
}
