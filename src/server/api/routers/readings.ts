import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { readings } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import type { BloodPressureReading } from "@/lib/types";

export const readingsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ systolic: z.number(), diastolic: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(readings).values({
        systolic: input.systolic,
        diastolic: input.diastolic,
        userId: ctx.auth.userId,
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const latestReadings = await ctx.db.query.readings.findMany({
      orderBy: (readings, { asc }) => [asc(readings.createdAt)],
      where: eq(readings.userId, ctx.auth.userId),
    });

    const res: BloodPressureReading[] =
      latestReadings.map((reading) => ({
        ...reading,
        createdAt: reading.createdAt.toISOString(),
      })) ?? [];

    return res;
  }),
});
