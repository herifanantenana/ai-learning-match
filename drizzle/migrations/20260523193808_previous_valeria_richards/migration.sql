CREATE TYPE "match_status" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TYPE "subscription_tier" AS ENUM('free', 'pro');--> statement-breakpoint
CREATE TABLE "communities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL,
	"description" text,
	"image_url" text,
	"owner_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "community_members_user_community_unique" UNIQUE("user_id","community_id")
);
--> statement-breakpoint
CREATE TABLE "conversation_summaries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"conversation_id" uuid NOT NULL,
	"summary" text NOT NULL,
	"action_items" jsonb DEFAULT '[]' NOT NULL,
	"key_points" jsonb DEFAULT '[]' NOT NULL,
	"next_steps" jsonb DEFAULT '[]' NOT NULL,
	"generated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"match_id" uuid NOT NULL,
	"last_message_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learning_goals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"tags" jsonb DEFAULT '[]' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user1_id" uuid NOT NULL,
	"user2_id" uuid NOT NULL,
	"community_id" uuid NOT NULL,
	"status" "match_status" DEFAULT 'pending'::"match_status" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "matches_user1_user2_community_unique" UNIQUE("user1_id","user2_id","community_id")
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"conversation_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"clerk_id" varchar(255) NOT NULL UNIQUE,
	"email" varchar(50) NOT NULL UNIQUE,
	"name" varchar(50) NOT NULL,
	"image_url" text,
	"subscription_tier" "subscription_tier" DEFAULT 'free'::"subscription_tier" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "communities_owner_id_idx" ON "communities" ("owner_id");--> statement-breakpoint
CREATE INDEX "community_members_user_id_idx" ON "community_members" ("user_id");--> statement-breakpoint
CREATE INDEX "community_members_community_id_idx" ON "community_members" ("community_id");--> statement-breakpoint
CREATE INDEX "conversation_summaries_conversation_id_idx" ON "conversation_summaries" ("conversation_id");--> statement-breakpoint
CREATE INDEX "conversations_match_id_idx" ON "conversations" ("match_id");--> statement-breakpoint
CREATE INDEX "learning_goals_user_id_idx" ON "learning_goals" ("user_id");--> statement-breakpoint
CREATE INDEX "learning_goals_community_id_idx" ON "learning_goals" ("community_id");--> statement-breakpoint
CREATE INDEX "matches_user1_id_idx" ON "matches" ("user1_id");--> statement-breakpoint
CREATE INDEX "matches_user2_id_idx" ON "matches" ("user2_id");--> statement-breakpoint
CREATE INDEX "matches_community_id_idx" ON "matches" ("community_id");--> statement-breakpoint
CREATE INDEX "messages_conversation_id_idx" ON "messages" ("conversation_id");--> statement-breakpoint
CREATE INDEX "messages_sender_id_idx" ON "messages" ("sender_id");--> statement-breakpoint
ALTER TABLE "communities" ADD CONSTRAINT "communities_owner_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "community_members" ADD CONSTRAINT "community_members_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "conversation_summaries" ADD CONSTRAINT "conversation_summaries_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id");--> statement-breakpoint
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_match_id_fk" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "learning_goals" ADD CONSTRAINT "learning_goals_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "learning_goals" ADD CONSTRAINT "learning_goals_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_user1_id_fk" FOREIGN KEY ("user1_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_user2_id_fk" FOREIGN KEY ("user2_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_community_id_fk" FOREIGN KEY ("community_id") REFERENCES "communities"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_fk" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;