To integrate prisma version 6 with next js follwo this step

1)pnpm add prisma@6 @prisma/client@6
2)pnpm prisma init

3)Setup MongoDB connection (remember to use database name)
4)Define schema

5)pnpm prisma generate
6)pnpm prisma db push
7)Create Prisma client file

    import { PrismaClient } from "@prisma/client";

    const globalForPrisma = global;

    export const prisma =
    globalForPrisma.prisma || new PrismaClient();

    if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
    }
