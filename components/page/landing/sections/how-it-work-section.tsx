import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "../section-header";

const STEPS = [
	{
		title: "Pick a community",
		description:
			"Browse communities and join the ones that match what you're trying to learn.",
	},
	{
		title: "Add your goals",
		description:
			"Tell us what you want to learn, where you're at, and what you're working on.",
	},
	{
		title: "Get matched",
		description:
			"We'll find someone with similar goals and pair you up for accountability.",
	},
	{
		title: "Start learning",
		description:
			"Message your match, set up sessions, and help each other stay on track.",
	},
];

function StepCard({
	rank,
	title,
	description,
}: {
	rank: number;
	title: string;
	description: string;
}) {
	return (
		<Card className="hover:border-primary/50 hover:shadow-primary/50 border-2 transition-all duration-200 hover:scale-105">
			<CardHeader>
				<span className="group-hover/card:decoration-primary/50 text-primary mb-4 w-fit text-4xl font-bold underline decoration-transparent decoration-4 underline-offset-6 transition-all duration-200 group-hover/card:scale-110">
					{rank}.
				</span>

				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}

export function HowItWorkSection() {
	return (
		<section className="py-18 sm:py-24">
			<div className="container border">
				<div className="space-y-16 border">
					<SectionHeader
						title="How It Works"
						description="Get matched with your ideal learning partner in four simple steps"
					/>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
						{STEPS.map(({ title, description }, index) => (
							<StepCard
								key={index}
								rank={index + 1}
								title={title}
								description={description}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
