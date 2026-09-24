// Server-only: never import this package from apps/web (browser bundle).
export { createPrismaClient, getPrisma } from "./client.js";
export { Prisma, PrismaClient } from "./generated/prisma/client.js";
export type { User } from "./generated/prisma/client.js";
