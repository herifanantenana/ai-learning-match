import { db } from "@/db";
import { CommunitiesSeeder } from "./tables/communities";
import { CommunityMembersSeeder } from "./tables/community-members";
import { ConversationSummariesSeeder } from "./tables/conversation-summaries";
import { ConversationsSeeder } from "./tables/conversations";
import { LearningGoalsSeeder } from "./tables/learning-goals";
import { MatchesSeeder } from "./tables/matches";
import { MessagesSeeder } from "./tables/messages";
import { UsersSeeder } from "./tables/users";

async function main() {
	await db.transaction(async (tx) => {
		const users = new UsersSeeder();
		await users.seed(tx);

		const communities = new CommunitiesSeeder(users);
		await communities.seed(tx);

		const communityMembers = new CommunityMembersSeeder(users, communities);
		await communityMembers.seed(tx);

		const learningGoals = new LearningGoalsSeeder(users, communities);
		await learningGoals.seed(tx);

		const matches = new MatchesSeeder(users, communities);
		await matches.seed(tx);

		const conversations = new ConversationsSeeder(matches);
		await conversations.seed(tx);

		const conversationSummaries = new ConversationSummariesSeeder(
			conversations,
		);
		await conversationSummaries.seed(tx);

		const messages = new MessagesSeeder(conversations, users);
		await messages.seed(tx);
	});
}

main()
	.then(() => {
		console.log("🎉 - Seeding completed successfully.");
		process.exit(0);
	})
	.catch((error) => {
		console.error("🩸 - Error during seeding:", error);
		process.exit(1);
	});
