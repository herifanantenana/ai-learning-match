import { foreignKey, index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt } from "./_shared/timestamp";
import { conversationsTable } from "./conversations";
import { usersTable } from "./users";

export const messagesTable = pgTable(
	"messages",
	{
		id: uuid("id").primaryKey().defaultRandom(),
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
