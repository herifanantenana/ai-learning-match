import { defineRelationsPart } from "drizzle-orm";
import { communityTable } from "../schemas/communities-schema";
import { communityMembersTable } from "../schemas/community-members";
import { learningGoalsTable } from "../schemas/learning-goals";
import { matchesTable } from "../schemas/matches";
import { usersTable } from "../schemas/users";

export const communityRelation = defineRelationsPart(
	{
		communityTable,
		usersTable,
		communityMembersTable,
		learningGoalsTable,
		matchesTable,
	},
	(r) => ({
		communityTable: {
			owner: r.one.usersTable({
				from: r.communityTable.ownerId,
				to: r.usersTable.id,
			}),

			communityMembers: r.many.usersTable({
				from: r.communityTable.id.through(r.communityMembersTable.communityId),
				to: r.usersTable.id.through(r.communityMembersTable.userId),
			}),

			learningGoals: r.many.learningGoalsTable({
				from: r.communityTable.id,
				to: r.learningGoalsTable.communityId,
			}),

			matches: r.many.matchesTable({
				from: r.communityTable.id,
				to: r.matchesTable.communityId,
			}),
		},
	}),
);
