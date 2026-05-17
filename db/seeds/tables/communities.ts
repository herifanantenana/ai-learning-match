import { communitiesTable } from "@/db/schemas";
import { BaseSeeder } from "@/db/seeds/base";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
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
export class CommunitiesSeeder extends BaseSeeder<ICommunity> {
	constructor(private usersSeeder: UsersSeeder) {
		super("./data/communities.json");
	}

	async seed(tx: NodePgDatabase): Promise<void> {
		await this.loadData();
		console.log(`🥁 - Seeding ${this.dataJson?.length ?? 0} communities...`);
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

		console.log(`🗿 - Inserted ${insertedCommunities.length} communities.`);
	}
}
