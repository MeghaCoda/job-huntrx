# Checkpoint

Single-glance "where we left off" doc. Updated only by the `checkpoint`
skill (`/checkpoint`) — see `.claude/skills/checkpoint/SKILL.md`. At the
start of every session, read this file first and summarize it for the user
before doing anything else (see CLAUDE.md).

**Last updated:** 2026-09-16

## Last finished
Built the checkpoint system: `planning/CHECKPOINT.md` (this file), the
`checkpoint` skill (`.claude/skills/checkpoint/SKILL.md`), and a
"Session start" pointer in `CLAUDE.md` so a new session reads this file and
reports status without being asked.

## In progress
Nothing in progress — session ended cleanly between tasks.

## Next up
No `TASK-XXX` from `planning/BOARD.md` has been started yet.
**TASK-001** (Initialize repo & workspace layout) is next.

Other planning-support skills still to build (see `planning/SKILLS.md`):
`scraper-compliance-check`, `add-job-source`, `db-migration`,
`job-match-eval`.

## Notes / open decisions
- This directory is not yet a git repo — TASK-001 includes `git init`.
- Decisions blocking early tasks (see `planning/EPIC.md`): ORM/migration
  tool, auth provider, upload file storage, deployment target. None
  decided yet.
