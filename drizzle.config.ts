import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DIRECT_DATABASE_URL;

if (!connectionString) {
	throw new Error("DIRECT_DATABASE_URL environment variable is not defined.");
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
