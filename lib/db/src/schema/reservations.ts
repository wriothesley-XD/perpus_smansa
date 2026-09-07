import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const reservationsTable = pgTable("library_reservations", {
  id: serial("id").primaryKey(),
  bookId: integer("book_id").notNull(),
  bookTitle: text("book_title").notNull(),
  name: text("name").notNull(),
  nis: text("nis").notNull(),
  className: text("class_name").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertReservationSchema = createInsertSchema(
  reservationsTable,
).omit({
  id: true,
  createdAt: true,
});
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservationsTable.$inferSelect;