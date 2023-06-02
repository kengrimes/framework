import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

const router = t.router({
  test: t.procedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ message: z.string() }))
    .query(({ input }) => {
      return { message: `Hello ${input.name}` };
    }),
});

export default router;
export type AppRouter = typeof router;
