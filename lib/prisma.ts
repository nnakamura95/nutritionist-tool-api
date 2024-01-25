import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime/library";
import QueryEvent = Prisma.QueryEvent;

const prisma: PrismaClient = new PrismaClient<PrismaClientOptions>(
  process.env.DATABASE_LOG === "ON"
    ? {
        log: [
          {
            emit: "event",
            level: "query",
          },
        ],
      }
    : {},
);

prisma.$on("query" as never, async (event: QueryEvent) => {
  console.log("Query:", event.query);
  console.log("Params:", event.params);
  console.log("Duration:", event.duration, "ms");
});

export default prisma;