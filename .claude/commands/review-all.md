---
description: Run both the code-reviewer agent and the code-review-security skill against the current diff, per BOARD.md's Definition of Done.
argument-hint: "[optional: task ID or focus area]"
---

Run a full review of the current changes in this repo: $ARGUMENTS

This satisfies the "Definition of done" requirement in `planning/BOARD.md`,
which requires **both** of the following before any task can be marked
`done`:

1. **`code-reviewer` agent** — general code quality/correctness/security
   review. Launch it via the `Agent` tool with `subagent_type:
   "code-reviewer"`. Give it a self-contained prompt describing what changed
   (summarize `git status` / `git diff --stat` for it — don't assume it
   inherits this context) and ask it to review the actual diff on disk.

2. **`code-review-security` skill** — job-huntrx-specific security/QA pass
   (PII, per-user isolation, injection, prompt-injection/agent boundaries,
   dependency provenance, etc). Invoke it with the `Skill` tool
   (`skill: "code-review-security"`), passing the same summary of what
   changed as `args`.

Do both passes — don't skip either one, and don't let one substitute for the
other; they check different things. If $ARGUMENTS names a specific task ID
or focus area, scope both reviews to that, otherwise review all current
uncommitted changes (`git status` / `git diff`).

After both come back, consolidate: report findings most-severe-first,
de-duplicating anything both passes flagged. State plainly whether the
combined result clears the Definition of Done bar (no unresolved
CRITICAL/HIGH findings) so it's clear whether the task in question is safe
to mark `done`. If a finding exists only as a claim in a planning doc (e.g.
a completion note asserting review already happened) rather than as
something independently verified in this pass, call that out explicitly
rather than taking the doc's word for it.
