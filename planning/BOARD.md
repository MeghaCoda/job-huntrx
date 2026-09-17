# Board

Live index of every task. Update the `Status` column here whenever a task's
status changes in its epic file (todo / in-progress / blocked / done). Full
detail, acceptance criteria, and dependencies live in `tasks/EPIC-*.md`.

## Phase 1 — [EPIC-1: Foundation](tasks/EPIC-1-foundation.md)
| ID | Title | Status | Priority | Depends on |
|---|---|---|---|---|
| TASK-001 | Initialize repo & workspace layout (see subtasks below) | todo | P0 | — |
| TASK-001A | Subtask: Root init & workspace config | done | P0 | — |
| TASK-001B | Subtask: apps/web (Vite + React + TS) | todo | P0 | TASK-001A |
| TASK-001C | Subtask: apps/api (Next.js) | todo | P0 | TASK-001A |
| TASK-001D | Subtask: packages/db | todo | P0 | TASK-001A |
| TASK-001E | Subtask: packages/agent (LangGraph) | todo | P0 | TASK-001A |
| TASK-001F | Subtask: packages/rag (Chroma client) | todo | P0 | TASK-001A |
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
| TASK-020 | Audit ATS public job APIs | todo | P0 | — |
| TASK-021 | Audit job-board aggregator APIs | todo | P0 | — |
| TASK-022 | Explicit exclusion list | todo | P0 | — |
| TASK-023 | Compliance card template | todo | P1 | — |

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

## Definition of done
Security and QA are top priorities on this project. No task above is "done"
until its diff has been reviewed by the
[`code-reviewer`](../.claude/agents/code-reviewer.md) subagent **and** the
[`code-review-security`](../.claude/skills/code-review-security/SKILL.md)
skill, and any findings are resolved or explicitly accepted.

## Next up
Start here: **TASK-001B** (TASK-001A is done; TASK-001C/D/E/F are also
unblocked and can be done in any order). Before EPIC-4 work begins in earnest, get EPIC-3
(source compliance) far enough along to have at least one approved source
for TASK-032.
