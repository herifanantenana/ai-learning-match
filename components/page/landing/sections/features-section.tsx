import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	GroupIcon,
	LucideIcon,
	MessageSquareIcon,
	SparklesIcon,
	TrophyIcon,
	UsersIcon,
	ZapIcon,
} from "lucide-react";
import { SectionHeader } from "../section-header";

const FEATURES = [
	{
		icon: UsersIcon,
		title: "Matching that works",
		description:
			"We look at your goals, skill level, and what you want to learn, then find someone who's a good fit. No swiping, no guessing.",
	},
	{
		icon: MessageSquareIcon,
		title: "Built-in chat",
		description:
			"Message your matches directly in the app. Plan sessions, share resources, or just check in on each other's progress.",
	},
	{
		icon: SparklesIcon,
		title: "Auto summaries",
		description:
			"After each chat, get a quick summary of what you discussed and what to work on next. Keeps you accountable without the effort.",
	},
	{
		icon: TrophyIcon,
		title: "Track your goals",
		description:
			"Write down what you're learning and where you're at. Update it as you go. Simple goal tracking that doesn't get in your way.",
	},
	{
		icon: GroupIcon,
		title: "Join communities",
		description:
			"Find groups of people learning similar things. Whether it's coding, design, or YouTube, there's probably a community for it.",
	},
	{
		icon: ZapIcon,
		title: "Quick setup",
		description:
			"Sign up, fill out your profile, and you're ready to get matched. Takes a few minutes, not a few hours.",
	},
];

function FeatureCard({
	icon: Icon,
	title,
	description,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
}) {
	return (
		<Card className="hover:border-primary/50 hover:shadow-primary/50 border-2 transition-colors duration-200">
			<CardHeader>
				<div className="bg-primary/10 mb-4 inline-flex size-12 items-center justify-center rounded-lg">
					<Icon className="text-primary transition-transform duration-200 group-hover/card:scale-120" />
				</div>

				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
		</Card>
	);
}

export function FeaturesSection() {
	return (
		<section className="border py-18 sm:py-24">
			<div className="container border">
				<div className="space-y-16 border">
					<SectionHeader
						title="Everything You Need to Learn Together"
						description="Powerful features designed to help you find, connect and learn with the right partners"
					/>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{FEATURES.map(({ icon, title, description }, index) => (
							<FeatureCard
								key={index}
								icon={icon}
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
