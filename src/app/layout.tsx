import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "DialogTab | Conversational Commerce on WhatsApp",
	description: "DialogTab is a conversational commerce platform that automates receiving your orders and guiding your users to products via WhatsApp.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">
				{children}
			</body>
		</html>
	);
}
