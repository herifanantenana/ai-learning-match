import { db } from "..";
import { communitiesTable } from "../schemas";
import { BaseSeeder } from "./base";
import { UsersSeeder } from "./users";

export interface ICommunity {
	key: string;
	name: string;
	description: string;
	imageUrl: string;
	ownerId: string;
	createdAt: Date;
	updatedAt: Date;
}
export class CommunitiesSeeder extends BaseSeeder<ICommunity, typeof db> {
	constructor(private usersSeeder: UsersSeeder) {
		super("./data/communities.json");
	}

	async clean(tx: typeof db): Promise<void> {
		console.info("🚬 - Cleaning communities...");
		await tx.delete(communitiesTable);
		console.info("🔔 - Communities cleaned.");
	}

	async seed(tx: typeof db): Promise<void> {
		await this.clean(tx);
		await this.loadData();
		console.info(`🥁 - Seeding ${this.dataJson?.length ?? 0} communities...`);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No community data to seed");
			return;
		}

		const communitiesToInsert = this.dataJson.map((community) => {
			const copy: Omit<ICommunity, "key"> = { ...community };

			if (typeof copy.createdAt === "string")
				copy.createdAt = new Date(copy.createdAt);

			if (typeof copy.updatedAt === "string")
				copy.updatedAt = new Date(copy.updatedAt);

			const ownerId = this.usersSeeder.getIdKey(community.ownerId);
			if (!ownerId) {
				throw new Error(`Owner ID not found for key: ${community.ownerId}`);
			}
			copy.ownerId = ownerId;
			return copy;
		});

		const insertedCommunities = await tx
			.insert(communitiesTable)
			.values(communitiesToInsert)
			.returning({ id: communitiesTable.id });

		insertedCommunities.forEach((insertedCommunity, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedCommunity.id);
		});

		console.info(`🗿 - Inserted ${insertedCommunities.length} communities.`);
	}
}
