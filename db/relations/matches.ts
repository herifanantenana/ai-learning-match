import { defineRelationsPart } from "drizzle-orm";
import { communitiesTable } from "../schemas/communities";
import { conversationsTable } from "../schemas/conversations";
import { matchesTable } from "../schemas/matches";
import { usersTable } from "../schemas/users";

export const matchesRelation = defineRelationsPart(
	{ matchesTable, usersTable, communitiesTable, conversationsTable },
	(r) => ({
		matchesTable: {
			users1: r.one.usersTable({
				from: r.matchesTable.user1Id,
				to: r.usersTable.id,
			}),

			users2: r.one.usersTable({
				from: r.matchesTable.user2Id,
				to: r.usersTable.id,
			}),

			community: r.one.communitiesTable({
				from: r.matchesTable.communityId,
				to: r.communitiesTable.id,
			}),

			conversations: r.many.conversationsTable({
				from: r.matchesTable.id,
				to: r.conversationsTable.id,
			}),
		},
	}),
);
