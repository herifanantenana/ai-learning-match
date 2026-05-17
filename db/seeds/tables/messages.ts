import { messagesTable } from "@/db/schemas";
import { BaseSeeder } from "@/db/seeds/base";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { ConversationsSeeder } from "./conversations";
import { UsersSeeder } from "./users";

interface IMessage {
	key: string;
	conversationId: string;
	senderId: string;
	content: string;
	createdAt: Date;
}

export class MessagesSeeder extends BaseSeeder<IMessage> {
	constructor(
		private conversationSeeder: ConversationsSeeder,
		private usersSeeder: UsersSeeder,
	) {
		super("./data/messages.json");
	}

	async seed(tx: NodePgDatabase): Promise<void> {
		await this.loadData();
		console.log(`🥁 - Seeding ${this.dataJson?.length ?? 0} messages...`);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No message data to seed");
			return;
		}

		const messagesToInsert = this.dataJson.map((message) => {
			const copy: Omit<IMessage, "key"> = { ...message };

			if (typeof copy.createdAt === "string")
				copy.createdAt = new Date(copy.createdAt);
			const conversationId = this.conversationSeeder.getIdKey(
				message.conversationId,
			);
			if (!conversationId) {
				throw new Error(
					`Conversation ID not found for key: ${message.conversationId}`,
				);
			}
			copy.conversationId = conversationId;

			const senderId = this.usersSeeder.getIdKey(message.senderId);
			if (!senderId) {
				throw new Error(`Sender ID not found for key: ${message.senderId}`);
			}
			copy.senderId = senderId;

			return copy;
		});

		const insertedMessages = await tx
			.insert(messagesTable)
			.values(messagesToInsert)
			.returning({ id: messagesTable.id });

		insertedMessages.forEach((insertedMessage, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedMessage.id);
		});

		console.log(`🗿 - Inserted ${insertedMessages.length} messages.`);
	}
}
