import { db } from "../index";
import { usersTable } from "../schemas";
import { ESubscriptionTier } from "../schemas/_shared/type";
import { BaseSeeder } from "./base";

export interface IUser {
	key: string;
	clerkId: string;
	email: string;
	name: string;
	imageUrl: string;
	subscriptionTier: ESubscriptionTier;
	createdAt: Date;
	updatedAt: Date;
}

export class UsersSeeder extends BaseSeeder<IUser, typeof db> {
	constructor() {
		super("./data/users.json");
	}

	async clean(tx: typeof db): Promise<void> {
		console.info("🚬 - Cleaning users...");
		await tx.delete(usersTable);
		console.info("🔔 - Users cleaned.");
	}

	async seed(tx: typeof db): Promise<void> {
		await this.clean(tx);
		await this.loadData();
		console.info(`🥁 - Seeding ${this.dataJson?.length ?? 0} users...`);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No user data to seed");
			return;
		}

		const usersToInsert = this.dataJson.map((user) => {
			const copy: Omit<IUser, "key"> = { ...user };

			if (typeof copy.createdAt === "string")
				copy.createdAt = new Date(copy.createdAt);

			if (typeof copy.updatedAt === "string")
				copy.updatedAt = new Date(copy.updatedAt);

			return copy;
		});

		const insertedUsers = await tx
			.insert(usersTable)
			.values(usersToInsert)
			.returning({ id: usersTable.id });

		insertedUsers.forEach((insertedUser, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedUser.id);
		});

		console.info(`🗿 - Inserted ${insertedUsers.length} users.`);
	}
}
