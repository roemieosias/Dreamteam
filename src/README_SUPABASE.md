# 🚀 Dream Team Supabase Backend

Complete backend infrastructure for Dream Team - a real-time, event-based team-matching platform.

## 📚 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)

## 🎯 Overview

### What's Included

✅ **Authentication System**
- Email/password signup and login
- Session management
- User profiles
- Protected routes

✅ **Event Management**
- Create events with unique join codes
- Join events as participants
- Event-specific user profiles
- Host controls

✅ **Smart Matching Algorithm**
- Skill-based complementarity
- Role compatibility scoring
- Automatic match generation
- Real-time updates

✅ **Connection System**
- Express interest in teammates
- Mutual matching detection
- Connection status tracking
- Privacy-focused design

✅ **Real-time Features** (Optional)
- Live match updates
- Connection notifications
- Event participant tracking

## 🚀 Quick Start

### 1. Setup (5 minutes)

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Copy environment template
cp .env.example .env

# Edit .env with your Supabase credentials
# (Get from https://supabase.com)
```

### 2. Create Database

Follow **SUPABASE_SETUP.md** to:
1. Create Supabase project
2. Run SQL schema
3. Enable Row Level Security
4. Configure authentication

### 3. Integrate with Frontend

Follow **INTEGRATION_GUIDE.md** for:
- Adding auth to your app
- Implementing event flows
- Displaying matches
- Managing connections

### 4. Test

```bash
# Start dev server
npm run dev

# Test Supabase connection
# (Use test functions in /lib/supabase-seed-data.ts)
```

## 🏗️ Architecture

### File Structure

```
/lib
  ├── supabase.ts              # Client & TypeScript types
  ├── supabase-auth.ts         # Authentication functions
  ├── supabase-events.ts       # Event management
  ├── supabase-matches.ts      # Matching & connections
  └── supabase-seed-data.ts    # Testing utilities

/components
  ├── LoginPageSupabase.tsx    # Login UI
  └── SignUpPageSupabase.tsx   # Signup UI

/hooks
  └── useAuth.ts               # Auth state management

/docs
  ├── SUPABASE_SETUP.md        # Database setup guide
  ├── INTEGRATION_GUIDE.md     # Integration instructions
  └── PACKAGE_INSTRUCTIONS.md  # Dependency management
```

### Database Tables

1. **users** - Global user accounts
2. **events** - Hackathons/class projects
3. **participants** - Event membership
4. **event_profiles** - Event-specific profiles
5. **matches** - Generated teammate suggestions
6. **connections** - Expressed interests

### Data Flow

```
User Signs Up → Creates Event OR Joins Event
                      ↓
              Creates Event Profile
                      ↓
          Matches Generated Automatically
                      ↓
         User Browses Matches → Express Interest
                      ↓
            Connection Created → Check Mutual
                      ↓
         If Mutual: Status = Accepted ✅
```

## 📖 API Reference

### Authentication

```typescript
// Sign up
import { signUp } from './lib/supabase-auth';
const { user, error } = await signUp(email, password, name);

// Sign in
import { signIn } from './lib/supabase-auth';
const { user, session, error } = await signIn(email, password);

// Sign out
import { signOut } from './lib/supabase-auth';
await signOut();

// Get current user
import { getCurrentUser } from './lib/supabase-auth';
const { user, error } = await getCurrentUser();
```

### Events

```typescript
// Create event
import { createEvent } from './lib/supabase-events';
const { event, error } = await createEvent(
  hostId,
  'HackMIT 2025',
  'Build amazing projects',
  startDate,
  endDate
);

// Get event by code
import { getEventByCode } from './lib/supabase-events';
const { event, error } = await getEventByCode('ABC123');

// Join event
import { joinEvent } from './lib/supabase-events';
const { participant, error } = await joinEvent(userId, eventId);

// Create event profile
import { createOrUpdateEventProfile } from './lib/supabase-events';
const { profile, error } = await createOrUpdateEventProfile(
  userId,
  eventId,
  {
    name: 'Alex Smith',
    role: 'Developer',
    skills_have: ['React', 'Python'],
    skills_need: ['UI/UX Design'],
    bio: 'Excited to build!',
  }
);
```

### Matching

```typescript
// Generate matches
import { generateMatchesForUser } from './lib/supabase-matches';
const { matches, error } = await generateMatchesForUser(userId, eventId);

// Get matches
import { getMatches } from './lib/supabase-matches';
const { matches, error } = await getMatches(userId, eventId);

// Express interest
import { expressInterest } from './lib/supabase-matches';
const { connection, mutual, error } = await expressInterest(
  userId,
  targetUserId,
  eventId
);

// Pass on match
import { passOnMatch } from './lib/supabase-matches';
await passOnMatch(userId, targetUserId, eventId);

// Get connections
import { getMutualConnections } from './lib/supabase-matches';
const { connections, error } = await getMutualConnections(userId, eventId);
```

### Real-time Subscriptions

```typescript
// Subscribe to matches
import { subscribeToMatches } from './lib/supabase-matches';
const subscription = subscribeToMatches(userId, eventId, (payload) => {
  console.log('New match:', payload);
});

