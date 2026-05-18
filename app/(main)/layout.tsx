export default function MainLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="min-h-screen">
			<div className="container py-8">{children}</div>
		</main>
	);
}
