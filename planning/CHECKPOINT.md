# Checkpoint

Single-glance "where we left off" doc. Updated only by the `checkpoint`
skill (`/checkpoint`) — see `.claude/skills/checkpoint/SKILL.md`. At the
start of every session, read this file first and summarize it for the user
before doing anything else (see CLAUDE.md).

**Last updated:** 2026-09-23

## Last finished
**TASK-003 — ORM & migrations setup (Prisma 7.10.0).** `packages/db` now
has `prisma/schema.prisma` (`User` → `users`), first migration
`20260924024458_init_users`, `prisma.config.ts`, a typed client
(`getPrisma()` / `createPrismaClient()`), `db:*` scripts (`pnpm db:migrate`
= safe `migrate deploy`), README section. `DATABASE_URL` appended to the
user's `.env`. Passed `/review-all`; the MEDIUM (`updated_at` DB default)
was fixed by amending the unshipped first migration (local DB reset with
user consent). 3 LOW deferred — listed in the TASK-003 completion note.
Nothing committed — the user commits their own changes.

Also: `CLAUDE.md` now says unresolved LOW security findings get deferred
(recorded in the task's completion note), not fixed unasked.

## In progress
Nothing in progress — session ended cleanly between tasks. The Postgres
container was left running (`docker compose down` to stop; data is kept).

## Next up
Start here: **TASK-004** (env & secrets), then **TASK-006** (base app
shell) — per `planning/BOARD.md`. TASK-004 goes first because Next.js
only loads `apps/api/.env`, not the root `.env` holding `DATABASE_URL`.
TASK-010 and TASK-030 are also unblocked; TASK-005 and TASK-060 can run
in parallel.

Other planning-support skills still to build (see `planning/SKILLS.md`):
`scraper-compliance-check`, `add-job-source`, `db-migration`,
`job-match-eval`.

## Notes / open decisions
- Decisions still open (see `planning/EPIC.md`): auth provider mechanics
  (single-user gate, implementation unpicked), upload file storage,
  deployment target. ORM is decided (Prisma).
- Open compliance item: get written confirmation from Remote Rocketship
  that a 48h personal-use cache TTL is acceptable (their ToS states a 24h
  max) — see `planning/compliance/remote-rocketship.md` notes. Treated as
  accepted risk for now, not resolved.
- At TASK-032 build time, verify Remote Rocketship's `url` field points to
  the real external application destination, not a branded redirect.
- At TASK-040, if only Chroma's HTTP client is used, consider dropping the
  optional native `chromadb-js-bindings-*` deps (accepted LOW from the
  TASK-001F security review).
- Deferred from TASK-002 review: the app currently connects as the Postgres
  superuser — create separate migration/app roles (TASK-063); pin the
  postgres image by digest once CI/deploy reuse it (TASK-005/TASK-063).
- Tooling: the shell's default `node` is Homebrew v21 (too old for
  `engines: >=24`) — prefix PATH with `~/.nvm/versions/node/v24.18.0/bin`.
  Prisma blocks `migrate reset` by AI agents without explicit user consent
  (`PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION`) — always ask first.
