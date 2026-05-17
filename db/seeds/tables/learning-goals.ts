import { learningGoalsTable } from "@/db/schemas";
import { BaseSeeder } from "@/db/seeds/base";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CommunitiesSeeder } from "./communities";
import { UsersSeeder } from "./users";

interface ILearningGoal {
	key: string;
	userId: string;
	communityId: string;
	title: string;
	description: string;
	tags: Array<string>;
	createdAt: Date;
	updatedAt: Date;
}

export class LearningGoalsSeeder extends BaseSeeder<ILearningGoal> {
	constructor(
		private usersSeeder: UsersSeeder,
		private communitiesSeeder: CommunitiesSeeder,
	) {
		super("./data/learning-goals.json");
	}

	async seed(tx: NodePgDatabase): Promise<void> {
		await this.loadData();
		console.log(`🥁 - Seeding ${this.dataJson?.length ?? 0} learning goals...`);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No learning goal data to seed");
			return;
		}

		const goalsToInsert = this.dataJson.map((goal) => {
			const copy: Omit<ILearningGoal, "key"> = { ...goal };

			if (typeof copy.createdAt === "string")
				copy.createdAt = new Date(copy.createdAt);

			if (typeof copy.updatedAt === "string")
				copy.updatedAt = new Date(copy.updatedAt);

			const userId = this.usersSeeder.getIdKey(goal.userId);
			if (!userId) {
				throw new Error(`User ID not found for key: ${goal.userId}`);
			}

			const communityId = this.communitiesSeeder.getIdKey(goal.communityId);
			if (!communityId) {
				throw new Error(`Community ID not found for key: ${goal.communityId}`);
			}
			copy.userId = userId;
			copy.communityId = communityId;
			return copy;
		});

		const insertedLearningGoals = await tx
			.insert(learningGoalsTable)
			.values(goalsToInsert)
			.returning({ id: learningGoalsTable.id });

		insertedLearningGoals.forEach((insertedGoal, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedGoal.id);
		});

		console.log(
			`🗿 - Inserted ${insertedLearningGoals.length} learning goals.`,
		);
	}
}
