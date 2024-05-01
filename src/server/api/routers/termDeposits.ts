import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const termDepositsRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.termDeposit.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure.input(
    z.object({
      productName: z.string(),
      amount: z.number(),
      duration: z.number(),
      interest: z.number(),
      createdAt: z.date(),
    }),
  ).mutation(({ ctx, input }) => {
    return ctx.db.termDeposit.create({
      data: {
        productName: input.productName,
        amount: input.amount,
        duration: input.duration,
        interest: input.interest,
        createdAt: input.createdAt,
        userId: ctx.session.user.id,
      },
    });
  }),
  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.db.termDeposit.delete({
      where: {
        id: input,
      },
    });
  }),
});
