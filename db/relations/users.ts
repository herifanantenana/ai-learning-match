import { defineRelationsPart } from "drizzle-orm";
import { communitiesTable } from "../schemas/communities";
import { communityMembersTable } from "../schemas/community-members";
import { learningGoalsTable } from "../schemas/learning-goals";
import { matchesTable } from "../schemas/matches";
import { messagesTable } from "../schemas/messages";
import { usersTable } from "../schemas/users";

export const usersRelation = defineRelationsPart(
	{
		usersTable,
		communitiesTable,
		communityMembersTable,
		learningGoalsTable,
		matchesTable,
		messagesTable,
	},
	(r) => ({
		usersTable: {
			communities: r.many.communitiesTable({
				from: r.usersTable.id,
				to: r.communitiesTable.ownerId,
			}),

			communityMembers: r.many.communitiesTable({
				from: r.usersTable.id.through(r.communityMembersTable.userId),
				to: r.communitiesTable.id.through(r.communityMembersTable.communityId),
			}),

			learningGoals: r.many.learningGoalsTable({
				from: r.usersTable.id,
				to: r.learningGoalsTable.userId,
			}),

			matchesAsUser1: r.many.matchesTable({
				from: r.usersTable.id,
				to: r.matchesTable.user1Id,
			}),

			matchesAsUser2: r.many.matchesTable({
				from: r.usersTable.id,
				to: r.matchesTable.user2Id,
			}),

			messages: r.many.messagesTable({
				from: r.usersTable.id,
				to: r.messagesTable.senderId,
			}),
		},
	}),
);
