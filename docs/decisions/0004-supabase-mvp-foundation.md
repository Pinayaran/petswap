# ADR 0004: Commit the Supabase MVP foundation

**Status:** Accepted

## Context

ADR 0002 intentionally delayed schema work until the team had enough requirements to review the first data model. Task 1 now needs a reproducible Supabase-backed foundation for local development, CI/CD migration contracts, and the web app's first typed API adapters.

## Decision

Commit the Supabase local configuration, one timestamped MVP schema migration, safe seed data, generated TypeScript database types, and a practical team runbook. The schema covers auth-backed profiles, pets, listings, listing images, bookings, listing photo storage policies, RLS, database constraints, booking status transitions, and confirmed-booking overlap prevention with end-exclusive dates.

Start with one shared hosted Supabase project for demo/production. A later dev/staging split requires a separate documented decision rather than implicit project sprawl.

## Consequences

Local contributors can rebuild the database with `npx supabase db reset`, seed safe demo data, run the Vite app against local Supabase, and regenerate committed database types after schema changes.

The database now enforces authorization and booking conflict behavior; UI code must access Supabase through feature adapters/hooks instead of calling the shared client directly from components.

This ADR supersedes ADR 0002's placeholder-only decision for the MVP schema. Payments, messaging, ratings, identity verification, and complete CRUD screens remain out of scope.
