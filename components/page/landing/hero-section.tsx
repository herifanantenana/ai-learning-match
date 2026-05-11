import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RocketIcon, SparklesIcon, ZapIcon } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="border py-18 sm:py-24">
			<div className="container border">
				<div className="flex flex-col items-center gap-y-8 border text-center">
					<Badge variant="secondary" className="font-medium">
						Powered by AI{" "}
						<SparklesIcon className="text-primary transition-transform duration-200 group-hover/badge:scale-110" />
					</Badge>
					<h1 className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
						Find Your Perfect <br />{" "}
						<span className="from-primary to-primary/80 bg-linear-to-br bg-clip-text text-transparent">
							AI Learning Partner
						</span>
					</h1>
					<p className="text-muted-foreground max-w-md text-lg lg:max-w-xl lg:text-xl">
						Join communities, set your learning goals, and get matched with
						partners who share your passion. Chat, collaborate, and grow
						together with AI-powered insights .
					</p>
					<div className="flex flex-col gap-3 sm:flex-row">
						<Button asChild variant="outline" size="lg">
							<Link
								href="/sign-in"
								className="hover:text-primary font-semibold"
							>
								<RocketIcon className="transition-transform duration-200 group-hover/button:scale-115 group-hover/button:-rotate-40" />{" "}
								Get Started for Free
							</Link>
						</Button>
						<Button asChild size="lg">
							<Link href="/#pricing" className="font-semibold">
								<ZapIcon className="transition-transform duration-200 group-hover/button:scale-115 group-hover/button:rotate-15" />{" "}
								Buy a Plan
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
