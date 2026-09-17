# EPIC-3: Job Source Research & Legal Compliance

Goal: a written, evidence-backed list of job sources we're allowed to pull
from, before any scraper code is written against them. Hard constraint from
CLAUDE.md: never scrape LinkedIn, Indeed, or any site whose ToS/robots.txt
forbids bots/crawlers.

---

### TASK-020: Audit ATS public job APIs
- **Status:** todo
- **Priority:** P0
- **Depends on:** —

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
- **Priority:** P0
- **Depends on:** —

**Description:** Evaluate sources with official public APIs meant for
programmatic access (e.g. USAJobs, Adzuna, Jooble, RemoteOK, government/state
job boards). Confirm licensing terms (some require an API key + attribution,
some cap usage).

**Acceptance criteria:**
- One compliance card per source with rate limits and attribution
  requirements noted.

---

### TASK-022: Explicit exclusion list
- **Status:** todo
- **Priority:** P0
- **Depends on:** —

**Description:** Document sites we will never scrape and why (LinkedIn,
Indeed, Glassdoor, ZipRecruiter unless a licensed API is obtained later).
Keep this list next to the approved list so future contributors don't
reintroduce a banned source.

**Acceptance criteria:**
- Exclusion list lives in this repo (e.g. `planning/compliance/excluded.md`)
  and is referenced from the adapter-authoring skill (see root SKILLS.md).

---

### TASK-023: Compliance card template
- **Status:** todo
- **Priority:** P1
- **Depends on:** —

**Description:** Standard template capturing: source name, ToS URL + excerpt,
robots.txt status, auth method, rate limits, fields available, decision
(approved/rejected), decision date, reviewer. This becomes the checklist a
future `scraper-compliance-check` skill (see root SKILLS.md) automates.

**Acceptance criteria:**
- Template file exists (e.g. `planning/compliance/_template.md`).
- TASK-020/021 cards use it consistently.
