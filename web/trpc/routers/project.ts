import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/lib/db";
import { eq, sql } from "drizzle-orm";
import { projects } from "../../lib/db/schema/project";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  // Obtener proyecto por ID
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

  // Listar todos los proyectos
  listByCurrentUser: protectedProcedure
    .query(async ({ ctx }) => {
      return await db.query.projects.findMany({
        where: eq(projects.ownerId, ctx.user.id),
      });
    }),

  // Crear proyecto
  create: baseProcedure
    .input(
      z.object({
        name: z.string().min(1, "El nombre es requerido"),
        ownerId: z.string().min(1, "El ownerId es requerido"),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const [created] = await db.insert(projects).values(input).returning();

      if (!created) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo crear el proyecto",
        });
      }

      return created;
    }),

  // Actualizar proyecto
  update: baseProcedure
    .input(
      z.object({
        projectId: z.string(),
        ownerId: z.string().min(1, "El ownerId es requerido"),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { projectId, ...data } = input;

      const [updated] = await db
        .update(projects)
        .set(data)
        .where(
          sql`${projects.id} = ${projectId} and ${projects.ownerId} = ${input.ownerId}`
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

  // Eliminar proyecto
  delete: baseProcedure
    .input(
      z.object({
        projectId: z.string(),
        ownerId: z.string().min(1, "El ownerId es requerido"),
      })
    )
    .mutation(async ({ input }) => {
      const [deleted] = await db
        .delete(projects)
        .where(
          sql`${projects.id} = ${input.projectId} and ${projects.ownerId} = ${input.ownerId}`
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
