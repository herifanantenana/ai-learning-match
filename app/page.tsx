import { CTASection } from "@/components/page/landing/cta-section";
import { FeaturesSection } from "@/components/page/landing/features-section";
import { HeroSection } from "@/components/page/landing/hero-section";
import { HowItWorkSection } from "@/components/page/landing/how-it-work-section";
import { PricingSection } from "@/components/page/landing/pricing-section";

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
