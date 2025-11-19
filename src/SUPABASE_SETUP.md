# 🚀 Dream Team Supabase Setup Guide

## 1️⃣ Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Project name**: Dream Team
   - **Database Password**: (save this securely)
   - **Region**: Choose closest to you
5. Wait for project to initialize (~2 minutes)

## 2️⃣ Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon/public key** (the long key under "Project API keys")

## 3️⃣ Configure Environment Variables

1. Create a `.env` file in your project root:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the values with your actual credentials from step 2

## 4️⃣ Install Dependencies

```bash
npm install @supabase/supabase-js
```

## 5️⃣ Create Database Tables

In your Supabase dashboard, go to **SQL Editor** and run these SQL commands:

### Create Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read all profiles
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

### Create Events Table
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  host_id UUID REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Anyone can view events
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  USING (true);

-- Only authenticated users can create events
CREATE POLICY "Authenticated users can create events"
  ON events FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Only host can update/delete event
CREATE POLICY "Host can update own event"
  ON events FOR UPDATE
  USING (auth.uid() = host_id);

CREATE POLICY "Host can delete own event"
  ON events FOR DELETE
  USING (auth.uid() = host_id);
```

### Create Participants Table
```sql
CREATE TABLE participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Participants can view other participants in their events
CREATE POLICY "View participants in joined events"
  ON participants FOR SELECT
  USING (
    event_id IN (
      SELECT event_id FROM participants WHERE user_id = auth.uid()
    )
  );

-- Users can join events
CREATE POLICY "Users can join events"
  ON participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can leave events
CREATE POLICY "Users can leave events"
  ON participants FOR DELETE
  USING (auth.uid() = user_id);
```

### Create Event Profiles Table
```sql
CREATE TABLE event_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  major TEXT,
  year TEXT,
  skills_have TEXT[] DEFAULT '{}',
  skills_need TEXT[] DEFAULT '{}',
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Enable Row Level Security
ALTER TABLE event_profiles ENABLE ROW LEVEL SECURITY;

-- Profiles visible to event participants
CREATE POLICY "View profiles in joined events"
  ON event_profiles FOR SELECT
  USING (
    event_id IN (
      SELECT event_id FROM participants WHERE user_id = auth.uid()
    )
  );

-- Users can create/update their own event profiles
CREATE POLICY "Users can manage own event profiles"
  ON event_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### Create Matches Table
```sql
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reasons TEXT[] DEFAULT '{}',
  bucket TEXT CHECK (bucket IN ('strong_complement', 'good_potential', 'explore')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_a_id, user_b_id)
);

-- Enable Row Level Security
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Users can view their own matches
CREATE POLICY "Users can view own matches"
  ON matches FOR SELECT
  USING (auth.uid() = user_a_id);

-- Users can create/delete their own matches
CREATE POLICY "Users can manage own matches"
  ON matches FOR ALL
  USING (auth.uid() = user_a_id)
  WITH CHECK (auth.uid() = user_a_id);

-- Add foreign key for event_profiles
ALTER TABLE matches
ADD CONSTRAINT matches_user_b_id_fkey
FOREIGN KEY (user_b_id, event_id)
REFERENCES event_profiles(user_id, event_id)
ON DELETE CASCADE;
```

### Create Connections Table
```sql
CREATE TABLE connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_a_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_b_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_a_id, user_b_id)
);

-- Enable Row Level Security
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- Users can view connections they're part of
CREATE POLICY "Users can view own connections"
  ON connections FOR SELECT
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Users can create connections
CREATE POLICY "Users can create connections"
  ON connections FOR INSERT
  WITH CHECK (auth.uid() = user_a_id);

-- Users can update connections they're part of
CREATE POLICY "Users can update own connections"
  ON connections FOR UPDATE
  USING (auth.uid() = user_a_id OR auth.uid() = user_b_id);

-- Add foreign key for event_profiles
ALTER TABLE connections
ADD CONSTRAINT connections_user_b_id_fkey
FOREIGN KEY (user_b_id, event_id)
REFERENCES event_profiles(user_id, event_id)
ON DELETE CASCADE;
```

## 6️⃣ Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Settings**
2. Under **Email Auth**, ensure:
   - ✅ Enable email signup
   - ✅ Enable email confirmations (optional - can disable for testing)
3. Click **Save**

## 7️⃣ (Optional) Setup Google OAuth

1. Go to **Authentication** → **Providers**
2. Click on **Google**
3. Follow the setup instructions to get OAuth credentials from Google Cloud Console
4. Paste your **Client ID** and **Client Secret**
5. Click **Save**

## 8️⃣ Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the Sign Up page
3. Create a test account
4. Check Supabase dashboard → **Authentication** → **Users** to see your new user

## 🔥 Database Features Included

✅ **Authentication**
- Email/password signup and login
- Session management
- Protected routes

✅ **Events System**
- Create events with unique codes
- Join events via code
- Host management

✅ **Event Profiles**
- Separate profile per event
- Skills, role, bio
- No cross-event data leakage

✅ **Matching Algorithm**
- Automatic match generation
- Skill complementarity
- Role compatibility
- Bucket categorization

✅ **Connections**
- Express interest
- Mutual matching
- Accept/decline

✅ **Real-time Updates** (optional)
- Live match updates
- Connection notifications
- Event participant changes

## 🛠️ Useful SQL Queries for Testing

### View all users
```sql
SELECT * FROM users;
```

### View all events with host names
```sql
SELECT e.*, u.name as host_name 
FROM events e 
JOIN users u ON e.host_id = u.id;
```

### View all participants in an event
```sql
SELECT p.*, u.name, ep.*
FROM participants p
JOIN users u ON p.user_id = u.id
LEFT JOIN event_profiles ep ON ep.user_id = p.user_id AND ep.event_id = p.event_id
WHERE p.event_id = 'your-event-id';
```

### View matches for a user
```sql
SELECT m.*, ep.name, ep.role, ep.skills_have
FROM matches m
JOIN event_profiles ep ON m.user_b_id = ep.user_id AND m.event_id = ep.event_id
WHERE m.user_a_id = 'your-user-id'
ORDER BY m.created_at DESC;
```

## 🐛 Troubleshooting

### "Invalid API key"
- Check your `.env` file has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Restart your dev server after changing `.env`

### "Row level security policy violation"
- Make sure you ran all the RLS policies in step 5
- Check you're authenticated when performing protected actions

### "Foreign key constraint violation"
- Ensure you're creating event profiles before generating matches
- Make sure users join events before creating profiles

### Database not updating
- Clear browser cache and localStorage
- Check Supabase dashboard logs: **Logs** → **Postgres Logs**

## 📚 Next Steps

1. ✅ Setup complete - start building!
2. 🧪 Test authentication flow
3. 🎯 Create test events and profiles
4. 🤝 Generate matches and connections
5. 🚀 Deploy to production when ready

## 🔐 Security Notes

- ⚠️ Never commit `.env` file to git
- ⚠️ Use Row Level Security (RLS) for all tables
- ⚠️ Validate user input on the frontend
- ⚠️ Use service role key only for admin/server operations
- ⚠️ Keep your database password secure

---

Need help? Check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
