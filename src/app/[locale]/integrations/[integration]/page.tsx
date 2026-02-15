import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";

const INTEGRATION_SLUGS = ["social-media", "e-commerce"] as const;
type IntegrationSlug = (typeof INTEGRATION_SLUGS)[number];

export async function generateStaticParams() {
	const params: { locale: string; integration: string }[] = [];
	for (const locale of locales) {
		for (const integration of INTEGRATION_SLUGS) {
			params.push({ locale, integration });
		}
	}
	return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; integration: string }> }): Promise<Metadata> {
	const { locale: rawLocale, integration } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	if (!INTEGRATION_SLUGS.includes(integration as IntegrationSlug)) return {};
	const dict = await getDictionary(locale);
	const page = (dict as Record<string, unknown>).integrationPages as Record<string, { meta: { title: string; description: string; keywords: string } }>;
	const meta = page[integration]?.meta;
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
			canonical: `https://dialogtab.com/${locale}/integrations/${integration}`,
			languages: {
				en: `https://dialogtab.com/en/integrations/${integration}`,
				tr: `https://dialogtab.com/tr/integrations/${integration}`,
				es: `https://dialogtab.com/es/integrations/${integration}`,
			},
		},
	};
}

interface PlatformItem {
	name: string;
	description: string;
	icon: string;
	features: string[];
}

interface FaqItem {
	question: string;
	answer: string;
}

interface IntegrationPageData {
	slug: string;
	meta: { title: string; description: string; keywords: string };
	hero: { badge: string; title: string; titleHighlight: string; description: string; cta: string; ctaSecondary: string };
	stats: { value: string; label: string }[];
	platformsSection: { title: string; subtitle: string };
	platforms: PlatformItem[];
	benefitsSection: { title: string; subtitle: string };
	benefits: { title: string; description: string; icon: string }[];
	howItWorks: { title: string; subtitle: string; steps: { step: string; title: string; description: string }[] };
	faq: { title: string; items: FaqItem[] };
	customSolution: { title: string; description: string; button: string };
	cta: { title: string; description: string; button: string; buttonSecondary: string };
}

