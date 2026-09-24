import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

/**
 * Build a new Prisma client backed by the `pg` driver. Most callers should use
 * `getPrisma()` instead so the process shares one connection pool.
 */
export function createPrismaClient(
  connectionString: string | undefined = process.env.DATABASE_URL,
): PrismaClient {
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set — @job-huntrx/db needs it to connect to Postgres (see .env.example).",
    );
  }
  return new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
}

// Cached on globalThis so Next.js dev hot-reload reuses one pool instead of
// opening a new one on every module reload.
const globalForPrisma = globalThis as typeof globalThis & {
  __jobHuntrxPrisma?: PrismaClient;
};

/**
 * Shared, lazily-created Prisma client. Importing this package never touches
 * the database or requires DATABASE_URL; the first `getPrisma()` call does.
 */
export function getPrisma(): PrismaClient {
  globalForPrisma.__jobHuntrxPrisma ??= createPrismaClient();
  return globalForPrisma.__jobHuntrxPrisma;
}
