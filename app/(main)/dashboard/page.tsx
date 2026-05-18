"use client";

import { useUser } from "@clerk/nextjs";

export default function DashboardPage() {
	const { isLoaded, user } = useUser();
	return (
		<div className="">
			<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
			<p className="text-muted-foreground">
				Welcome back, <span>{!isLoaded ? "Loading..." : user?.firstName}</span>
			</p>
		</div>
	);
}
