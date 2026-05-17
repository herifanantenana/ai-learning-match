import { db } from "@/db";
import { learningGoalsTable } from "@/db/schemas";
import { BaseSeeder } from "@/db/seeds/base";
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

export class LearningGoalsSeeder extends BaseSeeder<ILearningGoal, typeof db> {
	constructor(
		private usersSeeder: UsersSeeder,
		private communitiesSeeder: CommunitiesSeeder,
	) {
		super("./data/learning-goals.json");
	}
	async clean(tx: typeof db): Promise<void> {
		console.log("🚬 - Cleaning learning goals...");
		await tx.delete(learningGoalsTable);
		console.log("🔔 - Learning goals cleaned.");
	}

	async seed(tx: typeof db): Promise<void> {
		await this.clean(tx);
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
