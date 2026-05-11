interface SectionHeaderProps {
	title: string;
	description: string;
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
	return (
		<div className="space-y-4 text-center">
			<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
			<p className="text-muted-foreground mx-auto max-w-xl text-lg">
				{description}
			</p>
		</div>
	);
}
