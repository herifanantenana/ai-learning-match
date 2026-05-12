import { defineRelationsPart } from "drizzle-orm";
import { foreignKey, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { createdAt } from "./_shared/timestamp";
import { conversationsTable } from "./conversations-schema";
import { usersTable } from "./users-schema";

export const messagesTable = pgTable(
	"messages",
	{
		id,
		conversationId: uuid("conversation_id").notNull(),
		senderId: uuid("sender_id").notNull(),
		content: text("content").notNull(),
		createdAt,
	},
	(table) => [
		foreignKey({
			columns: [table.conversationId],
			foreignColumns: [conversationsTable.id],
			name: "messages_conversation_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		foreignKey({
			columns: [table.senderId],
			foreignColumns: [usersTable.id],
			name: "messages_sender_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		index("messages_conversation_id_idx").on(table.conversationId),
		index("messages_sender_id_idx").on(table.senderId),
	],
);

export const messagesRelation = defineRelationsPart(
	{
		messagesTable,
		conversationsTable,
		usersTable,
	},
	(r) => ({
		messagesTable: {
			conversation: r.one.conversationsTable({
				from: r.messagesTable.conversationId,
				to: r.conversationsTable.id,
			}),
			sender: r.one.usersTable({
				from: r.messagesTable.senderId,
				to: r.usersTable.id,
			}),
		},
	}),
);
