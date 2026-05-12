import { defineRelationsPart } from "drizzle-orm";
import { conversationsTable } from "../schemas/conversations";
import { messagesTable } from "../schemas/messages";
import { usersTable } from "../schemas/users";

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
