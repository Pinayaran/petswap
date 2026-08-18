# Environments

## Current state

The repository intentionally contains only Supabase placeholders. Do not create a production project or commit a schema until the team agrees on the data model.

## Planned local workflow

When Squad C/QA introduces the first schema:

1. Install Docker Desktop (or another Docker-compatible container runtime) and the Supabase CLI.
2. Run `npx supabase start` from the repository root.
3. Put structural changes in timestamped files under `supabase/migrations/`.
4. Use `supabase/seed.sql` only for safe local demo data.
5. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `web/.env.local`; never commit secrets.

Local Supabase requires a Docker-compatible container runtime and starts Auth, Postgres, Storage, and other services locally. See the [official local-development guide](https://supabase.com/docs/guides/local-development).

## Security boundary

The browser receives only a Supabase publishable/anon key. Service-role keys never belong in Vite environment variables or browser code. Every exposed database table must have RLS enabled before client access.
