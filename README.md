# job-huntrx

A job-hunting assistant: upload a resume + LinkedIn PDF export, pick up to
10 target job titles, and get daily-refreshed, ranked job matches pulled
from legally-scrapable sources. See [`CLAUDE.md`](CLAUDE.md) for full scope
and [`planning/EPIC.md`](planning/EPIC.md) for the build plan.

## Prerequisites
- Node.js 22 (LTS)
- pnpm, via [Corepack](https://nodejs.org/api/corepack.html) (ships with
  Node — run `corepack enable` once, then pnpm resolves automatically from
  the `packageManager` field in `package.json`)

## Install

```sh
pnpm install
```

Installs dependencies for every workspace in one step.

## Layout

Pnpm workspace monorepo:

- `apps/web` — React + TypeScript frontend (Vite)
- `apps/api` — Next.js API
- `packages/db` — Postgres schema, migrations, typed client
- `packages/agent` — LangGraph agentic layer
- `packages/rag` — Chroma RAG client

Workspaces are added incrementally; see `planning/BOARD.md` for current
status (TASK-001A–F).
