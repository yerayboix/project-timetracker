CREATE TABLE `github_events` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`event_type` text NOT NULL,
	`event_data` text NOT NULL,
	`occurred_at` integer NOT NULL,
	`synced_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `project_collaborators` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`can_edit` integer DEFAULT true NOT NULL,
	`joined_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `collaborators_project_idx` ON `project_collaborators` (`project_id`);--> statement-breakpoint
CREATE INDEX `collaborators_user_idx` ON `project_collaborators` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `collaborators_unique_idx` ON `project_collaborators` (`project_id`,`user_id`);--> statement-breakpoint
CREATE TABLE `projects` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`estimated_hours` real,
	`hourly_rate` real,
	`status` text DEFAULT 'not_started' NOT NULL,
	`github_repo_url` text,
	`is_shared` integer DEFAULT false NOT NULL,
	`share_token` text,
	`allow_collaborator_edit` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`owner_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_share_token_unique` ON `projects` (`share_token`);--> statement-breakpoint
CREATE INDEX `projects_owner_idx` ON `projects` (`owner_id`);--> statement-breakpoint
CREATE INDEX `projects_status_idx` ON `projects` (`status`);--> statement-breakpoint
CREATE INDEX `projects_share_token_idx` ON `projects` (`share_token`);--> statement-breakpoint
CREATE INDEX `projects_shared_idx` ON `projects` (`is_shared`);--> statement-breakpoint
CREATE TABLE `task_types` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`name` text NOT NULL,
	`estimated_hours` real,
	`color` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `task_types_project_idx` ON `task_types` (`project_id`);--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`task_type_id` text,
	`name` text NOT NULL,
	`description` text,
	`estimated_hours` real,
	`start_date` integer,
	`end_date` integer,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`task_type_id`) REFERENCES `task_types`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `tasks_project_idx` ON `tasks` (`project_id`);--> statement-breakpoint
CREATE INDEX `tasks_task_type_idx` ON `tasks` (`task_type_id`);--> statement-breakpoint
CREATE INDEX `tasks_dates_idx` ON `tasks` (`start_date`,`end_date`);--> statement-breakpoint
CREATE INDEX `tasks_status_idx` ON `tasks` (`status`);--> statement-breakpoint
CREATE TABLE `time_entries` (
	`id` text PRIMARY KEY NOT NULL,
	`project_id` text NOT NULL,
	`user_id` text NOT NULL,
	`task_id` text,
	`task_type_id` text,
	`description` text,
	`start_time` integer NOT NULL,
	`end_time` integer,
	`duration_minutes` integer,
	`entry_mode` text,
	`is_running` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`task_type_id`) REFERENCES `task_types`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `time_entries_project_idx` ON `time_entries` (`project_id`);--> statement-breakpoint
CREATE INDEX `time_entries_user_idx` ON `time_entries` (`user_id`);--> statement-breakpoint
CREATE INDEX `time_entries_task_idx` ON `time_entries` (`task_id`);--> statement-breakpoint
CREATE INDEX `time_entries_task_type_idx` ON `time_entries` (`task_type_id`);--> statement-breakpoint
CREATE INDEX `time_entries_time_range_idx` ON `time_entries` (`start_time`,`end_time`);--> statement-breakpoint
CREATE INDEX `time_entries_running_idx` ON `time_entries` (`is_running`);--> statement-breakpoint
CREATE INDEX `time_entries_user_project_idx` ON `time_entries` (`user_id`,`project_id`);