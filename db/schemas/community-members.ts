import { foreignKey, index, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { joinedAt } from "./_shared/timestamp";
import { communitiesTable } from "./communities";
import { usersTable } from "./users";

export const communityMembersTable = pgTable(
	"community_members",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id").notNull(),
		communityId: uuid("community_id").notNull(),
		joinedAt,
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [usersTable.id],
			name: "community_members_user_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		foreignKey({
			columns: [table.communityId],
			foreignColumns: [communitiesTable.id],
			name: "community_members_community_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		unique("community_members_user_community_unique").on(
			table.userId,
			table.communityId,
		),

		index("community_members_user_id_idx").on(table.userId),

		index("community_members_community_id_idx").on(table.communityId),
	],
);
