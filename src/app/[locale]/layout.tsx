import type { Metadata } from "next";
import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);
	return {
		title: dict.metadata.title,
		description: dict.metadata.description,
		keywords: dict.metadata.keywords,
		openGraph: {
			title: dict.metadata.title,
			description: dict.metadata.description,
			images: ["https://dialogtab.com/images/dialogtab.webp"],
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
		},
		icons: {
			icon: "/images/favicon.ico",
			shortcut: "/images/favicon.ico",
		},
		alternates: {
			canonical: `https://dialogtab.com/${locale}`,
			languages: {
				en: "https://dialogtab.com/en",
				tr: "https://dialogtab.com/tr",
				es: "https://dialogtab.com/es",
			},
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}>) {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;

	return (
		<html lang={locale}>
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
			</head>
			<body className="antialiased">
				{children}
			</body>
		</html>
	);
}
