import { db } from "@/db";
import { communityMembersTable } from "@/db/schemas";
import { BaseSeeder } from "@/db/seeds/base";
import { CommunitiesSeeder } from "./communities";
import { UsersSeeder } from "./users";

export interface ICommunityMember {
	key: string;
	userId: string;
	communityId: string;
	joinedAt: Date;
}

export class CommunityMembersSeeder extends BaseSeeder<
	ICommunityMember,
	typeof db
> {
	constructor(
		private usersSeeder: UsersSeeder,
		private communitiesSeeder: CommunitiesSeeder,
	) {
		super("./data/community-members.json");
	}

	async clean(tx: typeof db): Promise<void> {
		console.log("🚬 - Cleaning community members...");
		await tx.delete(communityMembersTable);
		console.log("🔔 - Community members cleaned.");
	}

	async seed(tx: typeof db): Promise<void> {
		await this.clean(tx);
		await this.loadData();
		console.log(
			`🥁 - Seeding ${this.dataJson?.length ?? 0} community members...`,
		);
		if (!this.dataJson || this.dataJson.length === 0) {
			console.warn("🐷 - No community member data to seed");
			return;
		}

		const membersToInsert = this.dataJson.map((member) => {
			const copy: Omit<ICommunityMember, "key"> = { ...member };

			if (typeof copy.joinedAt === "string")
				copy.joinedAt = new Date(copy.joinedAt);

			const userId = this.usersSeeder.getIdKey(member.userId);
			if (!userId) {
				throw new Error(`User ID not found for key: ${member.userId}`);
			}

			const communityId = this.communitiesSeeder.getIdKey(member.communityId);
			if (!communityId) {
				throw new Error(
					`Community ID not found for key: ${member.communityId}`,
				);
			}
			copy.userId = userId;
			copy.communityId = communityId;
			return copy;
		});

		const insertedMembers = await tx
			.insert(communityMembersTable)
			.values(membersToInsert)
			.returning({ id: communityMembersTable.id });

		insertedMembers.forEach((insertedMember, index) => {
			const key = this.dataJson![index].key;
			this.recordKeyId(key, insertedMember.id);
		});

		console.log(`🗿 - Inserted ${insertedMembers.length} community members.`);
	}
}
