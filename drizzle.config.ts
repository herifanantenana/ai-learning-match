import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	throw new Error("DATABASE_URL environment variable is not defined.");
}

export default defineConfig({
	dialect: "postgresql",
	schema: "./db/schemas/index.ts",
	out: "./drizzle/migrations",
	dbCredentials: {
		url: connectionString,
	},
	strict: true,
	verbose: true,
});
