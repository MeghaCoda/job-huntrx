# Checkpoint

Single-glance "where we left off" doc. Updated only by the `checkpoint`
skill (`/checkpoint`) — see `.claude/skills/checkpoint/SKILL.md`. At the
start of every session, read this file first and summarize it for the user
before doing anything else (see CLAUDE.md).

**Last updated:** 2026-09-23

## Last finished
**TASK-001F — packages/rag (Chroma client)**, which also closes out
**TASK-001** (all six subtasks done). Scaffolded `@job-huntrx/rag`
mirroring `packages/agent`, dependency `chromadb` ^3.5.0; build/typecheck
verified. Passed `/review-all`: code-reviewer APPROVE (1 MEDIUM — this
stale checkpoint, now fixed), code-review-security 3 LOW, accepted (see
TASK-001F completion note in EPIC-1). Nothing committed yet — the user
commits their own changes (packages/agent, packages/rag, lockfile,
planning docs, Remote Rocketship compliance card are all uncommitted).

## In progress
Nothing in progress — session ended cleanly between tasks.

## Next up
Start here: **TASK-002** (Postgres via docker-compose) — per
`planning/BOARD.md`. It's on the critical path to TASK-003 (ORM/migrations),
which needs the ORM decision before it can start. TASK-004 (env &
secrets), TASK-005 (CI skeleton), and TASK-060 (unit test setup) are also
unblocked and can run in parallel. EPIC-3 is cleared for MVP (Remote
Rocketship approved), so EPIC-4 (TASK-030, TASK-032) follows once
TASK-003 lands.

Other planning-support skills still to build (see `planning/SKILLS.md`):
`scraper-compliance-check`, `add-job-source`, `db-migration`,
`job-match-eval`.

## Notes / open decisions
- Decisions blocking early tasks (see `planning/EPIC.md`): ORM/migration
  tool, auth provider mechanics (now single-user gate, but implementation
  unpicked), upload file storage, deployment target. None decided yet.
- Open compliance item: get written confirmation from Remote Rocketship
  that a 48h personal-use cache TTL is acceptable (their ToS states a 24h
  max) — see `planning/compliance/remote-rocketship.md` notes. Treated as
  accepted risk for now, not resolved.
- At TASK-032 build time, verify Remote Rocketship's `url` field points to
  the real external application destination, not a branded redirect.
- At TASK-040, if only Chroma's HTTP client is used, consider dropping the
  optional native `chromadb-js-bindings-*` deps (accepted LOW from the
  TASK-001F security review).
