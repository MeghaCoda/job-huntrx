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

**Note (2026-09-23 — supersedes the retention numbers above):** single-user
app, revised retention per user decision:
- `expires_at` on `jobs` defaults to `posted_at + 48 hours`, not
  `inserted_at + 30 days`.
- `user_jobs` needs a minimal applied/favorited snapshot — company name,
  job title, application url, applied/favorited date — that is stored on
  (or alongside) `user_jobs` and persists independently of the parent
  `jobs` row once it expires. This snapshot expires 30 days after the
  applied/favorited date, not 90, and never includes the full job
  description/content.

**Acceptance criteria:**
- Migration applies cleanly.
- `expires_at` on `jobs` defaults to `posted_at + 48 hours`.
- Marking a job applied/favorited persists the minimal snapshot
  independently of the parent `jobs` row's expiry.

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

**Description:** Implement one real adapter — Remote Rocketship
(`planning/compliance/remote-rocketship.md`, approved) — fully: fetch,
normalize, insert into `jobs`.

**Acceptance criteria:**
- Running the adapter against Remote Rocketship's `/api/openclaw/jobs`
  endpoint inserts correctly-shaped rows.
- The stored `url` is verified to resolve to the actual external
  application destination (e.g. the employer's or LinkedIn's own posting),
  not a Remote Rocketship-branded redirect page.

---

### TASK-033: Deduplication logic
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-032

**Description:** Dedupe on `(source, external_id)` for exact re-fetch, plus a
fuzzy cross-source pass (normalized title + company + location) so the same
posting from two sources doesn't show twice to the user. Still needed even
with a single source: overlapping job-title searches against Remote
Rocketship can return the same posting more than once.

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
scheduler) that runs every adapter once daily per active job title.
Single-user app — this means once daily against one account's up to 10 job
titles, comfortably inside Remote Rocketship's 500 req/day cap. No
cross-user rate-limit coalescing is needed.

**Acceptance criteria:**
- A scheduled run visibly updates `jobs` without manual triggering.
- A failed adapter run doesn't block others from running.

---

### TASK-035: Retention/TTL cleanup job
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-030

**Description:** Nightly job deleting `jobs` rows past `expires_at`
(`posted_at + 48 hours`). On "mark applied" or "favorited" (TASK-052),
persist the minimal snapshot (company, title, application url, date) on
`user_jobs` independently of the parent `jobs` row, and delete that
snapshot 30 days after the applied/favorited date.

**Acceptance criteria:**
- A job untouched for 48 hours past `posted_at` is deleted.
- A job marked applied/favorited has its minimal snapshot retained for 30
  days from the applied/favorited date, then deleted — independent of
  whether the parent `jobs` row already expired.

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
