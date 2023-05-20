import { PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = (global as unknown) as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
}

if (process.env.NODE_ENV === "development") {
  if (!globalForPrisma.prisma) {
    prisma = globalForPrisma.prisma = new PrismaClient({
      log: ["query", "info", "warn"],
    });
  } else {
    prisma = globalForPrisma.prisma;
  }
}

export { prisma, PrismaClient };
