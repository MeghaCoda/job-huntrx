# EPIC-3: Job Source Research & Legal Compliance

Goal: a written, evidence-backed list of job sources we're allowed to pull
from, before any scraper code is written against them. Hard constraint from
CLAUDE.md: never scrape LinkedIn, Indeed, or any site whose ToS/robots.txt
forbids bots/crawlers.

---

### TASK-020: Audit ATS public job APIs
- **Status:** todo
- **Priority:** P2
- **Depends on:** —
- **Note (2026-09-23):** Downgraded from P0 — Remote Rocketship
  (`planning/compliance/remote-rocketship.md`, approved) is sufficient as
  the single source for the single-user MVP. This becomes "add another
  source later" work, not a launch blocker.

**Description:** Evaluate ATS platforms that expose public, intended-for-reuse
job feeds (e.g. Greenhouse Job Board API, Lever Postings API, Ashby, Workable,
SmartRecruiters, Recruitee). These typically publish jobs specifically for
external listing, but confirm current ToS per platform before use.

**Acceptance criteria:**
- One compliance card (TASK-023 template) per platform, with a clear
  approve/reject decision and the ToS/robots.txt evidence link or excerpt.

---

### TASK-021: Audit job-board aggregator APIs
- **Status:** todo
- **Priority:** P2
- **Depends on:** —
- **Note (2026-09-23):** Downgraded from P0 — same reasoning as TASK-020.
  Remote Rocketship already covers this category (aggregator API with a
  paid key) and is approved; further aggregator audits are backlog for
  broader coverage, not required for MVP.

**Description:** Evaluate sources with official public APIs meant for
programmatic access (e.g. USAJobs, Adzuna, Jooble, RemoteOK, government/state
job boards). Confirm licensing terms (some require an API key + attribution,
some cap usage).

**Acceptance criteria:**
- One compliance card per source with rate limits and attribution
  requirements noted.

---

### TASK-022: Explicit exclusion list
- **Status:** done
- **Priority:** P0
- **Depends on:** —
- **Completed:** 2026-09-23 — `planning/compliance/excluded.md` exists and
  lists LinkedIn, Indeed, Glassdoor, and ZipRecruiter with reasons and
  revisit conditions.

**Description:** Document sites we will never scrape and why (LinkedIn,
Indeed, Glassdoor, ZipRecruiter unless a licensed API is obtained later).
Keep this list next to the approved list so future contributors don't
reintroduce a banned source.

**Acceptance criteria:**
- Exclusion list lives in this repo (e.g. `planning/compliance/excluded.md`)
  and is referenced from the adapter-authoring skill (see root SKILLS.md).

---

### TASK-023: Compliance card template
- **Status:** done
- **Priority:** P1
- **Depends on:** —
- **Completed:** 2026-09-23 — `planning/compliance/_template.md` exists;
  `planning/compliance/remote-rocketship.md` is the first card built from
  it (approved, with one open residual-risk note on cache retention).

**Description:** Standard template capturing: source name, ToS URL + excerpt,
robots.txt status, auth method, rate limits, fields available, decision
(approved/rejected), decision date, reviewer. This becomes the checklist a
future `scraper-compliance-check` skill (see root SKILLS.md) automates.

**Acceptance criteria:**
- Template file exists (e.g. `planning/compliance/_template.md`).
- TASK-020/021 cards use it consistently.
