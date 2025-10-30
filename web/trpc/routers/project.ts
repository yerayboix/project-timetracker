import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { projects } from "../../lib/db/schema/project";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  getById: baseProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const project = await db.query.projects.findFirst({
        where: eq(projects.id, input.projectId),
      });

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Proyecto no encontrado",
        });
      }

      return project;
    }),

  // Get all projects for the current user
  listByCurrentUser: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.query.projects.findMany({
        where: eq(projects.ownerId, ctx.user.id),
      });
    }),

  // Create a new project
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "El nombre es requerido"),
        description: z.string().optional(),
        color: z.string().optional(),
        hourlyRate: z.number().optional(),
        estimatedHours: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const ownerId = ctx.user.id;

      const [created] = await db.insert(projects).values({ ...input, ownerId }).returning();

      if (!created) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo crear el proyecto",
        });
      }

      return created;
    }),

  // Update a project
  update: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { projectId, ...data } = input;

      const [updated] = await db
        .update(projects)
        .set(data)
        .where(
          sql`${projects.id} = ${projectId} and ${projects.ownerId} = ${ctx.user.id}`
        )
        .returning();

      if (!updated) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Proyecto no encontrado",
        });
      }

      return updated;
    }),

  // Delete a project
  delete: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [deleted] = await db
        .delete(projects)
        .where(
          sql`${projects.id} = ${input.projectId} and ${projects.ownerId} = ${ctx.user.id}`
        )
        .returning();

      if (!deleted) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Proyecto no encontrado",
        });
      }

      return deleted;
    }),
});
