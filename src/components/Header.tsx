"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					<Link href="/" className="flex items-center gap-3">
						<Image alt="DialogTab" className="h-8 w-auto" src="/images/dialogtab.webp" width={160} height={32} priority />
						<span className="text-xl font-bold text-slate-900">DialogTab</span>
					</Link>

					<div className="hidden lg:flex items-center gap-1">
						<div className="relative">
							<button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
								Solutions
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
							</button>
						</div>
						<div className="relative">
							<button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
								Sectors
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform"><path d="m6 9 6 6 6-6" /></svg>
							</button>
						</div>
						<a href="https://dialogtab.com/livechat-for-ecommerce" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Ecommerce</a>
						<Link href="#pricing" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Pricing</Link>
						<Link href="/contact" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Contact</Link>
						<Link href="/blog" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Blog</Link>
					</div>

					<div className="hidden lg:flex items-center gap-4">
						<a href="https://app.dialogtab.com/" className="text-sm font-semibold text-slate-900 hover:text-brand-600 transition-colors border border-slate-300 px-5 py-2.5 rounded-full">Login</a>
						<a href="https://app.dialogtab.com/register" className="bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5">Try for free</a>
					</div>

					<button className="lg:hidden p-2 text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
							{mobileMenuOpen ? (
								<><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>
							) : (
								<><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></>
							)}
						</svg>
					</button>
				</div>
			</div>

			{mobileMenuOpen && (
				<div className="lg:hidden bg-white border-t px-6 py-4 space-y-3">
					<a href="#" className="block text-base font-medium text-slate-700">Solutions</a>
					<a href="#" className="block text-base font-medium text-slate-700">Sectors</a>
					<a href="https://dialogtab.com/livechat-for-ecommerce" className="block text-base font-medium text-slate-700">Ecommerce</a>
					<Link href="#pricing" className="block text-base font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
					<Link href="/contact" className="block text-base font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
					<Link href="/blog" className="block text-base font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
					<div className="pt-4 border-t space-y-3">
						<a href="https://app.dialogtab.com/" className="block text-base font-medium text-slate-700">Login</a>
						<a href="https://app.dialogtab.com/register" className="block w-full text-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white">Try for free</a>
					</div>
				</div>
			)}
		</nav>
	);
}
