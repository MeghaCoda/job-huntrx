---
name: pickup-from-checkpoint
description: Resume work in job-huntrx by reading planning/CHECKPOINT.md's last-finished/next-up, cross-checking planning/BOARD.md for the true next unblocked task, and producing an implementation plan for it. Use on /pickup-from-checkpoint, or whenever the user wants to jump straight from "what's the status" into starting the next task rather than just getting a status summary.
---

# Pickup from checkpoint

Turns the checkpoint hand-off into a concrete, approved plan for the next
task — without skipping the dependency/decision checks that would make
starting the wrong task (or starting one that's actually blocked) a wasted
session.

## Steps

1. **Read `planning/CHECKPOINT.md` in full.** Note "Last finished", "Next
   up", and anything in "Notes / open decisions" that could bear on the
   next task (an undecided ORM, auth mechanism, storage choice, etc.).

2. **Read `planning/BOARD.md`** and independently confirm the next
   unblocked `todo` task in dependency order. `BOARD.md` is the source of
   truth for task status (per the `checkpoint` and `update-task-board`
   skills) — if it disagrees with CHECKPOINT.md's "Next up" (e.g. the
   checkpoint is stale), go with `BOARD.md` and tell the user the
   checkpoint was out of date rather than silently picking one.

3. **Read the full detail block** for that `TASK-XXX` in its
   `planning/tasks/EPIC-N-*.md` file — description, acceptance criteria,
   and `Depends on`.

4. **Verify every dependency is `done`.** Check each task listed in
   `Depends on` against `BOARD.md`. If any isn't done, stop and flag it to
   the user instead of starting the task anyway or silently substituting a
   different one.

5. **Check for blocking open decisions.** Cross-reference
   `planning/EPIC.md`'s "Open decisions to make early" list. If the task
   can't proceed without a decision only the user can make (e.g. TASK-003
   needs an ORM choice), use `AskUserQuestion` — don't guess a default on
   the user's behalf for a decision the board explicitly flagged as open.

6. **Mark the task `in-progress`** via the `update-task-board` skill, once
   steps 4–5 confirm it's actually startable.

7. **Design the implementation plan.** Use `EnterPlanMode` and build the
   plan against the task's actual acceptance criteria and the codebase's
   real current state (read the relevant files — don't assume prior
   scaffolding is exactly what an earlier task's notes say without
   spot-checking). End with `ExitPlanMode` to get the plan approved.

## What this skill does not do

- **Doesn't write code.** It stops at an approved plan — implementation is
  the next step after this skill's job is done, once the plan is approved.
- **Doesn't mark the task `done`.** Per `BOARD.md`'s Definition of Done,
  that requires a `code-reviewer` + `code-review-security` pass on the
  finished diff, which happens later in the normal workflow.
- **Doesn't paper over a real blocker.** An unmet dependency or an
  undecided open question gets surfaced to the user, not resolved by
  assumption.
