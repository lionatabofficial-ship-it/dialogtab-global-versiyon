import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import PartnershipForm from "@/components/PartnershipForm";

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).partnershipPage as PageData | undefined;
	if (!page?.meta) return {};
	return {
		title: page.meta.title,
		description: page.meta.description,
		keywords: page.meta.keywords,
		openGraph: {
			title: page.meta.title,
			description: page.meta.description,
			images: ["https://dialogtab.com/images/dialogtab.webp"],
			type: "website",
		},
		alternates: {
			canonical: `https://dialogtab.com/${locale}/partnership`,
			languages: {
				en: "https://dialogtab.com/en/partnership",
				tr: "https://dialogtab.com/tr/partnership",
				es: "https://dialogtab.com/es/partnership",
			},
		},
	};
}

interface BenefitCard {
	icon: string;
	title: string;
	description: string;
}

interface FormDict {
	title: string;
	subtitle: string;
	categories: string[];
	nameLabel: string;
	namePlaceholder: string;
	emailLabel: string;
	emailPlaceholder: string;
	phoneLabel: string;
	phonePlaceholder: string;
	companyLabel: string;
	companyPlaceholder: string;
	websiteLabel: string;
	websitePlaceholder: string;
	messageLabel: string;
	messagePlaceholder: string;
	submitButton: string;
}

interface PageData {
	meta: { title: string; description: string; keywords: string };
	hero: { badge: string; title: string; titleHighlight: string; description: string };
	benefits: { title: string; subtitle: string; items: BenefitCard[] };
	form: FormDict;
	cta: { title: string; description: string; button: string };
}

const benefitIcons: Record<string, React.ReactNode> = {
	rocket: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
	chart: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
	puzzle: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.39 4.39a1 1 0 0 0 .61.22 2.5 2.5 0 0 1 0 5 1 1 0 0 0-1 1V13a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 2.5 2.5 0 0 1 5 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-9a1 1 0 0 0-.61.22 2.5 2.5 0 0 1-3.27-.17" /><path d="M8.61 4.39A1 1 0 0 1 8 4.61 2.5 2.5 0 0 0 8 9.61a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1 2.5 2.5 0 0 0-5 0 1 1 0 0 1-1 1H-2" /><path d="M15 14v2a1 1 0 0 1-.39.78 2.5 2.5 0 0 0 .17 3.27 1 1 0 0 1 .22.61V22a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1a1 1 0 0 1 .22-.61A2.5 2.5 0 0 0 3 17.12a1 1 0 0 1-.39-.78V14" /></svg>,
	handshake: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88" /><path d="m11 17-2-2a1 1 0 1 1 3-3" /><path d="M7.5 6.5 6 8" /><path d="m9 11 4-4" /><path d="m2 2 20 20" /><circle cx="12" cy="12" r="10" /></svg>,
};

function getIcon(key: string) {
	return benefitIcons[key] || benefitIcons.rocket;
}

export default async function PartnershipPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).partnershipPage as PageData;

	return (
		<>
			<Header dict={dict.header} locale={locale} />
			<main>
				{/* Hero Section */}
				<section className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
					<div className="absolute top-20 left-10 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
					<div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
					<div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<span className="inline-block bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
							{page.hero.badge}
						</span>
						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
							{page.hero.title}<span className="text-brand-400">{page.hero.titleHighlight}</span>
						</h1>
						<p className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl mx-auto">
							{page.hero.description}
						</p>
						<a href="#partnership-form" className="bg-brand-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 inline-flex items-center justify-center gap-2">
							{page.cta.button}
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>
				</section>

				{/* Benefits Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{page.benefits.title}</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">{page.benefits.subtitle}</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
							{page.benefits.items.map((item) => (
								<div key={item.title} className="text-center group">
									<div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
										{getIcon(item.icon)}
									</div>
									<h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
									<p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Partnership Form Section */}
				<PartnershipForm dict={page.form} />

				{/* CTA Section */}
				<section className="py-20 bg-slate-900">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{page.cta.title}</h2>
						<p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">{page.cta.description}</p>
						<a href="mailto:info@dialogtab.com" className="bg-brand-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 inline-flex items-center justify-center gap-2">
							{page.cta.button}
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
						</a>
					</div>
				</section>
			</main>
			<Footer dict={dict.footer} locale={locale} />
			<ChatWidget dict={dict.chatWidget} />
			<ScrollToTop />
		</>
	);
}
