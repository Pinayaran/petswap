# Environments

## Current model

PetSwap begins with one shared hosted Supabase project for demo/production:

```text
SUPABASE_PROJECT_REF=gqtdnckwubfdghynavwg
VITE_SUPABASE_URL=https://gqtdnckwubfdghynavwg.supabase.co
```

A separate dev or staging project can be added later only when the team documents why it is needed, who owns it, and how migrations move through the environments.

Local development uses the committed `supabase/config.toml`, timestamped migrations, and `supabase/seed.sql`.

## Local setup

Prerequisites:

- Node.js 20.19+ or 22.12+
- Docker Desktop or another Docker-compatible runtime
- Supabase CLI through `npx`

From the repository root:

```bash
npx supabase start
npx supabase db reset
```

For the shared hosted project, first ask a project owner to add you to the Supabase organization/project. Then copy the committed example into the Vite app and fill in the URL and publishable key from Supabase Project Settings:

```bash
cp .env.local.example web/.env.local
```

For a fully local stack, copy the web example instead and paste the local anon key printed by `supabase start`:

```bash
cp web/.env.example web/.env.local
```

Use only the local anon/publishable key. Service-role keys are for trusted server processes only and must not appear in browser env vars, committed docs, screenshots, or client code.

## Daily commands

Create a migration:

```bash
npx supabase migration new short_description
```

Rebuild and seed the local database:

```bash
npx supabase db reset
```

Inspect local Studio:

```text
http://127.0.0.1:54323
```

Regenerate web database types:

```bash
cd web
npm run supabase:types
```

## Verifying migrations

Before review, run:

```bash
npx supabase db reset
cd web
npm run typecheck
npm test -- --runInBand
```

For database review, inspect:

- RLS is enabled on `profiles`, `pets`, `listings`, `listing_images`, and `bookings`.
- Public listing reads return only `status = 'published'` rows with no `deleted_at`.
- Owners can modify only their own profiles, pets, listings, and listing images.
- Booking requesters can create and cancel only their own bookings.
- Listing owners can confirm, decline, or complete incoming bookings through valid transitions.
- Confirmed bookings cannot overlap for the same listing, and back-to-back dates are allowed.

The SQL smoke checks in `supabase/tests/database_contract.sql` are intentionally simple contract checks. Use Supabase Studio, SQL editor JWT impersonation, or API-level tests for actor-specific RLS review until end-to-end auth flows are automated.

## Hosted push workflow

After a reviewer accepts a migration:

```bash
npx supabase login
npx supabase link --project-ref gqtdnckwubfdghynavwg
npx supabase db diff --linked
npx supabase db push --dry-run
npx supabase db push
```

`db diff --linked` and `db push --dry-run` are safety checks. If they show unexpected remote drift, stop and resolve the migration history before pushing.
