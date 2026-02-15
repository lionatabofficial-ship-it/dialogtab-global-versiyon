import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";

const SOLUTION_SLUGS = ["whatsapp-solutions"] as const;
type SolutionSlug = (typeof SOLUTION_SLUGS)[number];

export async function generateStaticParams() {
	const params: { locale: string; solution: string }[] = [];
	for (const locale of locales) {
		for (const solution of SOLUTION_SLUGS) {
			params.push({ locale, solution });
		}
	}
	return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; solution: string }> }): Promise<Metadata> {
	const { locale: rawLocale, solution } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	if (!SOLUTION_SLUGS.includes(solution as SolutionSlug)) return {};
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).solutionPages as Record<string, { meta: { title: string; description: string; keywords: string } }>;
	const meta = page[solution]?.meta;
	if (!meta) return {};
	return {
		title: meta.title,
		description: meta.description,
		keywords: meta.keywords,
		openGraph: {
			title: meta.title,
			description: meta.description,
			images: ["https://dialogtab.com/images/dialogtab.webp"],
			type: "website",
		},
		alternates: {
			canonical: `https://dialogtab.com/${locale}/solutions/${solution}`,
			languages: {
				en: `https://dialogtab.com/en/solutions/${solution}`,
				tr: `https://dialogtab.com/tr/solutions/${solution}`,
				es: `https://dialogtab.com/es/solutions/${solution}`,
			},
		},
	};
}

interface SolutionFeature {
	title: string;
	description: string;
	icon: string;
}

interface SolutionStat {
	value: string;
	label: string;
}

interface WhyPoint {
	title: string;
	description: string;
	icon: string;
}

interface HowItWorksStep {
	step: string;
	title: string;
	description: string;
}

interface FaqItem {
	question: string;
	answer: string;
}

interface HighlightCard {
	icon: string;
	title: string;
	subtitle: string;
	description: string;
	bullets: string[];
}

interface AnalyticsCard {
	icon: string;
	title: string;
	description: string;
	bullets: string[];
}

interface SolutionPageData {
	slug: string;
	meta: { title: string; description: string; keywords: string };
	hero: { badge: string; title: string; titleHighlight: string; description: string; cta: string; ctaSecondary: string };
	stats: SolutionStat[];
	highlights: { title: string; subtitle: string; cards: HighlightCard[] };
	whyDialogTab: { title: string; subtitle: string; points: WhyPoint[] };
	features: SolutionFeature[];
	howItWorks: { title: string; subtitle: string; steps: HowItWorksStep[] };
	analytics: { title: string; subtitle: string; cards: AnalyticsCard[] };
	faq: { title: string; items: FaqItem[] };
	customSolution: { title: string; description: string; button: string };
	cta: { title: string; description: string; button: string; buttonSecondary: string };
}

const featureIcons: Record<string, React.ReactNode> = {
	megaphone: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 13v-2z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>,
	cart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>,
	chart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
	target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
	creditCard: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>,
	barChart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="20" y2="10" /><line x1="18" x2="18" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="16" /></svg>,
	shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>,
	zap: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
	rocket: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
	users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
	trendingUp: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
	dollarSign: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
	mail: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>,
	messageSquare: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
	check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>,
};

function getIcon(key: string) {
	return featureIcons[key] || featureIcons.zap;
}

