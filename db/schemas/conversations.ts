import { foreignKey, index, pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, lastMessageAt } from "./_shared/timestamp";
import { matchesTable } from "./matches";

export const conversationsTable = pgTable(
	"conversations",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		matchId: uuid("match_id").notNull(),
		lastMessageAt,
		createdAt,
	},
	(table) => [
		foreignKey({
			columns: [table.matchId],
			foreignColumns: [matchesTable.id],
			name: "conversations_match_id_fk",
		})
			.onUpdate("cascade")
			.onDelete("cascade"),

		index("conversations_match_id_idx").on(table.matchId),
	],
);
