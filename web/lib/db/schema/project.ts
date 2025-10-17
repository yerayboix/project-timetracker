import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { user } from './auth-schema';

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  ownerId: text('owner_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  estimatedHours: real('estimated_hours'),
  hourlyRate: real('hourly_rate'),
  status: text('status', { 
    enum: ['not_started', 'in_progress', 'paused', 'completed', 'cancelled'] 
  }).notNull().default('not_started'),
  githubRepoUrl: text('github_repo_url'),
  isShared: integer('is_shared', { mode: 'boolean' }).notNull().default(false),
  shareToken: text('share_token').unique(),
  allowCollaboratorEdit: integer('allow_collaborator_edit', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => ({
  ownerIdx: index('projects_owner_idx').on(table.ownerId),
  statusIdx: index('projects_status_idx').on(table.status),
  shareTokenIdx: index('projects_share_token_idx').on(table.shareToken),
  sharedIdx: index('projects_shared_idx').on(table.isShared),
}));

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;