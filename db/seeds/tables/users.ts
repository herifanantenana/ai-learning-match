import { usersTable } from "@/db/schemas";
import { ESubscriptionTier } from "@/db/schemas/_shared/type";
import type { TxOrDb } from "@/db/seeds/base";
import { BaseSeeder } from "@/db/seeds/base";

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

export class UsersSeeder extends BaseSeeder<IUser> {
	constructor() {
		super("./data/users.json");
	}

	async seed(tx: TxOrDb): Promise<void> {
		await this.loadData();
		console.log(`🥁 - Seeding ${this.dataJson?.length ?? 0} users...`);
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

		console.log(`🗿 - Inserted ${insertedUsers.length} users.`);
	}
}
