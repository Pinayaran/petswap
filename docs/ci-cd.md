# CI/CD

## Continuous integration

GitHub Actions runs for pull requests that change the React app, Supabase configuration, or workflow itself. The gate runs:

```bash
npm run lint
npm run typecheck
npm test -- --runInBand
npm run build
```

The same workflow also verifies that Markdown links under docs resolve. No pull request should merge into `main` while this gate is failing. Tonpai owns investigating CI/environment failures; the feature author owns failures introduced by their change.

## Main branch protection

The protected `main` branch is the only shared integration branch. GitHub requires a pull request, one approving review, current Quality checks, and resolution of review conversations before merge. New commits dismiss earlier approvals; administrators follow the same rules. Direct pushes, force pushes, and branch deletion are blocked.

## Deployment

Deployment is intentionally undecided until the final VibeCode reference and Supabase project are agreed. Before a demo deployment is introduced, document its host, environment-variable ownership, rollback process, and demo-data policy in a new ADR and this document.
