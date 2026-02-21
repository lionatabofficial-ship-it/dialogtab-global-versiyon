import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
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
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);

	return (
		<>
			<Header dict={dict.header} locale={locale} />
			<main>
				<Hero dict={dict.hero} />
				<VideoSection dict={dict.videoSection} />
				<ConsiderItDone dict={dict.considerItDone} locale={locale} />
				<IndustrySection dict={dict.industrySection} locale={locale} />
				<StatsSection dict={dict.statsSection} />
				<Features dict={dict.features} />
				<Integrations dict={dict.integrations} />
				<GettingStarted dict={dict.gettingStarted} />
				<Pricing dict={dict.pricing} />
				<Testimonials dict={dict.testimonials} />
			</main>
			<Footer dict={dict.footer} locale={locale} />
			<ChatWidget dict={dict.chatWidget} />
			<ScrollToTop />
		</>
	);
}
