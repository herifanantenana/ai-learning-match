import { conversationsTable } from "@/db/schemas";
import type { TxOrDb } from "@/db/seeds/base";
import { BaseSeeder } from "@/db/seeds/base";
import { MatchesSeeder } from "./matches";

interface IConversation {
	key: string;
	matchId: string;
	lastMessageAt: Date;
	createdAt: Date;
}

export class ConversationsSeeder extends BaseSeeder<IConversation> {
	constructor(private matchesSeeder: MatchesSeeder) {
		super("./data/conversations.json");
	}

	async seed(tx: TxOrDb): Promise<void> {
		await this.loadData();
		console.log(`🥁 - Seeding ${this.dataJson?.length ?? 0} conversations...`);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No conversation data to seed");
			return;
		}

		const conversationsToInsert = this.dataJson.map((conversation) => {
			const copy: Omit<IConversation, "key"> = { ...conversation };

			if (typeof copy.createdAt === "string")
				copy.createdAt = new Date(copy.createdAt);

			if (typeof copy.lastMessageAt === "string")
				copy.lastMessageAt = new Date(copy.lastMessageAt);

			const matchId = this.matchesSeeder.getIdKey(conversation.matchId);
			if (!matchId) {
				throw new Error(`Match ID not found for key: ${conversation.matchId}`);
			}
			copy.matchId = matchId;
			return copy;
		});

		const insertedConversations = await tx
			.insert(conversationsTable)
			.values(conversationsToInsert)
			.returning({ id: conversationsTable.id });

		insertedConversations.forEach((insertedConversation, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedConversation.id);
		});

		console.log(`🗿 - Inserted ${insertedConversations.length} conversations.`);
	}
}
