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

---

### TASK-065: Debug mode with LangSmith tracing (off by default)
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-004, TASK-042

**Description:** LangSmith tracing (pulled in transitively via
`@langchain/core`) uploads every agent step's full inputs and outputs —
including resume/LinkedIn PII — to a third-party service when
`LANGSMITH_TRACING` (or legacy `LANGCHAIN_TRACING_V2`) is set. Decided
2026-09-23: tracing stays off unless the app is explicitly started in debug
mode. Add a single debug-mode switch that is the only way to enable
tracing, and guard against tracing being turned on any other way (e.g. a
stray env var in the hosting dashboard or a copied `.env`). Raised as a
LOW finding in the TASK-001E security review.

**Acceptance criteria:**
- `.env.example` sets `LANGSMITH_TRACING=false` and documents debug mode.
- A single explicit debug-mode setting enables tracing; without it,
  tracing is off regardless of other LangSmith/LangChain env vars.
- If tracing env vars are set while debug mode is off, the agent/API
  process fails fast (or forces tracing off) at boot with a clear message.
- Debug mode is visibly indicated when active (startup log line at
  minimum) so it isn't left on unnoticed in a deployment.
