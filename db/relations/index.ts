import { defineRelations } from "drizzle-orm";
import * as schemas from "../schemas";
import * as communities from "./communities";
import * as conversationSummaries from "./conversation-summaries";
import * as conversations from "./conversations";
import * as learningGoals from "./learning-goals";
import * as matches from "./matches";
import * as messages from "./messages";
import * as users from "./users";

const mainRelation = defineRelations(schemas);

const relations = {
	...mainRelation,
	...communities,
	...conversationSummaries,
	...conversations,
	...learningGoals,
	...matches,
	...messages,
	...users,
};

export default relations;
