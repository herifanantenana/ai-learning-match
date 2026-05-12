import { timestamp } from "drizzle-orm/pg-core";

export const createdAt = timestamp("created_at").defaultNow().notNull();

export const updatedAt = timestamp("updated_at").defaultNow().notNull();

export const joinedAt = timestamp("joined_at").defaultNow().notNull();

export const lastMessageAt = timestamp("last_message_at");

export const generatedAt = timestamp("generated_at").defaultNow().notNull();
