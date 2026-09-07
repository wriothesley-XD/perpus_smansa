import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const booksTable = pgTable("library_books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  category: text("category").notNull(),
  ddc: text("ddc").notNull(),
  isbn: text("isbn").notNull(),
  publisher: text("publisher").notNull(),
  year: integer("year").notNull(),
  language: text("language").notNull(),
  synopsis: text("synopsis").notNull(),
  shelf: text("shelf").notNull(),
  copies: integer("copies").notNull(),
  availableCopies: integer("available_copies").notNull(),
  coverUrl: text("cover_url").notNull(),
  popularity: integer("popularity").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertBookSchema = createInsertSchema(booksTable).omit({
  id: true,
  createdAt: true,
});
export type InsertBook = z.infer<typeof insertBookSchema>;
export type Book = typeof booksTable.$inferSelect;