import { defineRelations } from "drizzle-orm";
import * as schemas from "./";

export const relations = defineRelations(schemas, (r) => ({
	usersTable: {
		communities: r.many.communitiesTable({
			from: r.usersTable.id,
			to: r.communitiesTable.ownerId,
		}),
		communityMembers: r.many.communitiesTable({
			from: r.usersTable.id.through(r.communityMembersTable.userId),
			to: r.communitiesTable.id.through(r.communityMembersTable.communityId),
		}),
		learningGoals: r.many.learningGoalsTable({
			from: r.usersTable.id,
			to: r.learningGoalsTable.userId,
		}),
		matchesAsUser1: r.many.matchesTable({
			from: r.usersTable.id,
			to: r.matchesTable.user1Id,
		}),
		matchesAsUser2: r.many.matchesTable({
			from: r.usersTable.id,
			to: r.matchesTable.user2Id,
		}),
		messages: r.many.messagesTable({
			from: r.usersTable.id,
			to: r.messagesTable.senderId,
		}),
	},

	communitiesTable: {
		owner: r.one.usersTable({
			from: r.communitiesTable.ownerId,
			to: r.usersTable.id,
		}),
		communityMembers: r.many.usersTable({
			from: r.communitiesTable.id.through(r.communityMembersTable.communityId),
			to: r.usersTable.id.through(r.communityMembersTable.userId),
		}),
		learningGoals: r.many.learningGoalsTable({
			from: r.communitiesTable.id,
			to: r.learningGoalsTable.communityId,
		}),
		matches: r.many.matchesTable({
			from: r.communitiesTable.id,
			to: r.matchesTable.communityId,
		}),
	},

	learningGoalsTable: {
		user: r.one.usersTable({
			from: r.learningGoalsTable.userId,
			to: r.usersTable.id,
		}),
		community: r.one.communitiesTable({
			from: r.learningGoalsTable.communityId,
			to: r.communitiesTable.id,
		}),
	},

	matchesTable: {
		users1: r.one.usersTable({
			from: r.matchesTable.user1Id,
			to: r.usersTable.id,
		}),
		users2: r.one.usersTable({
			from: r.matchesTable.user2Id,
			to: r.usersTable.id,
		}),
		community: r.one.communitiesTable({
			from: r.matchesTable.communityId,
			to: r.communitiesTable.id,
		}),
		conversations: r.many.conversationsTable({
			from: r.matchesTable.id,
			to: r.conversationsTable.matchId,
		}),
	},

	conversationsTable: {
		match: r.one.matchesTable({
			from: r.conversationsTable.matchId,
			to: r.matchesTable.id,
		}),
		messages: r.many.messagesTable({
			from: r.conversationsTable.id,
			to: r.messagesTable.conversationId,
		}),
		summaries: r.many.conversationSummariesTable({
			from: r.conversationsTable.id,
			to: r.conversationSummariesTable.conversationId,
		}),
	},

	messagesTable: {
		conversation: r.one.conversationsTable({
			from: r.messagesTable.conversationId,
			to: r.conversationsTable.id,
		}),
		sender: r.one.usersTable({
			from: r.messagesTable.senderId,
			to: r.usersTable.id,
		}),
	},

	conversationSummariesTable: {
		conversation: r.one.conversationsTable({
			from: r.conversationSummariesTable.conversationId,
			to: r.conversationsTable.id,
		}),
	},
}));
