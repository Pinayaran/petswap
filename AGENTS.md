# Agent instructions

## Start here

This is a React web MVP for a pet-sitting marketplace. It is intentionally feature-based, ratings-free, and has no fixed user roles: one user may own pets, host listings, and request bookings.

Before changing code, identify the relevant requirement and read only the documentation needed for the task.

| Document | Read it when you need to… |
| --- | --- |
| `docs/requirements.md` | Confirm feature scope or acceptance criteria. Ratings, payments, messaging, verification, and availability calendars are out of scope. |
| `docs/getting-started.md` | Join the project, run it locally, take a Google Sheet card, and open a first PR. |
| `docs/design.md` | Implement or review UI. Team A's final VibeCode app lives in a separate repository and is the visual/interaction reference. |
| `docs/architecture.md` | Add a route, feature, shared module, or Supabase integration. |
| `docs/conventions.md` | Write code, use AI assistance, name branches/commits, or prepare a pull request. |
| `docs/team-protocol.md` | Understand squad ownership, ceremonies, Google Sheet process, handoffs, or definition of done. |
| `docs/testing.md` | Add tests, record evidence, or decide which checks a change requires. |
| `docs/ci-cd.md` | Work on the GitHub quality gate or future deployment. |
| `docs/environments.md` | Begin local/hosted Supabase work or configure environment variables. |
| `docs/decisions/` | Change a durable, non-obvious architecture or product-shaping decision. Read the ADR guide in `docs/decisions/README.md` first. ADRs are historical records—add a later ADR; do not rewrite an old one. |
| `docs/templates/` | Record manual-test evidence. |

## Repository layout

| Path | Contents |
| --- | --- |
| `web/` | Vite + React + TypeScript SPA. Read `web/README.md` for local setup. |
| `supabase/` | Placeholder for future config, migrations, and Edge Functions. Do not add an unreviewed schema. |
| `docs/` | Current project documentation, ADRs, and QA templates. |
| `scripts/` | Idempotent maintenance scripts only. |

## Feature boundaries

- `web/src/app/` composes routes only.
- `web/src/features/<feature>/` owns its components, hooks, pure functions, types, and `index.ts` public API.
- Cross-feature imports must use the other feature's `index.ts`.
- `web/src/shared/` is only for code used by two or more features.
- Supabase calls belong in feature hooks/API adapters, never in UI components.

## Booking rules

- Only confirmed bookings on the same listing block overlapping dates.
- Date ranges are end-exclusive: back-to-back bookings are valid.
- Keep `hasBookingConflict()` and `isValidBookingTransition()` pure and Jest-tested.
- Browser validation is not authorization. When Supabase is added, enforce ownership and conflict rules through RLS/database constraints as well.

## Workflow

Branch from `main`, open PRs back to `main`, and never push directly to `main`. Before opening a PR that changes the web app, run from `web/`:

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

The authoritative backlog, sprint plan, burndown, and DSM notes are in the team Google Sheet—not in this repository.
