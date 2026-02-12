import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "DialogTab | Conversational Commerce on WhatsApp",
	description: "DialogTab is a conversational commerce platform that automates receiving your order or guidance to your user a product via WhatsApp.",
	keywords: "WhatsApp Business API, conversational commerce, e-commerce, chatbot, multi-agent, WhatsApp sales",
	openGraph: {
		title: "DialogTab | Conversational Commerce on WhatsApp",
		description: "Power-up your experts through WhatsApp to increase sales",
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
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
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
