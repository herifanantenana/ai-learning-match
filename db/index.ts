import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schemas from "./schemas";
import { relations } from "./schemas/_relations";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const client = new Pool({ connectionString });

export const db = drizzle({
	client,
	schema: schemas,
	relations,
});
