import { db } from "..";
import { CommunitiesSeeder } from "./communities";
import { UsersSeeder } from "./users";

async function main() {
	const users = new UsersSeeder();
	await users.seed(db);
	const communities = new CommunitiesSeeder(users);
	await communities.seed(db);
	return 0;
}

main();
