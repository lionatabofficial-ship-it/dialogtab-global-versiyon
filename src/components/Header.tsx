"use client";

import { useState } from "react";
import Link from "next/link";

const navigation = [
	{ name: "Ecommerce", href: "#ecommerce" },
	{ name: "Pricing", href: "#pricing" },
	{ name: "Contact", href: "#contact" },
	{ name: "Blog", href: "https://dialogtab.medium.com", external: true },
];

const languages = [
	{ code: "en", name: "English" },
	{ code: "tr", name: "Türkçe" },
	{ code: "fr", name: "Français" },
	{ code: "de", name: "Deutsch" },
	{ code: "es", name: "Español" },
	{ code: "pt", name: "Português" },
	{ code: "ru", name: "Русский" },
];

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
			<nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2">
					<div className="flex items-center">
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-blue-600">
							<rect width="32" height="32" rx="8" fill="currentColor" />
							<path d="M8 12C8 10.8954 8.89543 10 10 10H22C23.1046 10 24 10.8954 24 12V18C24 19.1046 23.1046 20 22 20H18L14 24V20H10C8.89543 20 8 19.1046 8 18V12Z" fill="white" />
						</svg>
						<span className="ml-2 text-xl font-bold text-gray-900">DialogTab</span>
					</div>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden lg:flex lg:items-center lg:gap-8">
					{navigation.map((item) =>
						item.external ? (
							<a
								key={item.name}
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
							>
								{item.name}
							</a>
						) : (
							<Link
								key={item.name}
								href={item.href}
								className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
							>
								{item.name}
							</Link>
						)
					)}
				</div>

				{/* Right side */}
				<div className="hidden lg:flex lg:items-center lg:gap-4">
					{/* Language Selector */}
					<div className="relative">
						<button
							onClick={() => setLangOpen(!langOpen)}
							className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
							</svg>
							EN
							<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{langOpen && (
							<div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border py-1 z-50">
								{languages.map((lang) => (
									<button
										key={lang.code}
										className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
										onClick={() => setLangOpen(false)}
									>
										{lang.name}
									</button>
								))}
							</div>
						)}
					</div>

					<a
						href="https://app.dialogtab.com"
						className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
					>
						Login
					</a>
					<a
						href="https://app.dialogtab.com/register"
						className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
					>
						Try for free
					</a>
				</div>

				{/* Mobile menu button */}
				<button
					className="lg:hidden p-2"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{mobileMenuOpen ? (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						) : (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						)}
					</svg>
				</button>
			</nav>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className="lg:hidden bg-white border-t px-6 py-4 space-y-4">
					{navigation.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className="block text-base font-medium text-gray-700 hover:text-blue-600"
							onClick={() => setMobileMenuOpen(false)}
						>
							{item.name}
						</Link>
					))}
					<div className="pt-4 border-t space-y-3">
						<a
							href="https://app.dialogtab.com"
							className="block text-base font-medium text-gray-700"
						>
							Login
						</a>
						<a
							href="https://app.dialogtab.com/register"
							className="block w-full text-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
						>
							Try for free
						</a>
					</div>
				</div>
			)}
		</header>
	);
}
