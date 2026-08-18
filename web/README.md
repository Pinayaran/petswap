# Web application

The app is a Vite React TypeScript SPA.

## Setup

Requires Node.js 20.19+ or 22.12+ (Vite requirement).

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` when Supabase integration begins. The app intentionally has no live Supabase calls yet.

## Quality checks

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

See [`../docs/architecture.md`](../docs/architecture.md) and [`../docs/testing.md`](../docs/testing.md).
