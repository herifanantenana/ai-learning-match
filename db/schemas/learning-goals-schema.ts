import {
    foreignKey,
    index,
    jsonb,
    pgTable,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { defineRelationsPart } from "drizzle-orm/relations";
import { id } from "./_shared/id";
import { createdAt, updatedAt } from "./_shared/timestamp";
import { communityTable } from "./communities-schema";
import { usersTable } from "./users-schema";

export const learningGoalsTable = pgTable(
	"learning_goals",
	{
		id,
		userId: uuid("user_id").notNull(),
		communityId: uuid("community_id").notNull(),
		title: varchar("title", { length: 255 }).notNull(),
		description: text("description"),
		tags: jsonb("tags").$type<string[]>().default([]).notNull(),
		createdAt,
		updatedAt,
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [usersTable.id],
			name: "learning_goals_user_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		foreignKey({
			columns: [table.communityId],
			foreignColumns: [communityTable.id],
			name: "learning_goals_community_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),
		index("learning_goals_user_id_idx").on(table.userId),
		index("learning_goals_community_id_idx").on(table.communityId),
	],
);

export const learningGoalsRelations = defineRelationsPart(
	{ learningGoalsTable, usersTable, communityTable },
	(r) => ({
		learningGoalsTable: {
			user: r.one.usersTable({
				from: r.learningGoalsTable.userId,
				to: r.usersTable.id,
			}),
			community: r.one.communityTable({
				from: r.learningGoalsTable.communityId,
				to: r.communityTable.id,
			}),
		},
	}),
);
