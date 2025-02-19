import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { readings } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const userId = "test";

export const readingsRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ systolic: z.number(), diastolic: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(readings).values({
        systolic: input.systolic,
        diastolic: input.diastolic,
        userId,
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const latestReadings = await ctx.db.query.readings.findMany({
      orderBy: (readings, { asc }) => [asc(readings.createdAt)],
      where: eq(readings.userId, userId),
    });

    return (
      latestReadings.map((reading) => ({
        ...reading,
        createdAt: reading.createdAt.toISOString(),
      })) ?? []
    );
  }),
});
