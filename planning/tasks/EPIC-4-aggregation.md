# EPIC-4: Job Aggregation Pipeline

Goal: jobs from approved sources (EPIC-3) land in Postgres, de-duped, refetched
daily, and expired on the 30/90-day retention rule from CLAUDE.md.

No task here should start against a real source until that source has an
approved compliance card (EPIC-3).

---

### TASK-030: Jobs schema
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-003

**Description:** `jobs` table: `source`, `external_id`, `title`, `company`,
`location`, `description`, `url`, `posted_at`, `inserted_at`, `expires_at`,
plus a per-user join table `user_jobs` (`applied_at`, `saved`, `dismissed`,
`match_score`). Unique constraint on `(source, external_id)`.

**Acceptance criteria:**
- Migration applies cleanly.
- `expires_at` defaults to `inserted_at + 30 days`.

---

### TASK-031: Source adapter interface
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-030

**Description:** Define a common adapter contract (`fetch(sinceCursor?) ->
NormalizedJob[]`) so each source plugs in without touching pipeline code.

**Acceptance criteria:**
- Interface + normalized job type documented in `packages/*`.
- A no-op/mock adapter exists for testing the pipeline without network calls.

---

### TASK-032: First adapter, end-to-end
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-031, EPIC-3 approval for the chosen source

**Description:** Implement one real adapter (e.g. Greenhouse) fully: fetch,
normalize, insert into `jobs`.

**Acceptance criteria:**
- Running the adapter against a real company's Greenhouse board inserts
  correctly-shaped rows.

---

### TASK-033: Deduplication logic
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-032

**Description:** Dedupe on `(source, external_id)` for exact re-fetch, plus a
fuzzy cross-source pass (normalized title + company + location) so the same
posting from two sources doesn't show twice to the user.

**Acceptance criteria:**
- Re-running an adapter against unchanged upstream data doesn't create
  duplicate rows.
- Same job posted on two approved sources surfaces once per user, with both
  source refs retained.

---

### TASK-034: Daily refetch scheduler
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-032

**Description:** A scheduled job (worker process + cron, or platform
scheduler) that runs every adapter once daily per active job title/source
combination.

**Acceptance criteria:**
- A scheduled run visibly updates `jobs` without manual triggering.
- A failed adapter run doesn't block others from running.

---

### TASK-035: Retention/TTL cleanup job
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-030

**Description:** Nightly job deleting rows past `expires_at`; on
"mark applied" (TASK-052), extend that user's row to `applied_at + 90 days`
instead of the default 30.

**Acceptance criteria:**
- Job untouched for 30 days is deleted.
- Job marked applied is retained until 90 days from apply date, then deleted.

---

### TASK-036: Adapter reliability — rate limiting & backoff
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-031

**Description:** Shared retry/backoff/rate-limit helper used by all adapters;
per-adapter error logging that doesn't crash the scheduler.

**Acceptance criteria:**
- Simulated upstream 429/500 responses are retried with backoff, then
  logged and skipped rather than crashing the run.

---

### TASK-037: Additional adapters
- **Status:** todo
- **Priority:** P2
- **Depends on:** TASK-032, EPIC-3 approval per source

**Description:** Add remaining approved sources (Lever, Ashby, etc.) one at a
time using the pattern from TASK-032, ideally via the `add-job-source` skill
(see root SKILLS.md).

**Acceptance criteria:**
- Each new adapter ships with its own tests and a linked compliance card.
