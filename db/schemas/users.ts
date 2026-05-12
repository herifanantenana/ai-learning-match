import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { id } from "./_shared/id";
import { createdAt, updatedAt } from "./_shared/timestamp";
import { ESubscriptionTier, SubscriptionTier } from "./_shared/type";

export const subscriptionTierEnum = pgEnum(
	"subscription_tier",
	SubscriptionTier,
);

export const usersTable = pgTable("users", {
	id,
	clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
	email: varchar("email", { length: 50 }).notNull().unique(),
	name: varchar("name", { length: 50 }).notNull(),
	imageUrl: text("image_url"),
	subscriptionTier: subscriptionTierEnum("subscription_tier")
		.default(ESubscriptionTier.FREE)
		.notNull(),
	createdAt,
	updatedAt,
});
