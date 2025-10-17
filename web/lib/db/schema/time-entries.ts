import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { projects } from './project';
import { user } from './auth-schema';
import { tasks } from './task';
import { taskTypes } from './task-type';

export const timeEntries = sqliteTable('time_entries', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  taskId: text('task_id').references(() => tasks.id, { onDelete: 'set null' }),
  taskTypeId: text('task_type_id').references(() => taskTypes.id, { onDelete: 'set null' }),
  description: text('description'),
  startTime: integer('start_time', { mode: 'timestamp' }).notNull(),
  endTime: integer('end_time', { mode: 'timestamp' }),
  durationMinutes: integer('duration_minutes'),
  entryMode: text('entry_mode', {
    enum: ['live_tracking', 'manual_start', 'manual_full']
  }),
  isRunning: integer('is_running', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => ({
  projectIdx: index('time_entries_project_idx').on(table.projectId),
  userIdx: index('time_entries_user_idx').on(table.userId),
  taskIdx: index('time_entries_task_idx').on(table.taskId),
  taskTypeIdx: index('time_entries_task_type_idx').on(table.taskTypeId),
  timeRangeIdx: index('time_entries_time_range_idx').on(table.startTime, table.endTime),
  runningIdx: index('time_entries_running_idx').on(table.isRunning),
  userProjectIdx: index('time_entries_user_project_idx').on(table.userId, table.projectId),
}));

export type TimeEntry = typeof timeEntries.$inferSelect;
export type NewTimeEntry = typeof timeEntries.$inferInsert;