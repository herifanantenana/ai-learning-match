import { db } from "@/db";
import { CommunitiesSeeder } from "./tables/communities";
import { CommunityMembersSeeder } from "./tables/community-members";
import { LearningGoalsSeeder } from "./tables/learning-goals";
import { UsersSeeder } from "./tables/users";

async function main() {
	const users = new UsersSeeder();
	await users.seed(db);
	const communities = new CommunitiesSeeder(users);
	await communities.seed(db);
	const communityMembers = new CommunityMembersSeeder(users, communities);
	await communityMembers.seed(db);
	const learningGoals = new LearningGoalsSeeder(users, communities);
	await learningGoals.seed(db);
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
