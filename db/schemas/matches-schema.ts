import {
    foreignKey,
    index,
    pgEnum,
    pgTable,
    unique,
    uuid,
} from "drizzle-orm/pg-core";
import { defineRelationsPart } from "drizzle-orm/relations";
import { id } from "./_shared/id";
import { createdAt } from "./_shared/timestamp";
import { EMatchStatus, MatchStatus } from "./_shared/types";
import { communityTable } from "./communities-schema";
import { conversationsTable } from "./conversations-schema";
import { usersTable } from "./users-schema";

export const matchStatusEnum = pgEnum("match_status", MatchStatus);

export const matchesTable = pgTable(
	"matches",
	{
		id,
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
			foreignColumns: [communityTable.id],
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

export const matchesRelations = defineRelationsPart(
	{ matchesTable, usersTable, communityTable, conversationsTable },
	(r) => ({
		matchesTable: {
			users1: r.one.usersTable({
				from: r.matchesTable.user1Id,
				to: r.usersTable.id,
			}),
			users2: r.one.usersTable({
				from: r.matchesTable.user2Id,
				to: r.usersTable.id,
			}),
			community: r.one.communityTable({
				from: r.matchesTable.communityId,
				to: r.communityTable.id,
			}),
			conversations: r.many.conversationsTable({
				from: r.matchesTable.id,
				to: r.conversationsTable.id,
			}),
		},
	}),
);
