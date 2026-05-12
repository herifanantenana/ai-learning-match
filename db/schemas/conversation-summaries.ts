import {
    foreignKey,
    index,
    jsonb,
    pgTable,
    text,
    uuid,
} from "drizzle-orm/pg-core";
import { generatedAt } from "./_shared/timestamp";
import { conversationsTable } from "./conversations";

export const conversationSummariesTable = pgTable(
	"conversation_summaries",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		conversationId: uuid("conversation_id").notNull(),
		summary: text("summary").notNull(),
		actionItems: jsonb("action_items").$type<string[]>().default([]).notNull(),
		keyPoints: jsonb("key_points").$type<string[]>().default([]).notNull(),
		nextSteps: jsonb("next_steps").$type<string[]>().default([]).notNull(),
		generatedAt,
	},
	(table) => [
		foreignKey({
			columns: [table.conversationId],
			foreignColumns: [conversationsTable.id],
			name: "conversation_summaries_conversation_id_fk",
		}),

		index("conversation_summaries_conversation_id_idx").on(
			table.conversationId,
		),
	],
);