// Unsubscribe
subscription.unsubscribe();
```

## 🗄️ Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,              -- References auth.users
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Events Table

```sql
CREATE TABLE events (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,        -- 6-char join code
  host_id UUID REFERENCES users,
  description TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Event Profiles Table

```sql
CREATE TABLE event_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users,
  event_id UUID REFERENCES events,
  name TEXT NOT NULL,
  role TEXT NOT NULL,               -- Developer, Designer, PM, etc.
  major TEXT,
  year TEXT,
  skills_have TEXT[],               -- Array of skills
  skills_need TEXT[],               -- Array of desired skills
  bio TEXT,
  UNIQUE(user_id, event_id)         -- One profile per event
);
```

### Matches Table

```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events,
  user_a_id UUID REFERENCES users,   -- The user viewing matches
  user_b_id UUID REFERENCES users,   -- The suggested match
  reasons TEXT[],                    -- Why they might click
  bucket TEXT,                       -- strong_complement | good_potential | explore
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_a_id, user_b_id)
);
```

### Connections Table

```sql
CREATE TABLE connections (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events,
  user_a_id UUID REFERENCES users,   -- Person expressing interest
  user_b_id UUID REFERENCES users,   -- Person receiving interest
  status TEXT DEFAULT 'pending',     -- pending | accepted | declined
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_a_id, user_b_id)
);
```

## 🔐 Security

### Row Level Security (RLS)

All tables have RLS policies:

```sql
-- Users can view all profiles
CREATE POLICY "View all profiles" ON users
  FOR SELECT USING (true);

-- Users can update own profile
CREATE POLICY "Update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Only view matches for self
CREATE POLICY "View own matches" ON matches
  FOR SELECT USING (auth.uid() = user_a_id);

-- And more... (see SUPABASE_SETUP.md)
```

### API Keys

- ✅ **anon/public key** - Safe for frontend (read-only + user auth)
- ⚠️ **service_role key** - Admin access (server-only, never expose!)

### Best Practices

1. Never commit `.env` to git
2. Use RLS for all data access
3. Validate inputs on frontend
4. Use prepared statements (built into Supabase)
5. Rotate keys if compromised

## 🧪 Testing

### Test Supabase Connection

```typescript
import { testSupabaseConnection } from './lib/supabase-seed-data';

// In console or component
testSupabaseConnection();
```

### Seed Test Data

```typescript
import { seedTestData } from './lib/supabase-seed-data';

// Create test event
const { event, eventCode } = await seedTestData(userId);
console.log('Test event code:', eventCode);
```

### Generate Random Participants

```typescript
import { generateRandomParticipant } from './lib/supabase-seed-data';

const participant = generateRandomParticipant();
// Returns mock participant data for testing
```

## 🚀 Deployment

### Environment Variables

Set these in your hosting platform (Vercel, Netlify, etc.):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Build Command

```bash
npm run build
```

### Production Checklist

- [ ] Supabase project created
- [ ] Database tables created with RLS
- [ ] Environment variables configured
- [ ] Email templates customized (Auth → Email Templates)
- [ ] Domain added to Auth → URL Configuration
- [ ] CORS enabled for your domain
- [ ] Rate limiting configured
- [ ] Backup schedule enabled

## 📊 Monitoring

### Supabase Dashboard

- **Logs** → Postgres logs, function logs
- **API** → Request statistics
- **Database** → Query performance
- **Auth** → User signup/login metrics

### Useful Queries

```sql
-- Active users
SELECT COUNT(*) FROM auth.users WHERE last_sign_in_at > NOW() - INTERVAL '7 days';

-- Events by date
SELECT DATE(created_at), COUNT(*) FROM events GROUP BY DATE(created_at);

-- Match success rate
SELECT 
  COUNT(DISTINCT m.user_a_id) as users_with_matches,
  COUNT(*) as total_matches,
  COUNT(CASE WHEN c.status = 'accepted' THEN 1 END) as mutual_matches
FROM matches m
LEFT JOIN connections c ON m.user_a_id = c.user_a_id AND m.user_b_id = c.user_b_id;
```

## 🐛 Troubleshooting

### Common Issues

**"Invalid API key"**
- Check `.env` file has correct keys
- Restart dev server after changing `.env`

**"Row level security policy violation"**
- Ensure user is authenticated
- Check RLS policies in Supabase dashboard

**"Foreign key constraint violation"**
- Create event profile before generating matches
- Ensure user joined event before creating profile

**No matches generated**
- Check other users have event profiles
- Verify skills arrays are not empty
- Run `generateMatchesForUser()` manually

### Debug Mode

```typescript
// Enable detailed error logging
const { data, error } = await supabase.from('users').select('*');
console.log('Query result:', { data, error });
```

## 🤝 Contributing

### Adding New Features

1. Update TypeScript types in `/lib/supabase.ts`
2. Add SQL migrations to `SUPABASE_SETUP.md`
3. Create helper functions in appropriate lib file
4. Update integration guide with examples
5. Add tests

### Code Style

- Use async/await (not promises)
- Return `{ data, error }` pattern
- Add JSDoc comments to functions
- Export types from `/lib/supabase.ts`

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase React Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Supabase Discord](https://discord.supabase.com)

## 📄 License

Dream Team Supabase Backend - MIT License

---

**Built with** ⚡ Dream Team | Powered by Supabase | Made for hackathons and class projects

For questions or issues, refer to the guides in this repository or reach out to the Dream Team community!
