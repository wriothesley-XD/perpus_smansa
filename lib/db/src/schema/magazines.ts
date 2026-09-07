import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const magazinesTable = pgTable("library_magazines", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  edition: text("edition").notNull(),
  year: integer("year").notNull(),
  coverUrl: text("cover_url").notNull(),
  description: text("description").notNull(),
  readUrl: text("read_url").notNull(),
});

export const insertMagazineSchema = createInsertSchema(magazinesTable).omit({
  id: true,
});
export type InsertMagazine = z.infer<typeof insertMagazineSchema>;
export type Magazine = typeof magazinesTable.$inferSelect;