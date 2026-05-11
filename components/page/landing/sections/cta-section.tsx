import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
	return (
		<section className="py-18 sm:py-24">
			<div className="container border">
				<div className="space-y-8 rounded border p-8 text-center sm:p-12">
					<div className="space-y-4">
						<h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
							Stop learning alone
						</h2>

						<p className="text-muted-foreground mx-auto max-w-xl text-lg">
							Get matched with someone who&apos;s learning the same things. Hold
							each other accountable. Make real progress.
						</p>
					</div>

					<Button asChild size="lg">
						<Link href="/sign-up">Try it for Free</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
