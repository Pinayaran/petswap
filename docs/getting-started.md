# Getting started

This guide gets a new contributor from zero to a safe first pull request.

## 1. Learn the project

1. Read [README](../README.md) and [agent instructions](../AGENTS.md).
2. Read [requirements](requirements.md) for the work you are taking.
3. Read [team protocol](team-protocol.md) and find the current card in the team Google Sheet.
4. Read [design](design.md) before changing UI, and relevant ADRs before changing a durable decision.

## 2. Set up the web app

Install Node.js 20.19+ or 22.12+, then run:

    cd web
    npm install
    npm run dev

Open the local URL printed by Vite. Supabase is intentionally not required until its schema work begins; see [environments](environments.md).

## 3. Start a small piece of work

    git checkout main
    git pull
    git checkout -b feature/short-description

Take one testable Google Sheet card at a time. Keep work inside its owning feature unless it is genuinely shared. If you are considering a durable decision, apply [the ADR guide](decisions/README.md) before creating an ADR.

## 4. Prove the work

From web, run:

    npm run lint
    npm run typecheck
    npm test -- --runInBand
    npm run build

Add manual-test evidence or screenshots when the card changes UI. Follow [testing](testing.md) and use the [manual test template](templates/manual-test.md) when appropriate.

## 5. Open a pull request

Push your branch and open a PR to main, using the repository pull-request template. Request one squad review. Do not merge your own PR without the required approval.

If you are blocked, raise it in the squad DSM and update the Google Sheet card with the blocker and the next needed decision.
