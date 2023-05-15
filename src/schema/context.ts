import { PrismaClient } from "../prisma";

export interface Context {
  uid: string | null;
  prisma: PrismaClient;
}

export interface AuthorisedContext extends Context {
  uid: string;
}
