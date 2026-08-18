# Supabase placeholder

This directory is intentionally scaffolded without a database schema. See [`../docs/environments.md`](../docs/environments.md) and [ADR 0002](../docs/decisions/0002-supabase-placeholder-first.md).

When backend work starts:

```bash
npx supabase init
npx supabase start
```

- Add reviewed SQL migrations to `migrations/`.
- Put Edge Functions in `functions/<function-name>/`.
- Add safe local demo data to `seed.sql` only when required.
- Enable and test RLS in the same pull request as each exposed table.
