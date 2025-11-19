# 🔌 Dream Team Supabase Integration Guide

This guide shows how to integrate the Supabase backend with your existing Dream Team frontend.

## 📦 Files Created

### Core Supabase Files
- `/lib/supabase.ts` - Supabase client and TypeScript types
- `/lib/supabase-auth.ts` - Authentication functions
- `/lib/supabase-events.ts` - Event and participant management
- `/lib/supabase-matches.ts` - Matching and connection logic

### React Components
- `/components/LoginPageSupabase.tsx` - Login with Supabase auth
- `/components/SignUpPageSupabase.tsx` - Sign up with Supabase auth
- `/hooks/useAuth.ts` - Authentication state hook

### Documentation
- `/SUPABASE_SETUP.md` - Complete database setup guide
- `/.env.example` - Environment variables template

## 🚀 Quick Start

### 1. Setup Supabase (5 minutes)

Follow the complete instructions in `/SUPABASE_SETUP.md`:

```bash
# 1. Create Supabase project at supabase.com
# 2. Copy your credentials
# 3. Create .env file with your keys
# 4. Run SQL commands to create tables
# 5. Install dependencies
npm install @supabase/supabase-js
```

### 2. Update App.tsx to Use Supabase Auth

Replace your existing login/signup pages with the Supabase versions:

```tsx
import { useAuth } from './hooks/useAuth';
import { LoginPageSupabase } from './components/LoginPageSupabase';
import { SignUpPageSupabase } from './components/SignUpPageSupabase';

function App() {
  const { user, profile, loading, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('landing');

  if (loading) {
    return <LoadingScreen />;
  }

  // Route to login/signup pages
  if (currentPage === 'login') {
    return (
      <LoginPageSupabase
        onLoginSuccess={() => setCurrentPage('landing')}
        onSignUp={() => setCurrentPage('signup')}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignUpPageSupabase
        onSignUpSuccess={() => setCurrentPage('landing')}
        onLogin={() => setCurrentPage('login')}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  // ... rest of your app
}
```

### 3. Update Event Creation to Use Supabase

```tsx
import { createEvent } from './lib/supabase-events';
import { useAuth } from './hooks/useAuth';

function CreateEventPage() {
  const { user } = useAuth();

  const handleCreateEvent = async (name: string, description: string) => {
    if (!user) return;

    const { event, error } = await createEvent(
      user.id,
      name,
      description,
      startDate,
      endDate
    );

    if (error) {
      console.error('Error creating event:', error);
      return;
    }

    // Event created! Show event code to user
    console.log('Event code:', event.code);
    // Navigate to event dashboard
  };
}
```

### 4. Update Join Event Flow

```tsx
import { getEventByCode, joinEvent } from './lib/supabase-events';
import { useAuth } from './hooks/useAuth';

function JoinEventPage() {
  const { user } = useAuth();

  const handleJoinEvent = async (code: string) => {
    if (!user) return;

    // 1. Find event by code
    const { event, error: eventError } = await getEventByCode(code);
    
    if (eventError || !event) {
      console.error('Event not found');
      return;
    }

    // 2. Join event as participant
    const { participant, error: joinError } = await joinEvent(user.id, event.id);
    
    if (joinError) {
      console.error('Error joining event:', joinError);
      return;
    }

    // 3. Navigate to event profile setup
    // (user needs to create event-specific profile)
  };
}
```

### 5. Update Event Profile Setup

```tsx
import { createOrUpdateEventProfile } from './lib/supabase-events';
import { useAuth } from './hooks/useAuth';

function EventProfileSetupPage({ eventId }: { eventId: string }) {
  const { user } = useAuth();

  const handleSaveProfile = async (profileData: {
    name: string;
    role: string;
    major: string;
    year: string;
    skills_have: string[];
    skills_need: string[];
    bio: string;
  }) => {
    if (!user) return;

    const { profile, error } = await createOrUpdateEventProfile(
      user.id,
      eventId,
      profileData
    );

    if (error) {
      console.error('Error saving profile:', error);
      return;
    }

    // Profile saved! Navigate to match list
  };
}
```

### 6. Generate and Display Matches

```tsx
import { generateMatchesForUser, getMatches } from './lib/supabase-matches';
import { useAuth } from './hooks/useAuth';
import { useEffect, useState } from 'react';

function MatchListPage({ eventId }: { eventId: string }) {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Generate matches for this user
    generateMatchesForUser(user.id, eventId).then(() => {
      // Then fetch matches
      loadMatches();
    });
  }, [user, eventId]);

  const loadMatches = async () => {
    if (!user) return;

    const { matches: matchData, error } = await getMatches(user.id, eventId);
    
    if (error) {
      console.error('Error loading matches:', error);
      return;
    }

    setMatches(matchData);
  };

  // ... render matches
}
```

### 7. Handle Interest and Connections

