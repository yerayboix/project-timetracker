import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { projects } from './project';

export const githubEvents = sqliteTable('github_events', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(), // commit, pull_request, issue, etc.
  eventData: text('event_data', { mode: 'json' }).notNull(), // JSON almacenado como texto
  occurredAt: integer('occurred_at', { mode: 'timestamp' }).notNull(),
  syncedAt: integer('synced_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
});

export type GithubEvent = typeof githubEvents.$inferSelect;
export type NewGithubEvent = typeof githubEvents.$inferInsert;