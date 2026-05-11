import { PricingTable } from "@clerk/nextjs";
import { SectionHeader } from "../section-header";

export function PricingSection() {
	return (
		<section className="py-18 sm:py-24" id="pricing">
			<div className="container border">
				<div className="space-y-16 border">
					<SectionHeader
						title="Simple, Transparent Pricing"
						description="Choose the plan that works best for you. Start free and upgrade as you grow."
					/>
					<div className="mx-auto max-w-4xl">
						<PricingTable />
					</div>
				</div>
			</div>
		</section>
	);
}
