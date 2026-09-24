# EPIC-2: User Onboarding & Profile Data

Goal: a user can sign up, upload their resume + LinkedIn PDF export, see
parsed profile data, and pick up to 10 target job titles.

---

### TASK-010: Schema — users, resumes, linkedin_profiles, job_titles
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-003

**Description:** Design and migrate tables: `users`, `resumes` (raw file ref +
parsed JSON), `linkedin_profiles` (raw file ref + parsed JSON),
`user_job_titles` (up to 10 per user, enforce via app logic + a check/trigger
or unique constraint on rank 1-10).

**Acceptance criteria:**
- Migration applies cleanly; FKs to `users` with `ON DELETE CASCADE`.
- A DB-level or app-level constraint prevents >10 titles per user.

---

### TASK-011: Auth (decision required)
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-010

**Description (rescoped 2026-09-23 — single-user app, no multi-tenant use
case):** No public sign-up flow needed. Add a single-user access gate — one
configured credential/session (e.g. a single email+password or passphrase
checked against an env-configured value) protecting the app, rather than a
full multi-user account system.

**Acceptance criteria:**
- The app is inaccessible without the single configured credential.
- Unauthenticated requests to profile/job APIs are rejected.

---

### TASK-012: Resume upload endpoint
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-011

**Description:** API route accepting a PDF resume upload, validating type/size,
storing the file (local disk in dev; pluggable for S3-compatible storage
later), and recording a `resumes` row.

**Acceptance criteria:**
- Non-PDF or oversized uploads are rejected with a clear error.
- Uploaded file is retrievable by the owning user only.

---

### TASK-013: Resume parsing pipeline
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-012

**Description:** Extract text from the uploaded PDF and derive structured
fields (name, contact, skills, work history, education, titles held).
Store both raw text and structured JSON on the `resumes` row.

**Acceptance criteria:**
- Given a sample resume PDF, structured JSON includes at least skills,
  past titles, and years of experience.
- Parsing failures are surfaced to the user, not silently swallowed.

---

### TASK-014: LinkedIn PDF upload + parsing
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-011

**Description:** Same upload pattern as TASK-012/013, targeting LinkedIn's
"Save to PDF" export format specifically (its section layout differs from a
generic resume).

**Acceptance criteria:**
- Given a sample LinkedIn export, structured JSON captures headline,
  experience, education, and skills sections distinctly from resume parsing.

---

### TASK-015: Merge parsed profile data
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-013, TASK-014

**Description:** Combine resume + LinkedIn structured data into one profile
view used by matching (EPIC-5) — resolve conflicts (e.g. differing title
casing) with simple precedence rules.

**Acceptance criteria:**
- A single `profile` read returns merged skills/titles/experience with source
  attribution per field.

---

### TASK-016: Onboarding UI flow
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-012, TASK-014

**Description:** Frontend flow: sign up -> upload resume -> upload LinkedIn
PDF -> review parsed data (editable) -> confirm.

**Acceptance criteria:**
- User can correct a misparsed field before saving.
- Flow is resumable if the user leaves and comes back mid-onboarding.

---

### TASK-017: Job title preference selector
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-010, TASK-016

**Description:** UI + API for picking up to 10 target job titles, editable
later from a profile settings page.

**Acceptance criteria:**
- Cannot save an 11th title; clear UI feedback at the limit.
- Titles are editable after initial onboarding.
