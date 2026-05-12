import { defineRelationsPart } from "drizzle-orm";
import { conversationSummariesTable } from "../schemas/conversation-summaries";
import { conversationsTable } from "../schemas/conversations";
import { matchesTable } from "../schemas/matches";
import { messagesTable } from "../schemas/messages";

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

			summaries: r.many.conversationSummariesTable({
				from: r.conversationsTable.id,
				to: r.conversationSummariesTable.conversationId,
			}),
		},
	}),
);