/* ──── Platform icon SVGs ──── */
const platformIcons: Record<string, React.ReactNode> = {
	whatsapp: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
		</svg>
	),
	instagram: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
		</svg>
	),
	facebook: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	),
	telegram: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
		</svg>
	),
	tiktok: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
		</svg>
	),
	livechat: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
		</svg>
	),
	viber: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.187.541 6.749.46 9.942c-.081 3.193-.187 9.19 5.624 10.773h.005l-.003 2.46s-.039.993.616 1.195c.792.244 1.258-.51 2.016-1.326.415-.447.989-1.104 1.422-1.605 3.922.331 6.936-.424 7.282-.536.797-.258 5.309-.838 6.042-6.839.756-6.192-.362-10.106-2.362-11.867C19.539.862 16.632.074 14.022.015c-.346-.008-.678-.01-.994-.008-.346-.003-.71.002-1.1.01l-.53-.015zM11.505 1.9h.52c2.248.05 4.769.678 6.234 1.834 1.713 1.453 2.692 4.837 2.048 10.18-.62 5.096-4.38 5.48-5.06 5.7-.29.094-2.89.742-6.18.524 0 0-2.45 2.959-3.214 3.728-.12.12-.26.167-.353.144-.13-.032-.166-.187-.165-.413l.02-4.042c-4.946-1.346-4.66-6.462-4.593-9.16.067-2.699.672-4.894 2.1-6.3C4.787 2.227 8.862 1.876 10.88 1.856c.209-.002.418-.001.625.044zm.648 3.09c-.2 0-.2.303 0 .306 1.372.023 2.546.474 3.424 1.323.879.85 1.368 2.05 1.412 3.458.003.203.307.194.304-.009-.048-1.534-.594-2.854-1.564-3.793-.969-.938-2.272-1.446-3.773-1.472a.18.18 0 00-.015 0c.003-.004.009-.01.012-.013zm-3.294 1.36c-.334-.006-.667.113-.907.383l-.753.846c-.345.393-.39.903-.127 1.399.01.015.02.03.03.043.717 1.225 1.616 2.37 2.762 3.474 .005.004.01.009.014.013l.014.014c1.104 1.146 2.25 2.046 3.473 2.762l.044.03c.496.263 1.006.218 1.399-.127l.845-.754c.484-.44.542-1.163.138-1.668l-1.204-1.37c-.397-.453-1.09-.474-1.593-.16l-.781.575c-.087.064-.2.052-.274-.022l-.014-.014c-.55-.467-1.058-.976-1.583-1.561l-.007-.008-.007-.008c-.585-.525-1.094-1.033-1.561-1.583l-.014-.013c-.074-.074-.086-.187-.022-.274l.575-.781c.314-.503.293-1.196-.16-1.592l-1.37-1.204a1.126 1.126 0 00-.716-.305l-.2-.004zm4.195.913c-.199-.003-.207.299-.008.305 1.052.05 1.88.42 2.472 1.041.594.621.915 1.466.92 2.481.001.203.306.199.305-.004-.005-1.128-.37-2.089-1.04-2.79-.67-.7-1.608-1.098-2.74-1.143a.236.236 0 00-.022 0c.004.004.009.007.013.01h.1zm.15 1.885c-.203-.006-.204.3-.002.308.634.058 1.048.504 1.07 1.2.003.203.308.198.305-.005-.027-.842-.53-1.423-1.325-1.497a.357.357 0 00-.047-.006z" />
		</svg>
	),
	shopify: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.74c-.021-.128-.143-.207-.252-.198-.109.008-2.295.168-2.295.168s-1.526-1.479-1.698-1.65c-.168-.168-.504-.12-.635-.078-.004.001-.27.083-.686.213-.408-1.177-1.127-2.26-2.39-2.26-.035 0-.07.001-.106.004-.359-.471-.803-.681-1.19-.681-2.946 0-4.354 3.686-4.793 5.558-.944.292-1.615.5-1.698.526-.53.166-.546.183-.616.684C4.494 7.293 2.5 22.027 2.5 22.027l12.837 1.952zM10.903 2.924c0 .065-.001.128-.004.191-.67.208-1.402.434-2.14.662.412-1.589 1.185-2.359 1.861-2.649.186.466.283 1.073.283 1.796zm-1.268-2.38c.121 0 .24.058.355.171-.885.417-1.835 1.467-2.235 3.564l-1.696.525c.471-1.602 1.596-4.26 3.576-4.26zm.63 11.067s-.713-.375-1.588-.375c-1.284 0-1.348.806-1.348 1.009 0 1.109 2.891 1.533 2.891 4.132 0 2.043-1.296 3.357-3.045 3.357-2.098 0-3.169-1.304-3.169-1.304l.561-1.857s1.104.947 2.034.947c.606 0 .855-.477.855-.826 0-1.449-2.373-1.513-2.373-3.894 0-2.004 1.438-3.943 4.343-3.943.906 0 1.543.29 1.543.29l-.704 2.464z" />
		</svg>
	),
	woocommerce: (
		<svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
			<path d="M2.227 4.857A2.228 2.228 0 000 7.094v7.457c0 1.236 1.001 2.237 2.237 2.237h4.391l-1.078 2.295 4.666-2.295h5.092c.502-.032.963-.247 1.296-.58.343-.343.548-.804.548-1.262l.01-7.85c0-.501-.199-.963-.542-1.305a1.822 1.822 0 00-1.312-.548l-13.082-.386zm.193 1.164h13.527c.274.01.542.119.737.305.193.193.3.449.3.724V14.5c.003.264-.105.524-.296.716-.193.193-.455.301-.73.312H10.9L7.66 17.125l.72-1.596H2.42a1.08 1.08 0 01-1.072-1.08V7.093a1.08 1.08 0 011.072-1.072zM4.1 7.762c-.413.037-.733.27-.96.698-.39.724-.543 1.723-.462 2.997.05.82.204 1.489.462 2.007.337.669.755.965 1.254.889.399-.07.684-.376.855-.918.202-.642.29-1.42.265-2.335a6.985 6.985 0 00-.277-1.794c-.188-.58-.49-.921-.907-1.025a1.052 1.052 0 00-.23-.02zm4.528 0c-.413.037-.733.27-.96.698-.39.724-.543 1.723-.462 2.997.05.82.203 1.489.462 2.007.337.669.754.965 1.253.889.4-.07.685-.376.856-.918.202-.642.29-1.42.265-2.335a6.984 6.984 0 00-.278-1.794c-.187-.58-.489-.921-.906-1.025a1.052 1.052 0 00-.23-.02zm4.985.108c-.323.018-.541.158-.655.42l-1.49 3.476.408-3.696c.036-.34-.144-.559-.542-.656-.392-.097-.646-.03-.762.2-.003.006-.004.012-.007.018l-1.33 3.465.193-3.03c.026-.393-.167-.617-.58-.672-.325-.043-.553.069-.685.333l-1.72 3.554 1.1-1.572c.168-.248.3-.46.367-.538l.024.116c.06.295.146.543.255.748l.29.549c.087.127.179.16.28.113l.1-.113 1.048-2.553-.142 2.616c-.013.2.076.349.268.449.191.1.37.09.535-.03l.36-.277 1.463-3.197-.328 2.782c-.052.391.109.624.484.698.196.037.362-.008.498-.134.04-.037.074-.08.101-.127l1.717-3.32c.186-.352.103-.572-.249-.66a.873.873 0 00-.154-.022z" />
		</svg>
	),
	bigcommerce: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect width="16" height="16" x="4" y="4" rx="2" /><path d="M8 8h8" /><path d="M8 12h6" /><path d="M8 16h4" />
		</svg>
	),
	magento: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" /><polyline points="12 22 12 12" /><polyline points="22 7 12 12 2 7" />
		</svg>
	),
	opencart: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
		</svg>
	),
	tsoft: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
		</svg>
	),
	ticimax: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M6 3h12l4 6-10 13L2 9z" />
		</svg>
	),
	ikas: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" />
		</svg>
	),
	prestashop: (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" x2="7.01" y1="7" y2="7" />
		</svg>
	),
};

