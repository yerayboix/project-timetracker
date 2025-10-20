import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { projectRouter } from "./project";

export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
