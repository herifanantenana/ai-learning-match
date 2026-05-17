import { db } from "../index";
import { CommunitiesSeeder } from "./tables/communities";
import { UsersSeeder } from "./tables/users";

async function main() {
	const users = new UsersSeeder();
	await users.seed(db);
	const communities = new CommunitiesSeeder(users);
	await communities.seed(db);
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
