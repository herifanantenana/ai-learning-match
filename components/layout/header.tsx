import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, Show, UserButton } from "@clerk/nextjs";
import {
	LoaderIcon,
	MessageCircleIcon,
	TrophyIcon,
	UserIcon,
} from "lucide-react";
import Link from "next/link";

const NAVIGATION = [
	{ href: "/dashboard", label: "Dashboard", icon: TrophyIcon },
	{ href: "/communities", label: "Communities", icon: UserIcon },
	{ href: "/chat", label: "Chat", icon: MessageCircleIcon },
];

export function Header() {
	return (
		<header className="border">
			<div className="container flex items-center justify-between py-4">
				<nav className="flex items-center gap-x-6">
					<Link href="/" className="text-xl font-bold">
						Meetsy
					</Link>

					<Show when="signed-in">
						<ul className="flex items-center gap-x-6">
							{NAVIGATION.map(({ href, label, icon: Icon }) => (
								<li key={href}>
									<Button asChild variant="ghost" size="sm">
										<Link href={href}>
											<Icon className="text-primary" />
											{label}
										</Link>
									</Button>
								</li>
							))}
						</ul>
					</Show>
				</nav>

				<div className="flex items-center gap-x-4">
					<Show when="signed-out">
						<Button variant="ghost" size="sm" asChild>
							<Link href="/sign-in">Sign In</Link>
						</Button>

						<Button size="sm" asChild>
							<Link href="/sign-up">Sign Up</Link>
						</Button>
					</Show>

					<Show when="signed-in">
						<Show
							when={{ plan: "pro_plan" }}
							fallback={<Badge variant="outline">Free</Badge>}
						>
							<Badge variant="outline" className="gap-x-2">
								<TrophyIcon className="text-primary" />
								<span>Pro</span>
							</Badge>
						</Show>

						<ClerkLoading>
							<LoaderIcon
								size={28}
								className="text-muted-foreground animate-spin"
							/>
						</ClerkLoading>
						<ClerkLoaded>
							<UserButton />
						</ClerkLoaded>
					</Show>
				</div>
			</div>
		</header>
	);
}
