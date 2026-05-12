import {
    foreignKey,
    index,
    pgTable,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { createdAt, updatedAt } from "./_shared/timestamp";
import { usersTable } from "./users";

export const communitiesTable = pgTable(
	"communities",
	{
		id,
		name: varchar("name", { length: 50 }).notNull(),
		description: text("description"),
		imageUrl: text("image_url"),
		ownerId: uuid("author_id").notNull(),
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
