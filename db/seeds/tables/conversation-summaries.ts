import { conversationSummariesTable } from "@/db/schemas";
import { BaseSeeder } from "@/db/seeds/base";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ConversationsSeeder } from "./conversations";

interface IConversationSummary {
	key: string;
	conversationId: string;
	summary: string;
	actionItems: Array<string>;
	keyPoints: Array<string>;
	nextSteps: Array<string>;
	generatedAt: Date;
}

export class ConversationSummariesSeeder extends BaseSeeder<IConversationSummary> {
	constructor(private conversationsSeeder: ConversationsSeeder) {
		super("./data/conversation-summaries.json");
	}

	async seed(tx: NodePgDatabase): Promise<void> {
		await this.loadData();
		console.log(
			`🥁 - Seeding ${this.dataJson?.length ?? 0} conversation summaries...`,
		);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No conversation summary data to seed");
			return;
		}

		const summariesToInsert = this.dataJson.map((summary) => {
			const copy: Omit<IConversationSummary, "key"> = { ...summary };

			if (typeof copy.generatedAt === "string")
				copy.generatedAt = new Date(copy.generatedAt);

			const conversationId = this.conversationsSeeder.getIdKey(
				summary.conversationId,
			);
			if (!conversationId) {
				throw new Error(
					`Conversation ID not found for key: ${summary.conversationId}`,
				);
			}
			copy.conversationId = conversationId;
			return copy;
		});

		const insertedSummaries = await tx
			.insert(conversationSummariesTable)
			.values(summariesToInsert)
			.returning({ id: conversationSummariesTable.id });

		insertedSummaries.forEach((insertedSummary, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedSummary.id);
		});

		console.log(
			`🗿 - Inserted ${insertedSummaries.length} conversation summaries.`,
		);
	}
}