export default async function SolutionPage({ params }: { params: Promise<{ locale: string; solution: string }> }) {
	const { locale: rawLocale, solution } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;

	if (!SOLUTION_SLUGS.includes(solution as SolutionSlug)) {
		notFound();
	}

	const dict = await getDictionary(locale);
	const solutionPages = (dict as Record<string, unknown>).solutionPages as Record<string, SolutionPageData>;
	const page = solutionPages[solution];

	if (!page) {
		notFound();
	}

	return (
		<>
			<Header dict={dict.header} locale={locale} />
			<main>
				{/* Hero Section */}
				<section className="relative pt-32 pb-20 overflow-hidden bg-[#f8f8f6]">
					<div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
					<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
					<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<span className="inline-block bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
							{page.hero.badge}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
							{page.hero.title}<span className="text-brand-500">{page.hero.titleHighlight}</span>
						</h1>
						<p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
							{page.hero.description}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="https://app.dialogtab.com/register" className="bg-brand-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 inline-flex items-center justify-center gap-2">
								{page.hero.cta}
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
							<a href="https://app.dialogtab.com/register" className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg inline-flex items-center justify-center gap-2">
								{page.hero.ctaSecondary}
							</a>
						</div>
					</div>
				</section>

				{/* Stats Section */}
				<section className="py-16 bg-white">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
							{page.stats.map((stat) => (
								<div key={stat.label} className="text-center">
									<div className="text-3xl sm:text-4xl font-bold text-brand-600 mb-2">{stat.value}</div>
									<div className="text-sm text-slate-600">{stat.label}</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Highlights Section - Two large feature cards */}
				<section className="py-20 bg-[#f8f8f6]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.highlights.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-3xl mx-auto">
								{page.highlights.subtitle}
							</p>
						</div>
						<div className="grid lg:grid-cols-2 gap-8">
							{page.highlights.cards.map((card) => (
								<div key={card.title} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100">
									<div className="flex items-center mb-6">
										<div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mr-4">
											{getIcon(card.icon)}
										</div>
										<div>
											<h3 className="text-xl font-bold text-slate-900">{card.title}</h3>
											<p className="text-brand-600 font-medium text-sm">{card.subtitle}</p>
										</div>
									</div>
									<p className="text-slate-600 mb-6 leading-relaxed">{card.description}</p>
									<div className="space-y-3">
										{card.bullets.map((bullet) => (
											<div key={bullet} className="flex items-center bg-[#f8f8f6] rounded-lg p-3">
												<div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
													<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600"><path d="M20 6 9 17l-5-5" /></svg>
												</div>
												<span className="text-slate-700 text-sm">{bullet}</span>
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Why DialogTab Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.whyDialogTab.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								{page.whyDialogTab.subtitle}
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-8">
							{page.whyDialogTab.points.map((point) => (
								<div key={point.title} className="bg-[#f8f8f6] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex gap-5">
									<div className="flex-shrink-0 w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600">
										{getIcon(point.icon)}
									</div>
									<div>
										<h3 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h3>
										<p className="text-slate-600 leading-relaxed">{point.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Features Grid */}
				<section className="py-20 bg-[#f8f8f6]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{page.features.map((feature) => (
								<div key={feature.title} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
									<div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
										{getIcon(feature.icon)}
									</div>
									<h3 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h3>
									<p className="text-slate-600 leading-relaxed">{feature.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* How It Works Section */}
				<section className="py-20 bg-slate-900">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
								{page.howItWorks.title}
							</h2>
							<p className="text-lg text-slate-400 max-w-2xl mx-auto">
								{page.howItWorks.subtitle}
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{page.howItWorks.steps.map((step, i) => (
								<div key={step.title} className="relative text-center">
									<div className="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
										{step.step}
									</div>
									{i < page.howItWorks.steps.length - 1 && (
										<div className="hidden lg:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-0.5 bg-brand-500/30" />
									)}
									<h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
									<p className="text-slate-400 leading-relaxed text-sm">{step.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Analytics Section - Three column cards */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.analytics.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-3xl mx-auto">
								{page.analytics.subtitle}
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{page.analytics.cards.map((card) => (
								<div key={card.title} className="bg-[#f8f8f6] rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
									<div className="w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mb-6">
										{getIcon(card.icon)}
									</div>
									<h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
									<p className="text-slate-600 mb-5 leading-relaxed">{card.description}</p>
									<ul className="space-y-2">
										{card.bullets.map((bullet) => (
											<li key={bullet} className="flex items-center text-sm text-slate-600">
												<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500 mr-2 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
												{bullet}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-20 bg-[#f8f8f6]">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
							{page.faq.title}
						</h2>
						<div className="space-y-4">
							{page.faq.items.map((item) => (
								<details key={item.question} className="group bg-white rounded-2xl overflow-hidden">
									<summary className="flex items-center justify-between p-6 cursor-pointer list-none">
										<h3 className="text-base font-semibold text-slate-900 pr-4">{item.question}</h3>
										<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-500 flex-shrink-0 transition-transform group-open:rotate-180"><path d="m6 9 6 6 6-6" /></svg>
									</summary>
									<div className="px-6 pb-6 pt-0">
										<p className="text-slate-600 leading-relaxed">{item.answer}</p>
									</div>
								</details>
							))}
						</div>
					</div>
				</section>

				{/* Custom Solution Section */}
				<section className="py-20 bg-white">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
							{page.customSolution.title}
						</h2>
						<p className="text-lg text-slate-500 mb-8 leading-relaxed">
							{page.customSolution.description}
						</p>
						<a
							href="mailto:info@dialogtab.com"
							className="bg-brand-500 text-white px-10 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 inline-flex items-center justify-center gap-3 text-base"
						>
							{page.customSolution.button}
							<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><g id="Mail"><path d="M19.435,4.065H4.565a2.5,2.5,0,0,0-2.5,2.5v10.87a2.5,2.5,0,0,0,2.5,2.5h14.87a2.5,2.5,0,0,0,2.5-2.5V6.565A2.5,2.5,0,0,0,19.435,4.065Zm-14.87,1h14.87a1.489,1.489,0,0,1,1.49,1.39c-2.47,1.32-4.95,2.63-7.43,3.95a6.172,6.172,0,0,1-1.06.53,2.083,2.083,0,0,1-1.67-.39c-1.42-.75-2.84-1.51-4.25-2.26-1.14-.6-2.3-1.21-3.44-1.82A1.491,1.491,0,0,1,4.565,5.065Zm16.37,12.37a1.5,1.5,0,0,1-1.5,1.5H4.565a1.5,1.5,0,0,1-1.5-1.5V7.6c2.36,1.24,4.71,2.5,7.07,3.75a5.622,5.622,0,0,0,1.35.6,2.872,2.872,0,0,0,2-.41c1.45-.76,2.89-1.53,4.34-2.29,1.04-.56,2.07-1.1,3.11-1.65Z" /></g></svg>
						</a>
					</div>
				</section>

				{/* CTA Section */}
				<section className="py-20 bg-slate-900">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
							{page.cta.title}
						</h2>
						<p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
							{page.cta.description}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<a href="https://app.dialogtab.com/register" className="bg-brand-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 inline-flex items-center justify-center gap-2">
								{page.cta.button}
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
							<a href="https://app.dialogtab.com/register" className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all shadow-lg inline-flex items-center justify-center gap-2">
								{page.cta.buttonSecondary}
							</a>
						</div>
					</div>
				</section>
			</main>
			<Footer dict={dict.footer} locale={locale} />
			<ChatWidget dict={dict.chatWidget} />
			<ScrollToTop />
		</>
	);
}
