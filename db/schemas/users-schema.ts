import { defineRelationsPart } from "drizzle-orm";
import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { createdAt, updatedAt } from "./_shared/timestamp";
import { ESubscriptionTier, SubscriptionTier } from "./_shared/types";
import { communityTable } from "./communities-schema";
import { communityMembersTable } from "./community-members-schema";
import { learningGoalsTable } from "./learning-goals-schema";
import { matchesTable } from "./matches-schema";
import { messagesTable } from "./messages-schema";

export const subscriptionTierEnum = pgEnum(
	"subscription_tier",
	SubscriptionTier,
);

export const usersTable = pgTable("users", {
	id,
	clerkId: text("clerk_id").notNull().unique(),
	email: varchar("email", { length: 50 }).notNull().unique(),
	name: varchar("name", { length: 50 }).notNull(),
	imageUrl: text("image_url"),
	subscriptionTier: subscriptionTierEnum("subscription_tier")
		.default(ESubscriptionTier.FREE)
		.notNull(),
	createdAt,
	updatedAt,
});

export const usersRelation = defineRelationsPart(
	{
		usersTable,
		communityTable,
		communityMembersTable,
		learningGoalsTable,
		matchesTable,
		messagesTable,
	},
	(r) => ({
		usersTable: {
			communities: r.many.communityTable({
				from: r.usersTable.id,
				to: r.communityTable.ownerId,
			}),
			communityMembers: r.many.communityTable({
				from: r.usersTable.id.through(r.communityMembersTable.userId),
				to: r.communityTable.id.through(r.communityMembersTable.communityId),
			}),
			learningGoals: r.many.learningGoalsTable({
				from: r.usersTable.id,
				to: r.learningGoalsTable.userId,
			}),
			matchesAsUser1: r.many.matchesTable({
				from: r.usersTable.id,
				to: r.matchesTable.user1Id,
			}),
			matchesAsUser2: r.many.matchesTable({
				from: r.usersTable.id,
				to: r.matchesTable.user2Id,
			}),
			messages: r.many.messagesTable({
				from: r.usersTable.id,
				to: r.messagesTable.senderId,
			}),
		},
	}),
);
