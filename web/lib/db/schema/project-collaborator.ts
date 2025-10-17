import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { projects } from './project';
import { user } from './auth-schema';

export const projectCollaborators = sqliteTable('project_collaborators', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  canEdit: integer('can_edit', { mode: 'boolean' }).notNull().default(true),
  joinedAt: integer('joined_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => ({
  projectIdx: index('collaborators_project_idx').on(table.projectId),
  userIdx: index('collaborators_user_idx').on(table.userId),
  uniqueCollaborator: uniqueIndex('collaborators_unique_idx').on(table.projectId, table.userId),
}));

export type ProjectCollaborator = typeof projectCollaborators.$inferSelect;
export type NewProjectCollaborator = typeof projectCollaborators.$inferInsert;