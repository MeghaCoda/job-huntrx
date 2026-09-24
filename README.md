# job-huntrx

A job-hunting assistant: upload a resume + LinkedIn PDF export, pick up to
10 target job titles, and get daily-refreshed, ranked job matches pulled
from legally-scrapable sources. See [`CLAUDE.md`](CLAUDE.md) for full scope
and [`planning/EPIC.md`](planning/EPIC.md) for the build plan.

## Prerequisites
- Node.js 24 (LTS) — see `.nvmrc`
- pnpm, via [Corepack](https://nodejs.org/api/corepack.html) (ships with
  Node — run `corepack enable` once, then pnpm resolves automatically from
  the `packageManager` field in `package.json`)
- Docker with Compose v2+ (for the local Postgres)

## Install

```sh
pnpm install
```

Installs dependencies for every workspace in one step.

## Local database

Postgres 18 runs via `docker-compose.yml`, bound to `127.0.0.1` only.

```sh
cp .env.example .env           # or append the Postgres vars to an existing .env
docker compose up -d --wait    # start and wait until healthy
docker compose down            # stop (data is kept in the `pgdata` volume)
docker compose down -v         # stop AND delete all local data — irreversible
```

Connection string (dev defaults from `.env.example`):

```
DATABASE_URL=postgresql://jobhuntrx:jobhuntrx_dev@127.0.0.1:5432/jobhuntrx
```

Open a `psql` shell without installing Postgres locally:

```sh
docker compose exec postgres psql -U jobhuntrx jobhuntrx
```

If you change `POSTGRES_*` in `.env`, update `DATABASE_URL` to match.
Credentials only apply when the volume is first created; after changing
them, run `docker compose down -v` to re-initialize.

## Database schema & migrations

`packages/db` uses [Prisma](https://www.prisma.io/) 7. The schema lives in
`packages/db/prisma/schema.prisma`, and migrations (plain SQL, committed) live in
`packages/db/prisma/migrations/`. Prisma reads `DATABASE_URL` from the root
`.env`.

```sh
pnpm db:migrate                          # apply pending migrations (safe: never writes or resets)
pnpm db:migrate:status                   # which migrations are applied / pending
pnpm db:migrate:dev --name <change>      # after editing schema.prisma: write + apply a new migration
pnpm db:generate                         # regenerate the typed client (build does this too)
pnpm --filter @job-huntrx/db db:studio   # browse data in a local web UI
pnpm --filter @job-huntrx/db db:smoke    # end-to-end client check (writes nothing)
```

`db:migrate:dev` is for development only. If the database has drifted from the
migration history, it offers to **reset** the database, which deletes all data.
Anywhere else (CI, deploys) use `db:migrate`.

The typed client in `src/generated/` is gitignored and rebuilt from the schema.
Use it from server code only:

```ts
import { getPrisma } from "@job-huntrx/db";
const users = await getPrisma().user.findMany();
```

Never import `@job-huntrx/db` from `apps/web`: it would bundle the Postgres
driver and connection details into the browser build.

## Layout

Pnpm workspace monorepo:

- `apps/web` — React + TypeScript frontend (Vite)
- `apps/api` — Next.js API
- `packages/db` — Postgres schema, migrations, typed client
- `packages/agent` — LangGraph agentic layer
- `packages/rag` — Chroma RAG client

Workspaces are added incrementally; see `planning/BOARD.md` for current
status (TASK-001A–F).

## License

[MIT](LICENSE)
