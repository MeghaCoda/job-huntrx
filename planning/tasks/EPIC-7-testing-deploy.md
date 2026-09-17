# EPIC-7: Testing, CI/CD & Deployment

Goal: confidence to ship changes continuously, plus a deployed, monitored app.

---

### TASK-060: Unit test setup
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-001

**Description:** Test runner + conventions for `apps/web` (component/logic
tests) and `apps/api` (route/handler tests).

**Acceptance criteria:**
- `pnpm test` runs both suites; CI (TASK-005) runs it on every PR.

---

### TASK-061: Adapter integration tests
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-031

**Description:** Mocked-response tests per adapter (fixture JSON) covering
normalize + dedup logic without live network calls.

**Acceptance criteria:**
- Adapter tests run offline and deterministically in CI.

---

### TASK-062: E2E test — onboarding to job feed
- **Status:** todo
- **Priority:** P2
- **Depends on:** TASK-050

**Description:** Playwright (or similar) test covering sign-up -> upload ->
title selection -> seeing a ranked job feed.

**Acceptance criteria:**
- E2E suite runs in CI against a seeded test DB.

---

### TASK-063: Deployment target setup (decision required)
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-006

**Description:** Decide and configure hosting for `apps/web`/`apps/api`
(e.g. Vercel) and for Postgres + the scheduler/worker (e.g. Railway, Render,
Fly.io — needs a long-running process for the daily scheduler, which rules
out pure serverless-only hosts for that piece).

**Acceptance criteria:**
- A deploy from `main` reaches a live URL with working DB connectivity and a
  running scheduled job.

---

### TASK-064: Observability
- **Status:** todo
- **Priority:** P2
- **Depends on:** TASK-063

**Description:** Structured logging, error tracking (e.g. Sentry), and
alerting when a scheduled adapter run fails or the retention job errors.

**Acceptance criteria:**
- A forced adapter failure produces a visible alert/log entry, not silence.
