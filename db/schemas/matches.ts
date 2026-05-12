import {
    foreignKey,
    index,
    pgEnum,
    pgTable,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import { createdAt } from "./_shared/timestamp";
import { EMatchStatus, MatchStatus } from "./_shared/type";
import { communitiesTable } from "./communities";
import { usersTable } from "./users";

export const matchStatusEnum = pgEnum("match_status", MatchStatus);

export const matchesTable = pgTable(
	"matches",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		user1Id: uuid("user1_id").notNull(),
		user2Id: uuid("user2_id").notNull(),
		communityId: uuid("community_id").notNull(),
		status: matchStatusEnum("status").default(EMatchStatus.PENDING).notNull(),
		createdAt,
	},
	(table) => [
		foreignKey({
			columns: [table.user1Id],
			foreignColumns: [usersTable.id],
			name: "matches_user1_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		foreignKey({
			columns: [table.user2Id],
			foreignColumns: [usersTable.id],
			name: "matches_user2_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		foreignKey({
			columns: [table.communityId],
			foreignColumns: [communitiesTable.id],
			name: "matches_community_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		unique("matches_user1_user2_community_unique").on(
			table.user1Id,
			table.user2Id,
			table.communityId,
		),

		index("matches_user1_id_idx").on(table.user1Id),

		index("matches_user2_id_idx").on(table.user2Id),

		index("matches_community_id_idx").on(table.communityId),
	],
);
