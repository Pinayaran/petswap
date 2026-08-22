# Testing strategy

Testing is required evidence, not a final-week activity.

## Test layers

| Layer | Tool | Owner and expectation |
| --- | --- | --- |
| Pure business rules | Jest | Unit-test booking conflict and status-transition rules; add tests for validation and transformations. |
| React components | Jest + React Testing Library | Cover form validation, empty/error states, and protected UI behaviour. |
| End-to-end flow | Playwright | Cover login → booking request → confirmation → status verification once Supabase test data is available. |
| Manual UI checks | Markdown evidence | Squad B records listing/search cases; QA records regressions using the template. |

## Required checks

Run from `web/` before opening a PR:

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

Run Playwright when the changed journey is testable against the configured environment. Record expected result, actual result, pass/fail, environment, and evidence in the relevant PR or [`templates/manual-test.md`](templates/manual-test.md). Durable automated tests live with the app in `web/`; this repository does not use a separate model-evals workspace.

The CI gate runs lint, typecheck, Jest, and production build for every relevant pull request; see [ci-cd.md](ci-cd.md).

## Booking minimum coverage

`hasBookingConflict()` must cover overlap, non-overlap, back-to-back bookings, a different listing, and non-confirmed existing bookings.

`isValidBookingTransition()` must cover every allowed transition and reject invalid transitions.

## Database and RLS verification

For schema or policy changes, run from the repository root:

```bash
npx supabase db reset
```

Then inspect the local database in Studio at `http://127.0.0.1:54323` and verify the actor cases listed in [environments](environments.md). The baseline SQL contract checks live in `supabase/tests/database_contract.sql`; use them as review prompts until automated authenticated database tests are added.

The booking overlap rule must be verified at both levels:

- Jest covers the TypeScript end-exclusive conflict helper.
- Postgres enforces `bookings_no_confirmed_overlap` for confirmed bookings on the same listing.

Playwright booking flow remains skipped until auth-backed screens and deterministic Supabase test users exist. When those arrive, unskip `web/e2e/booking-flow.spec.ts` and run it against the local Supabase stack.
