import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userDataRouter = createTRPCRouter({
  getUserData: protectedProcedure
  .query(({ctx}) => {
    return ctx.db.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),

  transaction: protectedProcedure
  .input(z.object({sum: z.number()}))
  .mutation(async ({ctx, input}) => {
    return ctx.db.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        money: input.sum,
      },
    });
  }),
});
