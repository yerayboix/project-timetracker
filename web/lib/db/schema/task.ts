import { sqliteTable, text, integer, real, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { projects } from './project';
import { taskTypes } from './task-type';

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  projectId: text('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  taskTypeId: text('task_type_id').references(() => taskTypes.id, { onDelete: 'set null' }),
  name: text('name').notNull(),
  description: text('description'),
  estimatedHours: real('estimated_hours'),
  startDate: integer('start_date', { mode: 'timestamp' }),
  endDate: integer('end_date', { mode: 'timestamp' }),
  status: text('status', {
    enum: ['pending', 'in_progress', 'completed', 'cancelled']
  }).notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
}, (table) => ({
  projectIdx: index('tasks_project_idx').on(table.projectId),
  taskTypeIdx: index('tasks_task_type_idx').on(table.taskTypeId),
  datesIdx: index('tasks_dates_idx').on(table.startDate, table.endDate),
  statusIdx: index('tasks_status_idx').on(table.status),
}));

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;