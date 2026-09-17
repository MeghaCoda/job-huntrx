---
name: checkpoint
description: Update planning/CHECKPOINT.md, the "where we left off" doc for job-huntrx. Invoke on /checkpoint, or whenever the user is about to end a session and wants the handoff doc current. This is the only sanctioned way to edit CHECKPOINT.md.
---

# Checkpoint

`planning/CHECKPOINT.md` is what gets read at the start of the *next*
session so the user can be told what just finished and what's next without
re-deriving it from scratch. Keep it short — a few seconds to read, not a
session transcript.

## When /checkpoint runs

1. **Survey what happened this session**: recently completed work
   (finished tasks, skills/agents built, files created), anything left
   mid-flight, and any new decisions, blockers, or open questions raised
   in conversation that aren't captured elsewhere yet.
2. **Reconcile with the board first.** If any completed work maps to a
   `TASK-XXX` in `planning/BOARD.md` that isn't marked `done` yet, use the
   [`update-task-board`](../update-task-board/SKILL.md) skill to update it
   *before* writing the checkpoint — `BOARD.md` is the source of truth for
   task status, `CHECKPOINT.md` is just a pointer into it plus session
   color. Don't let the two disagree about whether a task is done.
3. **Rewrite `planning/CHECKPOINT.md`** with `Edit` (small precise edits,
   not a full-file rewrite where avoidable), updating:
   - `Last updated` → today's date
   - `Last finished` → the single most recent meaningful thing completed
     (task ID + title if it's a board task, otherwise a one-line
     description — e.g. a skill built, a decision made)
   - `In progress` → whatever is genuinely mid-flight right now, or
     "Nothing in progress" if the session ended cleanly between tasks
   - `Next up` → pull straight from `BOARD.md`'s "Next up" line so this
     never contradicts the board; add one line of *why* if it's not
     obvious
   - `Notes / open decisions` → prune anything resolved this session, add
     anything new. Keep this list short — it's for things not already
     tracked in `planning/EPIC.md`'s open-decisions list or a task's
     acceptance criteria, not a duplicate of them.
4. **Confirm to the user in one or two lines** what you wrote — don't
   just silently update the file.

## Style rules for CHECKPOINT.md

- No task history/changelog — it's overwritten each time, not appended to.
  Git history (once TASK-001 sets up the repo) is the durable record.
- Never invent a "next up" that contradicts `BOARD.md` — if unsure what's
  next, look at the board's dependency graph, don't guess.
- If genuinely nothing happened since the last checkpoint, say so rather
  than fabricating progress — an unchanged checkpoint is a valid outcome.
