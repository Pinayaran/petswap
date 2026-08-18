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

Database-level overlap and RLS tests are added when the real Supabase migration is introduced.
