import { defineRelationsPart } from "drizzle-orm";
import { foreignKey, index, pgTable, uuid } from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { createdAt, lastMessageAt } from "./_shared/timestamp";
import { conversationSummariesTable } from "./conversation-summaries-schema";
import { matchesTable } from "./matches-schema";
import { messagesTable } from "./messages-schema";

export const conversationsTable = pgTable(
	"conversations",
	{
		id,
		matchId: uuid("match_id").notNull(),
		lastMessageAt,
		createdAt,
	},
	(table) => [
		foreignKey({
			columns: [table.matchId],
			foreignColumns: [matchesTable.id],
			name: "conversations_match_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		index("conversations_match_id_idx").on(table.matchId),
	],
);

export const conversationsRelation = defineRelationsPart(
	{
		conversationsTable,
		matchesTable,
		messagesTable,
		conversationSummariesTable,
	},
	(r) => ({
		conversationsTable: {
			match: r.one.matchesTable({
				from: r.conversationsTable.matchId,
				to: r.matchesTable.id,
			}),
			messages: r.many.messagesTable({
				from: r.conversationsTable.id,
				to: r.messagesTable.conversationId,
			}),
			summary: r.many.conversationSummariesTable({
				from: r.conversationsTable.id,
				to: r.conversationSummariesTable.conversationId,
			}),
		},
	}),
);
