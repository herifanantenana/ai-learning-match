import { sql } from "drizzle-orm";
import { db } from "../index";

async function dropDatabase() {
	console.log("🚬 - Starting database dropping...");

	try {
		await db.execute(sql.raw("SET session_replication_role = 'replica';"));
		await db.execute(sql.raw("SET client_min_messages = 'warning';"));

		const tablesResult = await db.execute(
			sql.raw(`SELECT tablename FROM pg_tables WHERE schemaname = 'public';`),
		);
		const tablesNames = tablesResult.rows.map((row) => String(row.tablename));

		for (const tableName of tablesNames) {
			await db.execute(sql`DROP TABLE IF EXISTS ${sql.identifier(tableName)} CASCADE;`);
			console.log(`🔔 - ${tableName} table dropped.`);
		}

		const enumerationsResult = await db.execute(
			sql.raw(`SELECT typname FROM pg_type WHERE typtype = 'e';`),
		);
		const enumerationsNames = enumerationsResult.rows.map((row) => String(row.typname));

		for (const enumerationName of enumerationsNames) {
			await db.execute(sql`DROP TYPE IF EXISTS ${sql.identifier(enumerationName)} CASCADE;`);
			console.log(`🔔 - ${enumerationName} enumeration dropped.`);
		}

		const sequencesResult = await db.execute(
			sql.raw(
				`SELECT sequence_name FROM information_schema.sequences WHERE sequence_schema = 'public';`,
			),
		);
		const sequencesNames = sequencesResult.rows.map((row) => String(row.sequence_name));

		for (const sequenceName of sequencesNames) {
			await db.execute(sql`DROP SEQUENCE IF EXISTS ${sql.identifier(sequenceName)} CASCADE;`);
			console.log(`🔔 - ${sequenceName} sequence dropped.`);
		}

		const viewsResult = await db.execute(
			sql.raw(
				`SELECT table_name FROM information_schema.views WHERE table_schema = 'public';`,
			),
		);
		const viewsNames = viewsResult.rows.map((row) => String(row.table_name));

		for (const viewName of viewsNames) {
			await db.execute(sql`DROP VIEW IF EXISTS ${sql.identifier(viewName)} CASCADE;`);
			console.log(`🔔 - ${viewName} view dropped.`);
		}

		console.log("🎉 - Database dropping completed.");
	} catch (error) {
		console.error("🩸 - Error during database dropping:", error);
	} finally {
		await db.execute(sql.raw(`SET session_replication_role = 'origin';`));
		await db.execute(sql.raw(`SET client_min_messages = 'notice';`));
	}
}

dropDatabase()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error("🩸 - Unhandled error during database dropping:", error);
		process.exit(1);
	});
