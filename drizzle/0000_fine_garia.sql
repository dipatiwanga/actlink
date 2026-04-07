CREATE TABLE `click_logs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`link_id` int NOT NULL,
	`user_agent` text,
	`ip` varchar(45),
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `click_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `links` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`url` text NOT NULL,
	`short_code` varchar(10) NOT NULL,
	`clicks` int DEFAULT 0,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `links_id` PRIMARY KEY(`id`),
	CONSTRAINT `links_short_code_unique` UNIQUE(`short_code`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`bio` text,
	`avatar_url` text,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