const platformColorMap: Record<string, string> = {
	whatsapp: "bg-green-500",
	instagram: "bg-gradient-to-br from-purple-500 to-pink-500",
	facebook: "bg-blue-600",
	telegram: "bg-sky-500",
	tiktok: "bg-slate-900",
	livechat: "bg-brand-500",
	viber: "bg-violet-600",
	shopify: "bg-green-600",
	woocommerce: "bg-purple-700",
	bigcommerce: "bg-slate-800",
	magento: "bg-orange-600",
	opencart: "bg-sky-600",
	tsoft: "bg-red-600",
	ticimax: "bg-blue-700",
	ikas: "bg-indigo-600",
	prestashop: "bg-pink-600",
};

function getPlatformIcon(key: string) {
	return platformIcons[key] || platformIcons.livechat;
}

function getPlatformColor(key: string) {
	return platformColorMap[key] || "bg-brand-500";
}

const benefitIcons: Record<string, React.ReactNode> = {
	rocket: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
	zap: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" /></svg>,
	shield: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>,
	target: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
	chart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
	users: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
	inbox: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>,
	cart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>,
	package: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>,
	sync: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>,
};

function getBenefitIcon(key: string) {
	return benefitIcons[key] || benefitIcons.zap;
}

export default async function IntegrationPage({ params }: { params: Promise<{ locale: string; integration: string }> }) {
	const { locale: rawLocale, integration } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;

	if (!INTEGRATION_SLUGS.includes(integration as IntegrationSlug)) {
		notFound();
	}

	const dict = await getDictionary(locale);
	const integrationPages = (dict as Record<string, unknown>).integrationPages as Record<string, IntegrationPageData>;
	const page = integrationPages[integration];

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

				{/* Platforms Grid Section */}
				<section className="py-20 bg-[#f8f8f6]">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.platformsSection.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-3xl mx-auto">
								{page.platformsSection.subtitle}
							</p>
						</div>
						<div className={`grid gap-8 ${page.platforms.length > 6 ? "md:grid-cols-2 lg:grid-cols-3" : page.platforms.length > 4 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
							{page.platforms.map((platform) => (
								<div key={platform.name} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group">
									<div className="flex items-center mb-6">
										<div className={`w-14 h-14 ${getPlatformColor(platform.icon)} rounded-2xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-300`}>
											{getPlatformIcon(platform.icon)}
										</div>
										<h3 className="text-xl font-bold text-slate-900">{platform.name}</h3>
									</div>
									<p className="text-slate-600 mb-6 leading-relaxed">{platform.description}</p>
									<div className="space-y-2">
										{platform.features.map((feature) => (
											<div key={feature} className="flex items-center text-sm text-slate-600">
												<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-500 mr-2 flex-shrink-0"><path d="M20 6 9 17l-5-5" /></svg>
												{feature}
											</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Benefits Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
								{page.benefitsSection.title}
							</h2>
							<p className="text-lg text-slate-600 max-w-2xl mx-auto">
								{page.benefitsSection.subtitle}
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-8">
							{page.benefits.map((benefit) => (
								<div key={benefit.title} className="bg-[#f8f8f6] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex gap-5">
									<div className="flex-shrink-0 w-14 h-14 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600">
										{getBenefitIcon(benefit.icon)}
									</div>
									<div>
										<h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
										<p className="text-slate-600 leading-relaxed">{benefit.description}</p>
									</div>
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
