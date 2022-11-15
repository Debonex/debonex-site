import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

// https://github.com/prisma/prisma/issues/5103
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
