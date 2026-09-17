---
name: update-task-board
description: Keep planning/BOARD.md and planning/tasks/EPIC-*.md in sync in job-huntrx. Use whenever a task's status changes (starting, blocking, or finishing a TASK-XXX), whenever a new task needs to be added to an epic, or when asked "what's next" / "update the board". This is the only sanctioned way to edit those files' status fields — never hand-edit just one of the two.
---

# Update task board

`planning/BOARD.md` (the index) and `planning/tasks/EPIC-*.md` (the detail)
must always agree. This skill is how every status change gets applied —
edit both files together, every time, with small precise edits (not full
rewrites).

## Status values
`todo` | `in-progress` | `blocked` | `done`

## Changing a task's status

1. **Find the task.** Grep `planning/BOARD.md` for `| TASK-XXX |` to get its
   row and confirm which epic section it's under. Grep the matching
   `planning/tasks/EPIC-N-*.md` for `### TASK-XXX:` to get its detail block.
2. **Check dependencies before marking `done`.** Read the task's `Depends
   on` field. If any dependency isn't `done` yet, still apply the status
   change (the user/agent knows their own work better than the board does)
   but call it out explicitly in your reply — don't silently mark
   something done out of order without flagging it.
3. **Edit `BOARD.md`:** update just the `Status` cell in that task's row.
4. **Edit the epic file:** update the `- **Status:**` line in that task's
   `###` section.
   - Marking **done** → add or update a line right after Status:
     `- **Completed:** YYYY-MM-DD — <one-line note of what shipped>`
     (use today's date; ask the user for the note if it's not obvious from
     context).
   - Marking **blocked** → add or update:
     `- **Blocked reason:** <reason>` — always required for `blocked`.
   - Marking **in-progress** or back to **todo** → no extra field, just the
     status line.
5. **Update "Next up" in `BOARD.md`** only if the change makes it stale
   (e.g. the task just marked `done` was the one it pointed at). Set it to
   the next unblocked `todo` task in dependency order. Leave it alone
   otherwise — don't rewrite it every time out of habit.
6. **Report back concisely**: which file(s) changed, old → new status, and
   any dependency warning from step 2. Don't restate the whole board.

Use `Edit` with a unique `old_string` for each change — never
`Write`/rewrite either file wholesale, since that risks clobbering
unrelated tasks or losing formatting.

## Adding a new task to an epic

1. Read the target epic's block in `BOARD.md` and its file in
   `planning/tasks/` to find the highest existing `TASK-XXX` number in that
   epic's numeric range (EPIC-1: 001-009, EPIC-2: 010-019, EPIC-3: 020-029,
   EPIC-4: 030-039, EPIC-5: 040-049, EPIC-6: 050-059, EPIC-7: 060-069).
2. Assign the next free ID in that range. If the range is exhausted, say so
   and ask before spilling into another epic's numbers — don't silently
   renumber or reuse.
3. Append a row to that epic's table in `BOARD.md` (status `todo`, and
   priority/dependencies if known, `—` otherwise).
4. Append a matching `### TASK-XXX: <title>` section to the epic file using
   the existing section format (Status/Priority/Depends on, then
   Description and Acceptance criteria — ask the user for these if they
   weren't given, rather than inventing acceptance criteria yourself).
5. Never renumber or move existing tasks to make room.

## What this skill does not do

- It doesn't invent new epics — a genuinely new epic (not fitting EPIC-1
  through EPIC-7) is a bigger decision; flag it to the user instead of
  adding it unilaterally.
- It doesn't run the actual code review — that's
  [`code-reviewer`](../../agents/code-reviewer.md) and
  [`code-review-security`](../code-review-security/SKILL.md). Per the
  "Definition of done" in `BOARD.md`, don't mark a task `done` on request
  without at least confirming that review happened, and flag it if it
  didn't.
