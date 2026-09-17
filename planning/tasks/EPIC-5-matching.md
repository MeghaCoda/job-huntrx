# EPIC-5: Matching & Ranking (LangGraph + Chroma)

Goal: incoming jobs are scored for fit against a user's profile and preferred
titles, with the score visible to the user.

---

### TASK-040: Chroma setup & profile embeddings
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-015

**Description:** Stand up Chroma (local/embedded for dev), embed each user's
merged profile (skills, experience, titles) into a collection.

**Acceptance criteria:**
- A user's profile embedding is created/updated when their profile changes.

---

### TASK-041: Job description embeddings
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-032, TASK-040

**Description:** Embed each normalized job description on ingest into its own
Chroma collection, keyed by job id.

**Acceptance criteria:**
- Every job inserted by an adapter has a corresponding embedding within the
  same pipeline run (or a fast async follow-up).

---

### TASK-042: LangGraph ranking agent
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-041

**Description:** LangGraph graph that: retrieves top-N similar jobs for a
user from Chroma, then scores/reasons about fit (title match, skills overlap,
seniority) and outputs a numeric score + short rationale.

**Acceptance criteria:**
- Given a fixed profile + fixed job set, the agent produces stable,
  explainable scores (same inputs -> same ranking order).

---

### TASK-043: Persist match score + rationale
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-042, TASK-030

**Description:** Store `match_score` and a short rationale string on
`user_jobs`, recomputed on new job ingest and on profile edits.

**Acceptance criteria:**
- Dashboard (EPIC-6) can sort by `match_score` without recomputing on read.

---

### TASK-044: Relevance feedback loop (stretch)
- **Status:** todo
- **Priority:** P2
- **Depends on:** TASK-043

**Description:** Let users mark a job relevant/not relevant; feed that signal
back into future ranking (e.g. adjust retrieval weighting per user).

**Acceptance criteria:**
- Marking several jobs "not relevant" measurably changes future scores for
  similar jobs for that user.
