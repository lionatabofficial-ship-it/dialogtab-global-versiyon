import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ProductShowcase from "@/components/ProductShowcase";
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
				<Features />
				<ProductShowcase />
				<Integrations />
				<GettingStarted />
				<Pricing />
				<Testimonials />
			</main>
			<Footer />
		</>
	);
}
