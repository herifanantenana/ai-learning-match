import { foreignKey, index, pgTable, unique, uuid } from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { joinedAt } from "./_shared/timestamp";
import { communityTable } from "./communities-schema";
import { usersTable } from "./users-schema";

export const communityMembersTable = pgTable(
	"community_members",
	{
		id,
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
			foreignColumns: [communityTable.id],
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
