import {
    foreignKey,
    index,
    jsonb,
    pgTable,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "./_shared/timestamp";
import { usersTable } from "./users";
import { communitiesTable } from "./communities";

export const learningGoalsTable = pgTable(
	"learning_goals",
	{
		id: uuid("id").primaryKey().defaultRandom(),
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
			foreignColumns: [communitiesTable.id],
			name: "learning_goals_community_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		index("learning_goals_user_id_idx").on(table.userId),

		index("learning_goals_community_id_idx").on(table.communityId),
	],
);
