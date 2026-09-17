# Skills/prompts worth saving in this repo

Project-level skills live in `.claude/skills/<name>/SKILL.md` and get listed
automatically for any Claude Code session opened in this repo.

## Built

### `code-reviewer` subagent — [.claude/agents/code-reviewer.md](../.claude/agents/code-reviewer.md)
General-purpose senior code review subagent (invoked automatically after
code changes, or via the Agent tool). Covers security (CRITICAL:
injection, XSS, auth bypass, secrets), code quality, React/Next.js and
Node/backend patterns, with confidence-based filtering so it doesn't
flood reviews with noise — it's expected to return zero findings on a
clean diff. This is the general reviewer; layer `code-review-security`
below on top of it for this project's specific risk areas.

### `code-review-security` skill — [.claude/skills/code-review-security/SKILL.md](../.claude/skills/code-review-security/SKILL.md)
Security- and QA-first review checklist covering Python (LangGraph/Chroma),
JS/TS, Postgres, React, Next.js, and Node, plus job-huntrx-specific risks
(prompt injection from scraped job content, per-user RAG isolation, PII in
resumes, IDOR on per-user resources) that the general `code-reviewer`
subagent has no way to know about. Security and QA are top priorities for
this project — see "Definition of done" in `BOARD.md`.

### `update-task-board` skill — [.claude/skills/update-task-board/SKILL.md](../.claude/skills/update-task-board/SKILL.md)
The sanctioned way to change a task's status or add a new task — edits
`planning/BOARD.md` and the matching `planning/tasks/EPIC-*.md` entry
together so they never drift, flags out-of-order dependency completions,
and won't mark a task `done` without a nod to the review skills above.

## To build

Roughly in the order they'd start earning their keep. Say the word and I'll
scaffold any of these now instead of just describing them.

## 1. `scraper-compliance-check`
Given a candidate job source (URL or name), fetches its `robots.txt` and
ToS, and produces a filled-out `planning/compliance/_template.md` card with
a recommended approve/reject decision. Feeds directly into EPIC-3
(TASK-020/021/023) and should be used again any time a new source is
proposed later, not just during the initial audit.

## 2. `add-job-source`
Scaffolds a new adapter under the EPIC-4 adapter interface (TASK-031):
generates the adapter file, a fixture-based test (TASK-061), and requires
linking an approved compliance card before it'll finish — a guardrail
against accidentally adding a source that skipped EPIC-3.

## 3. `db-migration`
Repo-specific wrapper around whichever migration tool TASK-003 picks
(Prisma/Drizzle), so migrations are generated, named, and applied the same
way every time across `packages/db`.

## 4. `job-match-eval`
Once EPIC-5 exists: run the LangGraph ranking agent against a fixed set of
sample profiles + job fixtures and diff the scores/rationale against the
last known-good run, to catch ranking regressions when the agent prompt or
retrieval logic changes.

## Not a skill — just a convention
Keep using `planning/BOARD.md` + `planning/tasks/EPIC-*.md` as the task
system itself (per your choice of in-repo markdown board over GitHub
Issues/Jira). The skills above are tooling *around* that system, not a
replacement for it.