```tsx
import { expressInterest, passOnMatch, getMutualConnections } from './lib/supabase-matches';
import { useAuth } from './hooks/useAuth';

function MatchCard({ match, eventId }: { match: Match; eventId: string }) {
  const { user } = useAuth();

  const handleInterested = async () => {
    if (!user) return;

    const { connection, mutual, error } = await expressInterest(
      user.id,
      match.user_b_id,
      eventId
    );

    if (error) {
      console.error('Error expressing interest:', error);
      return;
    }

    if (mutual) {
      // It's a mutual match! Show celebration
      console.log('Mutual match! 🎉');
    }

    // Remove from match list
  };

  const handlePass = async () => {
    if (!user) return;

    const { error } = await passOnMatch(user.id, match.user_b_id, eventId);

    if (error) {
      console.error('Error passing on match:', error);
      return;
    }

    // Remove from match list
  };

  // ... render card with buttons
}
```

### 8. Display Connections

```tsx
import { getMutualConnections } from './lib/supabase-matches';
import { useAuth } from './hooks/useAuth';
import { useEffect, useState } from 'react';

function ConnectionsPage({ eventId }: { eventId: string }) {
  const { user } = useAuth();
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if (!user) return;

    loadConnections();
  }, [user, eventId]);

  const loadConnections = async () => {
    if (!user) return;

    const { connections: connData, error } = await getMutualConnections(
      user.id,
      eventId
    );

    if (error) {
      console.error('Error loading connections:', error);
      return;
    }

    setConnections(connData);
  };

  // ... render connections
}
```

## 🔄 Real-time Updates (Optional)

Enable real-time updates for matches and connections:

```tsx
import { subscribeToMatches, subscribeToConnections } from './lib/supabase-matches';
import { useEffect } from 'react';

function MatchListPage({ eventId }: { eventId: string }) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Subscribe to match updates
    const matchSubscription = subscribeToMatches(
      user.id,
      eventId,
      (payload) => {
        console.log('Match update:', payload);
        // Reload matches
        loadMatches();
      }
    );

    // Subscribe to connection updates
    const connectionSubscription = subscribeToConnections(
      user.id,
      eventId,
      (payload) => {
        console.log('Connection update:', payload);
        // Show notification or reload connections
      }
    );

    // Cleanup subscriptions
    return () => {
      matchSubscription.unsubscribe();
      connectionSubscription.unsubscribe();
    };
  }, [user, eventId]);

  // ... rest of component
}
```

## 🎯 Complete User Flow

1. **Landing Page** → User enters event code
2. **Check Auth** → If not logged in, redirect to Login/Signup
3. **Login/Signup** → Use `LoginPageSupabase` or `SignUpPageSupabase`
4. **Join Event** → Call `getEventByCode()` + `joinEvent()`
5. **Event Profile Setup** → Call `createOrUpdateEventProfile()`
6. **Generate Matches** → Call `generateMatchesForUser()`
7. **Match List** → Display matches, handle interest/pass
8. **Connections** → Show mutual connections
9. **Event Dashboard** (for hosts) → View participants, manage event

## 🔐 Protected Routes

Protect pages that require authentication:

```tsx
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

// Usage
<ProtectedRoute>
  <MatchListPage eventId={eventId} />
</ProtectedRoute>
```

## 📊 Checking Event Membership

Before showing matches or event data:

```tsx
import { getEventProfile } from './lib/supabase-events';

async function checkEventAccess(userId: string, eventId: string) {
  const { profile, error } = await getEventProfile(userId, eventId);
  
  if (error || !profile) {
    // User hasn't set up profile for this event
    return false;
  }

  return true;
}
```

## 🎨 UI State Management

Manage loading, error, and success states:

```tsx
function EventProfileSetupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setIsSubmitting(true);
    setError(null);

    const { profile, error: saveError } = await createOrUpdateEventProfile(...);

    if (saveError) {
      setError(saveError);
      setIsSubmitting(false);
      return;
    }

    setSuccess(true);
    // Navigate or show success message
  };

  // ... render with loading/error states
}
```

## 🐛 Debugging Tips

### Check Authentication
```tsx
const { user, session, profile, loading } = useAuth();
console.log('User:', user);
console.log('Profile:', profile);
console.log('Session:', session);
```

### Check Database Connection
```tsx
import { supabase } from './lib/supabase';

async function testConnection() {
  const { data, error } = await supabase.from('users').select('count');
  console.log('Connection test:', { data, error });
}
```

### View Supabase Logs
- Go to Supabase Dashboard → Logs → Postgres Logs
- Check for errors or slow queries

## 🚀 Next Steps

1. ✅ Complete Supabase setup (`SUPABASE_SETUP.md`)
2. ✅ Install dependencies (`npm install @supabase/supabase-js`)
3. ✅ Update App.tsx to use `useAuth` hook
4. ✅ Replace Login/Signup pages with Supabase versions
5. ✅ Update event flows to use Supabase functions
6. ✅ Test authentication and event creation
7. ✅ Test matching and connections
8. 🎉 Deploy to production!

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Supabase React Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

---

**Need Help?** Check `SUPABASE_SETUP.md` for database setup or reach out to the Dream Team community!
