import { CTASection } from "@/components/page/landing/sections/cta-section";
import { FeaturesSection } from "@/components/page/landing/sections/features-section";
import { HeroSection } from "@/components/page/landing/sections/hero-section";
import { HowItWorkSection } from "@/components/page/landing/sections/how-it-work-section";
import { PricingSection } from "@/components/page/landing/sections/pricing-section";

export default function Home() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<FeaturesSection />
			<HowItWorkSection />
			<PricingSection />
			<CTASection />
		</main>
	);
}
