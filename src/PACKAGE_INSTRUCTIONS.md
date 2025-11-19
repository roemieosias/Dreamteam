# 📦 Package Installation Instructions for Dream Team

## Required Dependencies

### Install Supabase Client

```bash
npm install @supabase/supabase-js
```

This is the only additional dependency needed for the Supabase backend integration.

## Verify Installation

After installing, verify it's in your `package.json`:

```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

## Already Installed (Existing)

These packages should already be in your Dream Team project:

- `react` - Core React library
- `react-dom` - React DOM rendering
- `motion/react` (framer-motion) - Animations
- `lucide-react` - Icons
- `tailwindcss` - Styling
- `vite` - Build tool

## Environment Setup

After installing `@supabase/supabase-js`, create your `.env` file:

```bash
cp .env.example .env
```

Then edit `.env` with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Development Server

Start your development server:

```bash
npm run dev
```

The environment variables will be automatically loaded by Vite.

## TypeScript Support

The Supabase client includes full TypeScript support. All types are defined in `/lib/supabase.ts`:

- `User`
- `Event`
- `EventProfile`
- `Participant`
- `Match`
- `Connection`

## Production Build

When building for production:

```bash
npm run build
```

Make sure your production environment has the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables set.

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"

Solution:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm install @supabase/supabase-js
```

### "import.meta.env.VITE_SUPABASE_URL is undefined"

Solution:
1. Check `.env` file exists in project root
2. Verify keys start with `VITE_` prefix
3. Restart dev server after changing `.env`

### TypeScript errors with Supabase types

Solution:
```bash
# Ensure TypeScript sees the types
npm install --save-dev @types/node
```

## Next Steps

1. ✅ Install `@supabase/supabase-js`
2. ✅ Create `.env` file with Supabase credentials
3. ✅ Follow `SUPABASE_SETUP.md` to create database tables
4. ✅ Follow `INTEGRATION_GUIDE.md` to integrate with app
5. 🚀 Start building!
