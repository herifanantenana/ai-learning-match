import { matchesTable } from "@/db/schemas";
import { EMatchStatus } from "@/db/schemas/_shared/type";
import { BaseSeeder } from "@/db/seeds/base";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CommunitiesSeeder } from "./communities";
import { UsersSeeder } from "./users";

interface IMatches {
	key: string;
	user1Id: string;
	user2Id: string;
	communityId: string;
	status: EMatchStatus;
	createdAt: Date;
}

export class MatchesSeeder extends BaseSeeder<IMatches> {
	constructor(
		private usersSeeder: UsersSeeder,
		private communitiesSeeder: CommunitiesSeeder,
	) {
		super("./data/matches.json");
	}

	async seed(tx: NodePgDatabase): Promise<void> {
		await this.loadData();
		console.log(`🥁 - Seeding ${this.dataJson?.length ?? 0} matches...`);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No match data to seed");
			return;
		}

		const matchesToInsert = this.dataJson.map((match) => {
			const copy: Omit<IMatches, "key"> = { ...match };

			if (typeof copy.createdAt === "string")
				copy.createdAt = new Date(copy.createdAt);

			const user1Id = this.usersSeeder.getIdKey(match.user1Id);
			if (!user1Id) {
				throw new Error(`User 1 ID not found for key: ${match.user1Id}`);
			}

			const user2Id = this.usersSeeder.getIdKey(match.user2Id);
			if (!user2Id) {
				throw new Error(`User 2 ID not found for key: ${match.user2Id}`);
			}

			const communityId = this.communitiesSeeder.getIdKey(match.communityId);
			if (!communityId) {
				throw new Error(`Community ID not found for key: ${match.communityId}`);
			}

			if (user1Id === user2Id) {
				throw new Error(
					`User 1 ID and User 2 ID cannot be the same for key: ${match.key}`,
				);
			}
			copy.user1Id = user1Id;
			copy.user2Id = user2Id;
			copy.communityId = communityId;
			return copy;
		});

		const insertedMatches = await tx
			.insert(matchesTable)
			.values(matchesToInsert)
			.returning({ id: matchesTable.id });

		insertedMatches.forEach((insertedMatch, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedMatch.id);
		});

		console.log(`🗿 - Inserted ${insertedMatches.length} matches.`);
	}
}
