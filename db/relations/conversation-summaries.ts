import { defineRelationsPart } from "drizzle-orm";
import { conversationSummariesTable } from "../schemas/conversation-summaries";
import { conversationsTable } from "../schemas/conversations";

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
