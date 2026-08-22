# Web application

The app is a Vite React TypeScript SPA.

## Setup

Requires Node.js 20.19+ or 22.12+ (Vite requirement).

```bash
npm install
npm run dev
```

Start Supabase from the repository root first when you need live data:

```bash
npx supabase start
```

Copy `.env.example` to `.env.local`, then paste the local anon key printed by Supabase into `VITE_SUPABASE_PUBLISHABLE_KEY`. Do not use a service-role key in Vite.

Regenerate database types after migration changes:

```bash
npm run supabase:types
```

## Quality checks

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

See [`../docs/architecture.md`](../docs/architecture.md) and [`../docs/testing.md`](../docs/testing.md).
