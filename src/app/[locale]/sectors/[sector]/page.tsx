import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";

const SECTOR_SLUGS = ["insurance", "automotive", "hospitality", "wholesale", "e-commerce", "cosmetics", "health", "education"] as const;
type SectorSlug = (typeof SECTOR_SLUGS)[number];

export async function generateStaticParams() {
	const params: { locale: string; sector: string }[] = [];
	for (const locale of locales) {
		for (const sector of SECTOR_SLUGS) {
			params.push({ locale, sector });
		}
	}
	return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; sector: string }> }): Promise<Metadata> {
	const { locale: rawLocale, sector } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	if (!SECTOR_SLUGS.includes(sector as SectorSlug)) return {};
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).sectorPages as Record<string, { meta: { title: string; description: string; keywords: string } }>;
	const meta = page[sector]?.meta;
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
			canonical: `https://dialogtab.com/${locale}/sectors/${sector}`,
			languages: {
				en: `https://dialogtab.com/en/sectors/${sector}`,
				tr: `https://dialogtab.com/tr/sectors/${sector}`,
				es: `https://dialogtab.com/es/sectors/${sector}`,
			},
		},
	};
}

interface SectorFeature {
	title: string;
	description: string;
	icon: string;
}

interface SectorStat {
	value: string;
	label: string;
}

interface SectorUseCase {
	title: string;
	description: string;
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

interface SectorPageData {
	slug: string;
	meta: { title: string; description: string; keywords: string };
	hero: { badge: string; title: string; titleHighlight: string; description: string; cta: string; ctaSecondary: string };
	stats: SectorStat[];
	whyDialogTab: { title: string; subtitle: string; points: WhyPoint[] };
	features: SectorFeature[];
	howItWorks: { title: string; subtitle: string; steps: HowItWorksStep[] };
	useCases: { title: string; items: SectorUseCase[] };
	faq: { title: string; items: FaqItem[] };
	customSolution: { title: string; description: string; button: string };
	cta: { title: string; description: string; button: string; buttonSecondary: string };
}

const featureIcons: Record<string, React.ReactNode> = {
	cart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>,
	package: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>,
	search: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>,
	team: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
	integration: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
	ai: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>,
	calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>,
	map: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></svg>,
	globe: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
	notification: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
	star: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
	bell: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /><path d="M4 2C2.8 3.7 2 5.7 2 8" /><path d="M22 8c0-2.3-.8-4.3-2-6" /></svg>,
	service: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" x2="6" y1="1" y2="4" /><line x1="10" x2="10" y1="1" y2="4" /><line x1="14" x2="14" y1="1" y2="4" /></svg>,
	building: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>,
	promotion: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>,
	car: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>,
	wrench: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
	followup: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 3 9-3 9 19-9Z" /><path d="M6 12h16" /></svg>,
	invoice: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z" /><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" /><path d="M12 17.5v-11" /></svg>,
	alert: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>,
	meter: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0" /><path d="M12 6v6l4 2" /></svg>,
	chart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
	document: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>,
	tracking: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
	shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>,
	rocket: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
	zap: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
	target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
	check: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>,
	headphones: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" /></svg>,
};

function getIcon(key: string) {
	return featureIcons[key] || featureIcons.ai;
}

export default async function SectorPage({ params }: { params: Promise<{ locale: string; sector: string }> }) {
	const { locale: rawLocale, sector } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;

	if (!SECTOR_SLUGS.includes(sector as SectorSlug)) {
		notFound();
	}

	const dict = await getDictionary(locale);
	const sectorPages = (dict as Record<string, unknown>).sectorPages as Record<string, SectorPageData>;
	const page = sectorPages[sector];

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

				{/* Why DialogTab Section */}
				<section className="py-20 bg-[#f8f8f6]">
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
							{page.whyDialogTab.points.map((point, i) => (
								<div key={point.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex gap-5">
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

				{/* Features Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{page.features.map((feature) => (
								<div key={feature.title} className="bg-[#f8f8f6] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
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

				{/* Use Cases Section */}
				<section className="py-20 bg-[#f8f8f6]">
					<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
							{page.useCases.title}
						</h2>
						<div className="grid md:grid-cols-2 gap-8">
							{page.useCases.items.map((item, i) => (
								<div key={item.title} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all flex gap-5">
									<div className="flex-shrink-0 w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
										{i + 1}
									</div>
									<div>
										<h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
										<p className="text-slate-600 leading-relaxed">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="py-20 bg-white">
					<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
						<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-12">
							{page.faq.title}
						</h2>
						<div className="space-y-4">
							{page.faq.items.map((item) => (
								<details key={item.question} className="group bg-[#f8f8f6] rounded-2xl overflow-hidden">
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
				<section className="py-20 bg-[#f8f8f6]">
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
