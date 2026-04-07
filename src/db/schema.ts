import { mysqlTable, serial, varchar, text, timestamp, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const links = mysqlTable('links', {
  id: serial('id').primaryKey(),
  userId: int('user_id').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  url: text('url').notNull(),
  shortCode: varchar('short_code', { length: 10 }).notNull().unique(),
  clicks: int('clicks').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const clickLogs = mysqlTable('click_logs', {
  id: serial('id').primaryKey(),
  linkId: int('link_id').notNull(),
  userAgent: text('user_agent'),
  ip: varchar('ip', { length: 45 }),
  createdAt: timestamp('created_at').defaultNow(),
});
