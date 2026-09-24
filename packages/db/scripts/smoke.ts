// End-to-end check of the Prisma client + pg adapter against the local DB.
// Writes a throwaway user inside a transaction and rolls it back, so it leaves
// no data behind. Stand-in until TASK-060 adds a test framework.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { createPrismaClient } from "../src/client.js";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
loadEnv({ path: path.join(repoRoot, ".env"), quiet: true });

class Rollback extends Error {}

const prisma = createPrismaClient();
const email = `smoke-${Date.now()}@example.invalid`;

try {
  await prisma.$transaction(async (tx) => {
    const created = await tx.user.create({ data: { email } });
    const found = await tx.user.findUnique({ where: { id: created.id } });
    if (found?.email !== email) throw new Error("read-back mismatch");
    console.log(`ok: inserted + read back user ${created.id} (${created.createdAt.toISOString()})`);
    throw new Rollback();
  });
} catch (err) {
  if (!(err instanceof Rollback)) throw err;
} finally {
  await prisma.$disconnect();
}

const prismaAfter = createPrismaClient();
try {
  const leftover = await prismaAfter.user.count({ where: { email } });
  if (leftover !== 0) throw new Error("rollback failed: smoke user still present");
  console.log("ok: transaction rolled back, no data left behind");
} finally {
  await prismaAfter.$disconnect();
}
