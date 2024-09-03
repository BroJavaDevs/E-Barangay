import { mysqlTable, mysqlSchema, AnyMySqlColumn, int, varchar, text, datetime } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const announcement = mysqlTable("tbl_announcements", {
	id: int("id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	body: text("body").notNull(),
	// Warning: Can't parse blob from database
	// blobType: blob("image").notNull(),
	postedAt: datetime("postedAt", { mode: 'string'}).default('current_timestamp()').notNull(),
});