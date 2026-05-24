import { db } from "@/db";

export async function Footer() {
	const result = await db.query.communitiesTable.findMany();
	return (
		<footer className="border-t py-4">
			<p className="text-muted-foreground ml-3 text-center text-sm">
				&copy; {new Date().getFullYear()} Arakotom. All rights reserved.
			</p>
		</footer>
	);
}
