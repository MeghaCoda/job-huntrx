# EPIC-1: Project Foundation & Infrastructure

Goal: a running skeleton — repo structure, Postgres, base API and web app —
that later epics build on.

---

### TASK-001: Initialize repo & workspace layout
- **Status:** done
- **Completed:** 2026-09-23 — All six subtasks (TASK-001A–F) done; workspace
  has apps/web, apps/api, packages/db, packages/agent, packages/rag and
  installs with one `pnpm install`.
- **Priority:** P0
- **Depends on:** —
- **Note:** Split into subtasks TASK-001A–TASK-001F below (decided
  2026-09-17: pnpm workspaces, no Turborepo yet — see EPIC.md open
  decisions). TASK-001 itself is done when all six subtasks are done.

**Description:** `git init`; set up a workspace (pnpm workspaces) with
`apps/web` (Vite + React + TS), `apps/api` (Next.js), `packages/db`
(schema/migrations/client), `packages/agent` (LangGraph), `packages/rag`
(Chroma client). Add root `.gitignore`, `README.md`.

**Acceptance criteria:**
- Repo has the directory layout above and installs cleanly with one command.
- `.gitignore` excludes `node_modules`, `.env*`, build output, uploaded files.

---

### TASK-001A: Subtask — Root init & workspace config
- **Status:** done
- **Priority:** P0
- **Depends on:** —
- **Completed:** 2026-09-17 — git init + root package.json (pnpm workspace,
  engines node>=22<23, packageManager pnpm@12.4.2) + pnpm-workspace.yaml
  (apps/*, packages/*) + .gitignore + README.md; `pnpm install` verified
  working; reviewed by code-reviewer (APPROVE, 2 low non-blocking notes: no
  `.nvmrc` yet, `.gitignore` may need `coverage/`/`*.tsbuildinfo` entries
  once TS/tests land) and code-review-security (no findings).

**Description:** `git init` the repo; add root `package.json` with pnpm
workspace config (`pnpm-workspace.yaml` listing `apps/*` and `packages/*`);
root `.gitignore`; root `README.md` describing the layout and the single
install command. No app/package code yet — just the shell the other five
subtasks fill in.

**Acceptance criteria:**
- `git status` shows a clean initialized repo.
- `pnpm install` runs successfully at the root with zero workspaces
  populated yet (empty `apps/`, `packages/` dirs are fine at this point).
- `.gitignore` excludes `node_modules`, `.env*`, build output, uploaded
  files.

---

### TASK-001B: Subtask — apps/web (Vite + React + TS)
- **Status:** done
- **Priority:** P0
- **Depends on:** TASK-001A
- **Completed:** 2026-09-17 — Scaffolded via `pnpm create vite@latest
  apps/web --template react-ts`, wired into root pnpm workspace (package
  name "web", no standalone lockfile/node_modules); `pnpm --filter web dev`
  verified booting (HTTP 200). Also corrected root package.json engines
  from `>=22<23` to `>=24<25` with new `.nvmrc` (24) and README update,
  since Node 24 is the actual current Active LTS (Node 22 moved to
  Maintenance LTS Oct 2025) — this was a mistake in the earlier TASK-001A
  Node-version recommendation. Reviewed by code-reviewer (APPROVE, 0
  findings) and code-review-security (0 findings).

**Description:** Scaffold `apps/web` as a Vite + React + TypeScript app,
wired into the pnpm workspace.

**Acceptance criteria:**
- `pnpm --filter web dev` boots the app locally.
- Included in the root install; no standalone `node_modules` /
  `package-lock.json` inside `apps/web`.

---

### TASK-001C: Subtask — apps/api (Next.js)
- **Status:** done
- **Priority:** P0
- **Depends on:** TASK-001A
- **Completed:** 2026-09-21 — Scaffolded via `pnpm create next-app@latest
  apps/api --api` (headless App Router, TypeScript, ESLint, no Tailwind,
  `--skip-install --disable-git`), wired into the pnpm workspace as package
  "api"/"0.0.0"; added `eslint.config.mjs` + `lint` script (Next 16 removed
  `next lint`), bumped `@types/node` to match apps/web's convention; folded
  the scaffold's nested `pnpm-workspace.yaml` (`allowBuilds`) into the root
  one. `pnpm --filter api dev`/`build`/`lint` all verified. Reviewed by
  code-reviewer (APPROVE, 1 low note fixed) and code-review-security (1
  finding fixed, 1 deferred to TASK-006).

**Description:** Scaffold `apps/api` as a Next.js (TypeScript) app, wired
into the pnpm workspace.

**Acceptance criteria:**
- `pnpm --filter api dev` boots the app locally.
- Included in the root install; no standalone lockfile inside `apps/api`.

---

### TASK-001D: Subtask — packages/db
- **Status:** done
- **Priority:** P0
- **Depends on:** TASK-001A
- **Completed:** 2026-09-21 — Scaffolded `packages/db` as an installable
  pnpm workspace package named `@job-huntrx/db`: `package.json` (type
  module, `main`/`types` pointing at `dist/`, `build` via `tsc`,
  `typecheck` script, single `typescript` devDependency), `tsconfig.json`
  (ES2022/NodeNext, strict, declaration emit to `dist/`, `rootDir` `src`),
  and `src/index.ts` placeholder (`export {}`). Added
  `"@job-huntrx/db": "workspace:*"` to `apps/api/package.json`
  dependencies (no usage added inside `apps/api` source yet — that's
  TASK-003/TASK-006 work). Verified `pnpm install` links the workspace
  package, `pnpm --filter @job-huntrx/db build`/`typecheck` both pass, a
  scratch import check confirmed it resolves from `apps/api` (then
  discarded), and `pnpm --filter api dev` still boots. Reviewed by
  code-reviewer (APPROVE, 2 low non-blocking notes for TASK-003: no
  `exports` field yet; NodeNext will need explicit `.js` extensions on
  relative imports once added) and code-review-security (no findings).

**Description:** Scaffold `packages/db` as an installable workspace package
(empty shell for now — schema/migrations/client land in TASK-003).

**Acceptance criteria:**
- Package builds/typechecks with no source yet beyond a placeholder entry
  point.
- Importable from `apps/api` via the workspace protocol
  (`"@job-huntrx/db": "workspace:*"`).

---

### TASK-001E: Subtask — packages/agent (LangGraph)
- **Status:** done
- **Completed:** 2026-09-23 — Scaffolded `packages/agent` as workspace
  package `@job-huntrx/agent` mirroring `packages/db` (same package.json
  shape, identical tsconfig, placeholder `src/index.ts`); dependencies
  `@langchain/langgraph` ^1.4.17 + `@langchain/core` ^1.2.12 (required
  peer; zod peer satisfied transitively). Not wired into `apps/api` yet.
  Verified install/build/typecheck, `StateGraph` import resolves, db/api
  still build. Reviewed by code-reviewer (APPROVE, 0 findings) and
  code-review-security (1 LOW: transitive `langsmith` tracing could export
  PII if env-enabled — tracked as TASK-065, tracing off unless debug mode).
- **Priority:** P0
- **Depends on:** TASK-001A

**Description:** Scaffold `packages/agent` as an installable workspace
package for the LangGraph agentic layer (empty shell for now — real graph
logic lands in EPIC-5).

**Acceptance criteria:**
- Package builds/typechecks with no source yet beyond a placeholder entry
  point.
- `langgraph` (or chosen LangGraph JS package) listed as a dependency.

---

### TASK-001F: Subtask — packages/rag (Chroma client)
- **Status:** done
- **Completed:** 2026-09-23 — Scaffolded `packages/rag` as workspace
  package `@job-huntrx/rag` mirroring `packages/agent` (same package.json
  shape, identical tsconfig, placeholder `src/index.ts`); dependency
  `chromadb` ^3.5.0 (official chroma-core package; pulls optional prebuilt
  native `chromadb-js-bindings-*`, no install scripts). Verified
  install/build/typecheck, `ChromaClient` import resolves, agent/db/api
  still build. Reviewed by code-reviewer (APPROVE; 1 MEDIUM: stale
  CHECKPOINT.md, fixed via /checkpoint) and code-review-security (3 LOW,
  accepted: unneeded native bindings — revisit at TASK-040; transitive
  langsmith PII risk — tracked as TASK-065; caret ranges — rely on
  `--frozen-lockfile` in CI, TASK-005).
- **Priority:** P0
- **Depends on:** TASK-001A

**Description:** Scaffold `packages/rag` as an installable workspace
package for the Chroma RAG client (empty shell for now — real embedding/
retrieval logic lands in EPIC-5).

**Acceptance criteria:**
- Package builds/typechecks with no source yet beyond a placeholder entry
  point.
- `chromadb` (or chosen Chroma JS client) listed as a dependency.

---

### TASK-002: Postgres via docker-compose
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-001

**Description:** `docker-compose.yml` with a Postgres service, persistent
volume, and a `.env.example` with `DATABASE_URL`.

**Acceptance criteria:**
- `docker compose up` gives a reachable local Postgres instance.
- Connection string documented in README.

---

### TASK-003: ORM & migrations setup
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-002

**Description:** Pick and configure a migration tool for `packages/db`
(Prisma or Drizzle — decide once, see EPIC.md open decisions). Write the
first migration: a bare `users` table.

**Acceptance criteria:**
- `db:migrate` script applies migrations against the docker Postgres.
- Typed client importable from `packages/db` in both `apps/web`-adjacent
  server code and `apps/api`.

---

### TASK-004: Environment & secrets handling
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-001

**Description:** Consistent env var loading across `apps/api` and workers,
`.env.example` per app, documented required vars.

**Acceptance criteria:**
- No secret committed to the repo.
- Missing required env var fails fast with a clear error at boot.

---

### TASK-005: CI pipeline skeleton
- **Status:** todo
- **Priority:** P1
- **Depends on:** TASK-001

**Description:** GitHub Actions (or chosen CI) running lint, typecheck, and
test on every PR across all workspace packages.

**Acceptance criteria:**
- CI fails on a lint/type/test error; passes on a clean PR.

---

### TASK-006: Base app shell
- **Status:** todo
- **Priority:** P0
- **Depends on:** TASK-001, TASK-003

**Description:** `apps/api` exposes a `/api/health` route hitting Postgres.
`apps/web` boots via Vite, calls `/api/health`, renders the result. Shared
ESLint/Prettier/tsconfig across workspaces.

**Acceptance criteria:**
- `pnpm dev` runs both apps; web page shows API+DB are reachable.
