import { defineRelationsPart } from "drizzle-orm";
import { foreignKey, index, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { createdAt, updatedAt } from "./_shared/timestamp";
import { communityMembersTable } from "./community-members-schema";
import { learningGoalsTable } from "./learning-goals-schema";
import { matchesTable } from "./matches-schema";
import { usersTable } from "./users-schema";

export const communityTable = pgTable(
	"communities",
	{
		id,
		name: varchar("name", { length: 50 }).notNull(),
		description: text("description"),
		imageUrl: text("image_url"),
		ownerId: text("author_id").notNull(),
		createdAt,
		updatedAt,
	},
	(table) => [
		foreignKey({
			columns: [table.ownerId],
			foreignColumns: [usersTable.id],
			name: "communities_author_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		index("communities_author_id_idx").on(table.ownerId),
	],
);

export const communityRelations = defineRelationsPart(
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
