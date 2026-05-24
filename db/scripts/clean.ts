import { sql } from "drizzle-orm";
import { db } from "../index";

async function cleanDatabase() {
	console.log("🚬 - Starting database cleaning...");

	try {
		await db.execute(sql.raw(`SET session_replication_role = 'replica';`));
		await db.execute(sql.raw(`SET client_min_messages = 'warning';`));

		const tablesResult = await db.execute(
			sql.raw(`SELECT tablename FROM pg_tables WHERE schemaname = 'public';`),
		);

		const tablesNames = tablesResult.rows.map((row) => String(row.tablename));

		for (const tableName of tablesNames) {
			await db.execute(
				sql`TRUNCATE TABLE ${sql.identifier(tableName)} RESTART IDENTITY CASCADE;`,
			);
			console.log(`🔔 - ${tableName} table truncated.`);
		}

		console.log("🎉 - Database cleaning completed.");
	} catch (error) {
		console.error("🩸 - Error during database cleaning:", error);
	} finally {
		await db.execute(sql.raw(`SET session_replication_role = 'origin';`));
		await db.execute(sql.raw(`SET client_min_messages = 'notice';`));
	}
}

cleanDatabase()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error("🩸 - Unhandled error during database cleaning:", error);
		process.exit(1);
	});
