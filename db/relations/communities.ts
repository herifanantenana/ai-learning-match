import { defineRelationsPart } from "drizzle-orm";
import { communitiesTable } from "../schemas/communities";
import { communityMembersTable } from "../schemas/community-members";
import { learningGoalsTable } from "../schemas/learning-goals";
import { matchesTable } from "../schemas/matches";
import { usersTable } from "../schemas/users";

export const communityRelation = defineRelationsPart(
	{
		communitiesTable,
		usersTable,
		communityMembersTable,
		learningGoalsTable,
		matchesTable,
	},
	(r) => ({
		communitiesTable: {
			owner: r.one.usersTable({
				from: r.communitiesTable.ownerId,
				to: r.usersTable.id,
			}),

			communityMembers: r.many.usersTable({
				from: r.communitiesTable.id.through(
					r.communityMembersTable.communityId,
				),
				to: r.usersTable.id.through(r.communityMembersTable.userId),
			}),

			learningGoals: r.many.learningGoalsTable({
				from: r.communitiesTable.id,
				to: r.learningGoalsTable.communityId,
			}),

			matches: r.many.matchesTable({
				from: r.communitiesTable.id,
				to: r.matchesTable.communityId,
			}),
		},
	}),
);
