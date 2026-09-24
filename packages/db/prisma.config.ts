import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Prisma 7 doesn't auto-load .env, and ours lives at the repo root.
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
loadEnv({ path: path.join(repoRoot, ".env"), quiet: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Plain process.env (not Prisma's env(), which throws when unset) so that
    // `prisma generate` — and therefore `build` — works without a database,
    // e.g. in CI. Migrate commands still fail clearly if it's missing.
    url: process.env.DATABASE_URL,
  },
});
