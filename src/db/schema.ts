import { relations, sql } from "drizzle-orm";
import {
  bigint,
  char,
  date,
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
  dueDate: date("due_date", { mode: "date" }).notNull(),
  category: integer("category").references(() => category.id, {
    onDelete: "cascade",
  }),
  // from 1-4
  priorityLevel: char("priority_level", { enum: ["1", "2", "3", "4"] }),
  status: text("status", { enum: ["completed", "active"] })
    .default("active")
    .notNull(),
});

export const taskRelations = relations(tasks, ({ one }) => ({
  category: one(category, {
    fields: [tasks.category],
    references: [category.id],
  }),
}));
