# Epic: Job Hunting Assistant

Source of truth for scope is [CLAUDE.md](../CLAUDE.md). This file breaks that
epic into build phases; [BOARD.md](BOARD.md) is the live index of every task;
`tasks/EPIC-*.md` hold the task detail.

## Stack (from CLAUDE.md)
- Frontend: React + TypeScript + Vite
- API: Next.js
- DB: Postgres
- Agentic layer: LangGraph
- RAG: Chroma

## Product summary
User uploads resume + LinkedIn PDF export -> we extract structured profile
data -> user picks up to 10 target job titles -> we pull jobs from
legally-scrapable sources (no LinkedIn/Indeed/or any site whose ToS forbids
bots) -> aggregate, de-dupe, rank by fit -> store on the user's profile ->
refetch daily -> jobs expire 30 days after insertion, or 90 days if the user
marked them applied.

**Retention revised 2026-09-23** (supersedes the 30/90-day rule above for
this specific point — see `planning/tasks/EPIC-4-aggregation.md` TASK-030/
TASK-035 and `planning/compliance/remote-rocketship.md`): jobs expire 48
hours after their `posted_at` date, not 30 days after insertion. Jobs
marked applied or favorited keep only a minimal snapshot (company name,
job title, application url, applied/favorited date — not the full
description) for 30 days from that date, not 90. This app is also
single-user only, not multi-tenant.

## Phases / build order

| Phase | Epic(s) | Goal | Can demo when done |
|---|---|---|---|
| 1 | EPIC-1 Foundation | Repo/workspace scaffolding, Postgres, base API + web app boot | `pnpm dev` runs empty web app hitting an API health check |
| 2 | EPIC-2 Onboarding | Upload resume + LinkedIn PDF, parse, store profile, pick job titles | A user can sign up, upload docs, see parsed profile, save titles |
| 3 | EPIC-3 Source Research | Legal audit of scrapable job sources, compliance doc template | A written, reviewed list of approved sources with evidence |
| 4 | EPIC-4 Aggregation Pipeline | Adapters, dedup, daily refetch, 48h/30-day retention | Jobs from >=1 real source land in DB and expire correctly |
| 5 | EPIC-5 Matching/RAG | Chroma embeddings + LangGraph ranking agent | Jobs on a user's profile are sorted by fit with a visible score |
| 6 | EPIC-6 Frontend Dashboard | Job feed, detail view, mark-applied, saved/dismissed | End-to-end user flow works in the browser |
| 7 | EPIC-7 Testing/Deploy | Test coverage, CI, deployment, observability | App is deployed and monitored |

Phases 1-2 should be built before Phase 3 is *finished* (compliance research
can run in parallel), but no adapter in Phase 4 should be written for a
source until its compliance card (EPIC-3) is signed off.

## Open decisions to make early
These block specific tasks below — see each task's file for detail.
- ~~ORM/migration tool for Postgres (Prisma vs Drizzle vs raw SQL) — blocks TASK-003~~
  **Decided 2026-09-23: Prisma** (user preference — widely requested in job
  descriptions). TASK-003 is unblocked.
- Auth provider (NextAuth, Clerk, custom) — blocks TASK-011
- File storage for uploaded PDFs (local disk for dev vs S3-compatible) — blocks TASK-012
- Deployment targets (Vercel for web/API, Railway/Render/Fly for Postgres+workers) — blocks TASK-063
