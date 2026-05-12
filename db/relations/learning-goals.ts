import { defineRelationsPart } from "drizzle-orm";
import { communitiesTable } from "../schemas/communities";
import { learningGoalsTable } from "../schemas/learning-goals";
import { usersTable } from "../schemas/users";

export const learningGoalsRelation = defineRelationsPart(
	{ learningGoalsTable, usersTable, communitiesTable },
	(r) => ({
		learningGoalsTable: {
			user: r.one.usersTable({
				from: r.learningGoalsTable.userId,
				to: r.usersTable.id,
			}),

			community: r.one.communitiesTable({
				from: r.learningGoalsTable.communityId,
				to: r.communitiesTable.id,
			}),
		},
	}),
);
