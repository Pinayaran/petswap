# ADR 0001: React Vite SPA and feature-based workspace

**Status:** Accepted

## Context

The project is a React web application, while the reference repository uses an isolated application workspace and feature-based code boundaries.

## Decision

Use a Vite React TypeScript single-page app inside `web/`. Organize product code by feature and reserve `shared/` for code used by at least two features.

## Consequences

The repository root remains focused on project-level documentation and infrastructure. Routes are composition-only, while features own their implementation. Server rendering is intentionally not part of this MVP.
