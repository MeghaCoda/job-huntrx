# EPIC-6: Frontend Job Dashboard & Application Tracking

Goal: the end-to-end user-facing flow — see ranked jobs, inspect them, track
application status.

---

### TASK-050: Job feed/dashboard UI
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-043

**Description:** List view of a user's jobs sorted by `match_score` by
default, with filters (title, location, source, applied/saved/dismissed).

**Acceptance criteria:**
- Sorting and filtering work without a full page reload.

---

### TASK-051: Job detail view
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-050

**Description:** Full job description, match rationale (from TASK-042/043),
link to original posting.

**Acceptance criteria:**
- Rationale text from the ranking agent is visible and readable, not raw JSON.

---

### TASK-052: Mark-as-applied action
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-050, TASK-035

**Description:** Button to mark a job applied; triggers the 90-day retention
extension (TASK-035) and records `applied_at`.

**Acceptance criteria:**
- Marking applied is reflected immediately in the UI and survives a refresh.
- Retention job (TASK-035) correctly extends this job's lifetime.

---

### TASK-053: Saved/dismissed states
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-050

**Description:** Let a user save a job for later or dismiss it from the feed
without deleting it from the DB.

**Acceptance criteria:**
- Dismissed jobs are hidden from the default feed but not deleted.

---

### TASK-054: Profile management UI
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-017

**Description:** Settings page to edit job titles, re-upload resume/LinkedIn
PDF, and see current parsed profile data.

**Acceptance criteria:**
- Editing job titles here triggers the same validation as onboarding
  (max 10) and affects future aggregation runs.
