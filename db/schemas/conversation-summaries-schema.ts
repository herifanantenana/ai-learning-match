import {
    foreignKey,
    index,
    jsonb,
    pgTable,
    text,
    uuid,
} from "drizzle-orm/pg-core";
import { defineRelationsPart } from "drizzle-orm/relations";
import { id } from "./_shared/id";
import { generatedAt } from "./_shared/timestamp";
import { conversationsTable } from "./conversations-schema";

export const conversationSummariesTable = pgTable(
	"conversation_summaries",
	{
		id,
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

export const conversationSummariesRelation = defineRelationsPart(
	{
		conversationSummariesTable,
		conversationsTable,
	},
	(r) => ({
		conversationSummariesTable: {
			conversation: r.one.conversationsTable({
				from: r.conversationSummariesTable.conversationId,
				to: r.conversationsTable.id,
			}),
		},
	}),
);
