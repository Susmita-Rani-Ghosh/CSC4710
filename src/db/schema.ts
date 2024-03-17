import { relations, sql } from "drizzle-orm";
import {
  bigint,
  char,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const category = pgTable("category", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull().unique(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey().unique().notNull(),
  description: text("description").notNull(),
  dueDate: timestamp("due_date", { withTimezone: true }).notNull(),
  categoryId: integer("category_id").references(() => category.id),
  // from 1-4
  priorityLevel: char("priority_level", { enum: ["1", "2", "3", "4"] }),
  status: text("status", { enum: ["completed", "active"] })
    .default("active")
    .notNull(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  category: one(category, {
    fields: [tasks.categoryId],
    references: [category.id],
  }),
}));
