# Board

Live index of every task. Update the `Status` column here whenever a task's
status changes in its epic file (todo / in-progress / blocked / done). Full
detail, acceptance criteria, and dependencies live in `tasks/EPIC-*.md`.

## Phase 1 — [EPIC-1: Foundation](tasks/EPIC-1-foundation.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-001 | Initialize repo & workspace layout (see subtasks below) | done | P0 | — |
| TASK-001A | Subtask: Root init & workspace config | done | P0 | — |
| TASK-001B | Subtask: apps/web (Vite + React + TS) | done | P0 | TASK-001A |
| TASK-001C | Subtask: apps/api (Next.js) | done | P0 | TASK-001A |
| TASK-001D | Subtask: packages/db | done | P0 | TASK-001A |
| TASK-001E | Subtask: packages/agent (LangGraph) | done | P0 | TASK-001A |
| TASK-001F | Subtask: packages/rag (Chroma client) | done | P0 | TASK-001A |
| TASK-002 | Postgres via docker-compose | todo | P0 | TASK-001 |
| TASK-003 | ORM & migrations setup | todo | P0 | TASK-002 |
| TASK-004 | Environment & secrets handling | todo | P1 | TASK-001 |
| TASK-005 | CI pipeline skeleton | todo | P1 | TASK-001 |
| TASK-006 | Base app shell | todo | P0 | TASK-001, TASK-003 |

## Phase 2 — [EPIC-2: Onboarding](tasks/EPIC-2-onboarding.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-010 | Schema — users/resumes/linkedin/job_titles | todo | P0 | TASK-003 |
| TASK-011 | Auth (decision required) | todo | P0 | TASK-010 |
| TASK-012 | Resume upload endpoint | todo | P0 | TASK-011 |
| TASK-013 | Resume parsing pipeline | todo | P0 | TASK-012 |
| TASK-014 | LinkedIn PDF upload + parsing | todo | P0 | TASK-011 |
| TASK-015 | Merge parsed profile data | todo | P1 | TASK-013, TASK-014 |
| TASK-016 | Onboarding UI flow | todo | P0 | TASK-012, TASK-014 |
| TASK-017 | Job title preference selector | todo | P0 | TASK-010, TASK-016 |

## Phase 3 — [EPIC-3: Source Research & Compliance](tasks/EPIC-3-source-research.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-020 | Audit ATS public job APIs | todo | P2 | — |
| TASK-021 | Audit job-board aggregator APIs | todo | P2 | — |
| TASK-022 | Explicit exclusion list | done | P0 | — |
| TASK-023 | Compliance card template | done | P1 | — |

## Phase 4 — [EPIC-4: Aggregation Pipeline](tasks/EPIC-4-aggregation.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-030 | Jobs schema | todo | P0 | TASK-003 |
| TASK-031 | Source adapter interface | todo | P0 | TASK-030 |
| TASK-032 | First adapter, end-to-end | todo | P0 | TASK-031, EPIC-3 approval |
| TASK-033 | Deduplication logic | todo | P0 | TASK-032 |
| TASK-034 | Daily refetch scheduler | todo | P0 | TASK-032 |
| TASK-035 | Retention/TTL cleanup job | todo | P0 | TASK-030 |
| TASK-036 | Rate limiting & backoff | todo | P1 | TASK-031 |
| TASK-037 | Additional adapters | todo | P2 | TASK-032, EPIC-3 approval |

## Phase 5 — [EPIC-5: Matching & Ranking](tasks/EPIC-5-matching.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-040 | Chroma setup & profile embeddings | todo | P0 | TASK-015 |
| TASK-041 | Job description embeddings | todo | P0 | TASK-032, TASK-040 |
| TASK-042 | LangGraph ranking agent | todo | P0 | TASK-041 |
| TASK-043 | Persist match score + rationale | todo | P0 | TASK-042, TASK-030 |
| TASK-044 | Relevance feedback loop (stretch) | todo | P2 | TASK-043 |

## Phase 6 — [EPIC-6: Frontend Dashboard](tasks/EPIC-6-dashboard.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-050 | Job feed/dashboard UI | todo | P0 | TASK-043 |
| TASK-051 | Job detail view | todo | P1 | TASK-050 |
| TASK-052 | Mark-as-applied action | todo | P0 | TASK-050, TASK-035 |
| TASK-053 | Saved/dismissed states | todo | P1 | TASK-050 |
| TASK-054 | Profile management UI | todo | P1 | TASK-017 |

## Phase 7 — [EPIC-7: Testing, CI/CD & Deployment](tasks/EPIC-7-testing-deploy.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-060 | Unit test setup | todo | P1 | TASK-001 |
| TASK-061 | Adapter integration tests | todo | P1 | TASK-031 |
| TASK-062 | E2E test — onboarding to job feed | todo | P2 | TASK-050 |
| TASK-063 | Deployment target setup (decision required) | todo | P1 | TASK-006 |
| TASK-064 | Observability | todo | P2 | TASK-063 |
| TASK-065 | Debug mode with LangSmith tracing (off by default) | todo | P1 | TASK-004, TASK-042 |

## Definition of done
Security and QA are top priorities on this project. No task above is "done"
until its diff has been reviewed by the
[`code-reviewer`](../.claude/agents/code-reviewer.md) subagent **and** the
[`code-review-security`](../.claude/skills/code-review-security/SKILL.md)
skill, and any findings are resolved or explicitly accepted.

## Next up
Start here: **TASK-002** (Postgres via docker-compose — P0, on the
critical path to TASK-003 ORM/migrations, which needs the ORM decision).
TASK-001 is done (all six subtasks), so TASK-004 (env & secrets), TASK-005
(CI skeleton), and TASK-060 (unit test setup) are also unblocked and can
run in parallel.

**2026-09-23 update:** EPIC-3 is now effectively cleared for MVP — Remote
Rocketship is an approved source (`planning/compliance/remote-rocketship.md`),
TASK-022/023 are done, and TASK-020/021 are downgraded to P2 backlog
(broader source audits, not launch blockers). The app's scope is also
now single-user only (no multi-tenant use case), which simplifies
TASK-011 (auth) to a single-user access gate and TASK-034 (scheduler,
EPIC-4) to one daily run with no cross-user rate-limit coalescing.
EPIC-4's retention model (TASK-030/TASK-035) changed from 30/90 days to
48 hours after `posted_at` for ordinary jobs, and 30 days from
applied/favorited date for a minimal snapshot of applied/favorited jobs
only — see `planning/EPIC.md` Product summary and the EPIC-4 task file
for detail.
