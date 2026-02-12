import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import ConsiderItDone from "@/components/ConsiderItDone";
import IndustrySection from "@/components/IndustrySection";
import StatsSection from "@/components/StatsSection";
import Features from "@/components/Features";
import Integrations from "@/components/Integrations";
import GettingStarted from "@/components/GettingStarted";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<>
			<Header />
			<main>
				<Hero />
				<VideoSection />
				<ConsiderItDone />
				<IndustrySection />
				<StatsSection />
				<Features />
				<Integrations />
				<GettingStarted />
				<Pricing />
				<Testimonials />
			</main>
			<Footer />
		</>
	);
}
