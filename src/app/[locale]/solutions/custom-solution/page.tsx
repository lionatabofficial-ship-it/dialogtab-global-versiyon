import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import CustomSolutionForm from "@/components/CustomSolutionForm";

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).customSolutionPage as PageData | undefined;
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
			canonical: `https://dialogtab.com/${locale}/solutions/custom-solution`,
			languages: {
				en: `https://dialogtab.com/en/solutions/custom-solution`,
				tr: `https://dialogtab.com/tr/solutions/custom-solution`,
				es: `https://dialogtab.com/es/solutions/custom-solution`,
			},
		},
	};
}

interface CapabilityItem {
	icon: string;
	title: string;
	description: string;
}

interface WhyUsPoint {
	icon: string;
	title: string;
	description: string;
}

interface FormDict {
	title: string;
	subtitle: string;
	nameLabel: string;
	namePlaceholder: string;
	emailLabel: string;
	emailPlaceholder: string;
	phoneLabel: string;
	phonePlaceholder: string;
	websiteLabel: string;
	websitePlaceholder: string;
	messageLabel: string;
	messagePlaceholder: string;
	submitButton: string;
}

interface PageData {
	meta: { title: string; description: string; keywords: string };
	hero: { badge: string; title: string; titleHighlight: string; description: string };
	stats: { value: string; label: string }[];
	capabilities: { title: string; subtitle: string; items: CapabilityItem[] };
	whyUs: { title: string; subtitle: string; points: WhyUsPoint[] };
	form: FormDict;
	cta: { title: string; description: string; button: string; buttonSecondary: string };
}

const featureIcons: Record<string, React.ReactNode> = {
	zap: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
	messageSquare: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
	shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>,
	chart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
	users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
	rocket: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
	target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
};

function getIcon(key: string) {
	return featureIcons[key] || featureIcons.zap;
}

export default async function CustomSolutionPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).customSolutionPage as PageData;

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
						<a href="#contact-form" className="bg-brand-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 inline-flex items-center justify-center gap-2">
							{page.cta.button}
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
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

				{/* Capabilities Section */}
				<section className="py-20 bg-[#f8f8f6]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.capabilities.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-3xl mx-auto">
								{page.capabilities.subtitle}
							</p>
						</div>
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{page.capabilities.items.map((item) => (
								<div key={item.title} className="bg-white rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group">
									<div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-600 mb-5 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
										{getIcon(item.icon)}
									</div>
									<h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
									<p className="text-slate-600 leading-relaxed">{item.description}</p>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Why Choose Us Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.whyUs.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								{page.whyUs.subtitle}
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-8">
							{page.whyUs.points.map((point) => (
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

				{/* Contact Form Section */}
				<CustomSolutionForm dict={page.form} />

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
							<a href="#contact-form" className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all shadow-lg inline-flex items-center justify-center gap-2">
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
