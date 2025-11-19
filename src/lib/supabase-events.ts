import { supabase, Event, Participant, EventProfile } from './supabase';

/**
 * Generate a unique 6-character event code
 */
function generateEventCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Create a new event
 */
export async function createEvent(
  hostId: string,
  name: string,
  description?: string,
  startDate?: string,
  endDate?: string
) {
  try {
    const code = generateEventCode();

    const { data, error } = await supabase
      .from('events')
      .insert([
        {
          name,
          code,
          host_id: hostId,
          description,
          start_date: startDate,
          end_date: endDate,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { event: data as Event, error: null };
  } catch (error: any) {
    console.error('Create event error:', error);
    return { event: null, error: error.message };
  }
}

/**
 * Get event by code
 */
export async function getEventByCode(code: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (error) throw error;

    return { event: data as Event, error: null };
  } catch (error: any) {
    console.error('Get event by code error:', error);
    return { event: null, error: error.message };
  }
}

/**
 * Get event by ID
 */
export async function getEventById(eventId: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single();

    if (error) throw error;

    return { event: data as Event, error: null };
  } catch (error: any) {
    console.error('Get event by ID error:', error);
    return { event: null, error: error.message };
  }
}

/**
 * Get all events hosted by a user
 */
export async function getHostedEvents(hostId: string) {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('host_id', hostId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { events: data as Event[], error: null };
  } catch (error: any) {
    console.error('Get hosted events error:', error);
    return { events: [], error: error.message };
  }
}

/**
 * Join an event as a participant
 */
export async function joinEvent(userId: string, eventId: string) {
  try {
    // Check if already a participant
    const { data: existing } = await supabase
      .from('participants')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (existing) {
      return { participant: existing, error: null, alreadyJoined: true };
    }

    const { data, error } = await supabase
      .from('participants')
      .insert([
        {
          user_id: userId,
          event_id: eventId,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { participant: data as Participant, error: null, alreadyJoined: false };
  } catch (error: any) {
    console.error('Join event error:', error);
    return { participant: null, error: error.message, alreadyJoined: false };
  }
}

/**
 * Get all events a user has joined
 */
export async function getUserEvents(userId: string) {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('event_id, events(*)')
      .eq('user_id', userId)
      .order('joined_at', { ascending: false });

    if (error) throw error;

    const events = data?.map((p: any) => p.events as Event) || [];
    return { events, error: null };
  } catch (error: any) {
    console.error('Get user events error:', error);
    return { events: [], error: error.message };
  }
}

/**
 * Create or update event profile for a user
 */
export async function createOrUpdateEventProfile(
  userId: string,
  eventId: string,
  profile: {
    name: string;
    role: string;
    major?: string;
    year?: string;
    skills_have: string[];
    skills_need: string[];
    bio?: string;
  }
) {
  try {
    // Check if profile exists
    const { data: existing } = await supabase
      .from('event_profiles')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    let data, error;

    if (existing) {
      // Update existing profile
      ({ data, error } = await supabase
        .from('event_profiles')
        .update({
          ...profile,
        })
        .eq('id', existing.id)
        .select()
        .single());
    } else {
      // Create new profile
      ({ data, error } = await supabase
        .from('event_profiles')
        .insert([
          {
            user_id: userId,
            event_id: eventId,
            ...profile,
          },
        ])
        .select()
        .single());
    }

    if (error) throw error;

    return { profile: data as EventProfile, error: null };
  } catch (error: any) {
    console.error('Create/update event profile error:', error);
    return { profile: null, error: error.message };
  }
}

/**
 * Get event profile for a user
 */
export async function getEventProfile(userId: string, eventId: string) {
  try {
    const { data, error } = await supabase
      .from('event_profiles')
      .select('*')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (error) throw error;

    return { profile: data as EventProfile, error: null };
  } catch (error: any) {
    console.error('Get event profile error:', error);
    return { profile: null, error: error.message };
  }
}

/**
 * Get all participants for an event
 */
export async function getEventParticipants(eventId: string) {
  try {
    const { data, error } = await supabase
      .from('participants')
      .select('*, event_profiles(*)')
      .eq('event_id', eventId)
      .order('joined_at', { ascending: false });

    if (error) throw error;

    return { participants: data as Participant[], error: null };
  } catch (error: any) {
    console.error('Get event participants error:', error);
    return { participants: [], error: error.message };
  }
}

/**
 * Check if user is event host
 */
export async function isEventHost(userId: string, eventId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('host_id')
      .eq('id', eventId)
      .single();

    if (error) throw error;

    return data?.host_id === userId;
  } catch (error: any) {
    console.error('Check event host error:', error);
    return false;
  }
}
