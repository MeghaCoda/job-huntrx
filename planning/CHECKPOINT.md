# Checkpoint

Single-glance "where we left off" doc. Updated only by the `checkpoint`
skill (`/checkpoint`) — see `.claude/skills/checkpoint/SKILL.md`. At the
start of every session, read this file first and summarize it for the user
before doing anything else (see CLAUDE.md).

**Last updated:** 2026-09-23

## Last finished
**TASK-002 — Postgres via docker-compose.** Root `docker-compose.yml`
(postgres:18-alpine, bound to 127.0.0.1 only, `pgdata` volume,
healthcheck), root `.env.example` with `DATABASE_URL`, README "Local
database" section. Verified live: healthy, reachable from host, data
persists across down/up. Passed `/review-all` (code-reviewer APPROVE;
5 LOW total — 1 fixed, rest accepted/deferred, see TASK-002 completion
note in EPIC-1). Nothing committed — the user commits their own changes
(docker-compose.yml, .env.example, README.md, CLAUDE.md, planning docs).

Also decided: **ORM = Prisma** (recorded in `planning/EPIC.md`). `CLAUDE.md`
now has a note that the user doesn't know Prisma — explain all Prisma work
in extra detail.

## In progress
Nothing in progress — session ended cleanly between tasks. The Postgres
container was left running (`docker compose down` to stop; data is kept).

## Next up
Start here: **TASK-003** (ORM & migrations) — per `planning/BOARD.md`.
Ready to start with **Prisma**. When it starts, add `DATABASE_URL` from
`.env.example` to the user's `.env` (append only — don't touch the
existing API key). TASK-004 (env & secrets), TASK-005 (CI skeleton),
and TASK-060 (unit test setup) are unblocked and can run in parallel.
EPIC-4 (TASK-030, TASK-032) follows once TASK-003 lands.

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
  superuser — create separate migration/app roles (TASK-003/TASK-063); pin
  the postgres image by digest once CI/deploy reuse it (TASK-005/TASK-063).
