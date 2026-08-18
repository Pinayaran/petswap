# ADR 0002: Document Supabase before committing schema

**Status:** Accepted

## Context

The team needs a repository foundation now but has not yet completed the design/data-model handoff. Premature migrations create rework and make ownership unclear.

## Decision

Create the `supabase/` structure and local-development documentation now, but leave migrations and Edge Functions as explicit placeholders. The owning squad will introduce the first schema in a reviewed migration.

## Consequences

Developers know where backend work belongs without treating an unreviewed schema as authoritative. The first database PR must include RLS policies, migration tests, and an ADR if it changes the agreed model.
