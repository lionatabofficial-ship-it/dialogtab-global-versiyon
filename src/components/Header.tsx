"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { locales, localeNames } from "@/i18n/config";

interface HeaderDict {
	solutions: string;
	sectors: string;
	ecommerce: string;
	pricing: string;
	contact: string;
	blog: string;
	login: string;
	tryFree: string;
	solutionsItems: { title: string; desc: string }[];
	sectorsItems: { title: string; desc: string }[];
}

export default function Header({ dict, locale }: { dict: HeaderDict; locale: string }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [solutionsOpen, setSolutionsOpen] = useState(false);
	const [sectorsOpen, setSectorsOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);
	const [mobileLangOpen, setMobileLangOpen] = useState(false);
	const solutionsRef = useRef<HTMLDivElement>(null);
	const sectorsRef = useRef<HTMLDivElement>(null);
	const langRef = useRef<HTMLDivElement>(null);
	const solutionsTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
	const sectorsTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
				setSolutionsOpen(false);
			}
			if (sectorsRef.current && !sectorsRef.current.contains(e.target as Node)) {
				setSectorsOpen(false);
			}
			if (langRef.current && !langRef.current.contains(e.target as Node)) {
				setLangOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const solutionsIcons = [
		<svg key="omnichannel" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
		<svg key="ai" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>,
		<svg key="commerce" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>,
		<svg key="multiagent" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
		<svg key="analytics" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>,
		<svg key="integrations" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>,
	];

	const solutionsHrefs = [
		`/${locale}#features`,
		`/${locale}#features`,
		"https://dialogtab.com/livechat-for-ecommerce",
		`/${locale}#features`,
		`/${locale}#features`,
		`/${locale}#integrations`,
	];

	const solutionsItems = dict.solutionsItems.map((item, i) => ({
		icon: solutionsIcons[i],
		title: item.title,
		desc: item.desc,
		href: solutionsHrefs[i],
	}));

	const sectorsIcons = [
		<svg key="ecommerce" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><rect width="20" height="5" x="2" y="7" /></svg>,
		<svg key="travel" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" /></svg>,
		<svg key="hospitality" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" x2="6" y1="1" y2="4" /><line x1="10" x2="10" y1="1" y2="4" /><line x1="14" x2="14" y1="1" y2="4" /></svg>,
		<svg key="automotive" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>,
		<svg key="energy" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M17 18h1" /><path d="M12 18h1" /><path d="M7 18h1" /></svg>,
		<svg key="financial" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
	];

	const sectorSlugs = ["e-commerce", "travel", "hospitality", "automotive", "energy", "financial"];

	const sectorsItems = dict.sectorsItems.map((item, i) => ({
		icon: sectorsIcons[i],
		title: item.title,
		desc: item.desc,
		href: `/${locale}/sectors/${sectorSlugs[i]}`,
	}));

	return (
		<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<Link href={`/${locale}`} className="flex items-center gap-3">
						<Image alt="DialogTab" className="h-8 w-auto" src="/images/dialogtab.webp" width={160} height={32} priority />
						<span className="text-xl font-bold text-slate-900">DialogTab</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center gap-1">
						{/* Solutions Dropdown */}
						<div
							className="relative"
							ref={solutionsRef}
							onMouseEnter={() => {
								clearTimeout(solutionsTimeout.current);
								setSolutionsOpen(true);
								setSectorsOpen(false);
							}}
							onMouseLeave={() => {
								solutionsTimeout.current = setTimeout(() => setSolutionsOpen(false), 150);
							}}
						>
							<button
								className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
								onClick={() => { setSolutionsOpen(!solutionsOpen); setSectorsOpen(false); }}
							>
								{dict.solutions}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${solutionsOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
							</button>
							{solutionsOpen && (
								<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-1 animate-in fade-in-0 zoom-in-95">
									{solutionsItems.map((item) => (
										<a
											key={item.title}
											href={item.href}
											className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
											onClick={() => setSolutionsOpen(false)}
										>
											<span className="mt-0.5 text-brand-600 group-hover:text-brand-700 transition-colors">{item.icon}</span>
											<div>
												<div className="text-sm font-semibold text-slate-900">{item.title}</div>
												<div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
											</div>
										</a>
									))}
								</div>
							)}
						</div>

						{/* Sectors Dropdown */}
						<div
							className="relative"
							ref={sectorsRef}
							onMouseEnter={() => {
								clearTimeout(sectorsTimeout.current);
								setSectorsOpen(true);
								setSolutionsOpen(false);
							}}
							onMouseLeave={() => {
								sectorsTimeout.current = setTimeout(() => setSectorsOpen(false), 150);
							}}
						>
							<button
								className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
								onClick={() => { setSectorsOpen(!sectorsOpen); setSolutionsOpen(false); }}
							>
								{dict.sectors}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${sectorsOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
							</button>
							{sectorsOpen && (
								<div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 grid grid-cols-2 gap-1 animate-in fade-in-0 zoom-in-95">
									{sectorsItems.map((item) => (
										<a
											key={item.title}
											href={item.href}
											className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
											onClick={() => setSectorsOpen(false)}
										>
											<span className="mt-0.5 text-brand-600 group-hover:text-brand-700 transition-colors">{item.icon}</span>
											<div>
												<div className="text-sm font-semibold text-slate-900">{item.title}</div>
												<div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
											</div>
										</a>
									))}
								</div>
							)}
						</div>

						<a href="https://dialogtab.com/livechat-for-ecommerce" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">{dict.ecommerce}</a>
						<Link href={`/${locale}#pricing`} className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">{dict.pricing}</Link>
						<Link href={`/${locale}/contact`} className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">{dict.contact}</Link>
						<Link href={`/${locale}/blog`} className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">{dict.blog}</Link>
					</div>

					{/* Desktop CTA */}
					<div className="hidden lg:flex items-center gap-4">
						{/* Language Switcher */}
						<div className="relative" ref={langRef}>
							<button
								className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors border border-slate-200 rounded-full"
								onClick={() => setLangOpen(!langOpen)}
							>
								{locale.toUpperCase()}
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
							</button>
							{langOpen && (
								<div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-xl shadow-xl border border-slate-100 py-1 animate-in fade-in-0 zoom-in-95">
									{locales.map((loc) => (
										<a
											key={loc}
											href={`/${loc}`}
											className={`block px-4 py-2 text-sm transition-colors ${loc === locale ? "text-brand-600 font-semibold bg-brand-50" : "text-slate-700 hover:bg-slate-50"}`}
										>
											{localeNames[loc]}
										</a>
									))}
								</div>
							)}
						</div>

						<a href="https://app.dialogtab.com/" className="text-sm font-semibold text-slate-900 hover:text-brand-600 transition-colors border border-slate-300 px-5 py-2.5 rounded-full">{dict.login}</a>
						<a href="https://app.dialogtab.com/register" className="bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5">{dict.tryFree}</a>
					</div>

					{/* Mobile Menu Button */}
					<button className="lg:hidden p-2 text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
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

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className="lg:hidden bg-white border-t px-6 py-4 space-y-1 shadow-lg">
					{/* Solutions Accordion */}
					<MobileAccordion title={dict.solutions}>
						{solutionsItems.map((item) => (
							<a key={item.title} href={item.href} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
								<span className="text-brand-600">{item.icon}</span>
								<div>
									<div className="text-sm font-medium text-slate-900">{item.title}</div>
									<div className="text-xs text-slate-500">{item.desc}</div>
								</div>
							</a>
						))}
					</MobileAccordion>

					{/* Sectors Accordion */}
					<MobileAccordion title={dict.sectors}>
						{sectorsItems.map((item) => (
							<a key={item.title} href={`/${locale}#industries`} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>
								<span className="text-brand-600">{item.icon}</span>
								<div>
									<div className="text-sm font-medium text-slate-900">{item.title}</div>
									<div className="text-xs text-slate-500">{item.desc}</div>
								</div>
							</a>
						))}
					</MobileAccordion>

					<a href="https://dialogtab.com/livechat-for-ecommerce" className="block text-base font-medium text-slate-700 py-2.5 px-3 rounded-lg hover:bg-slate-50">{dict.ecommerce}</a>
					<Link href={`/${locale}#pricing`} className="block text-base font-medium text-slate-700 py-2.5 px-3 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>{dict.pricing}</Link>
					<Link href={`/${locale}/contact`} className="block text-base font-medium text-slate-700 py-2.5 px-3 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>{dict.contact}</Link>
					<Link href={`/${locale}/blog`} className="block text-base font-medium text-slate-700 py-2.5 px-3 rounded-lg hover:bg-slate-50" onClick={() => setMobileMenuOpen(false)}>{dict.blog}</Link>

					{/* Mobile Language Switcher */}
					<div className="pt-2">
						<button
							className="flex items-center justify-between w-full text-base font-medium text-slate-700 py-2.5 px-3 rounded-lg hover:bg-slate-50"
							onClick={() => setMobileLangOpen(!mobileLangOpen)}
						>
							<span>{locale.toUpperCase()} - {localeNames[locale as keyof typeof localeNames]}</span>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${mobileLangOpen ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
						</button>
						{mobileLangOpen && (
							<div className="pl-2 pb-2 space-y-1">
								{locales.map((loc) => (
									<a
										key={loc}
										href={`/${loc}`}
										className={`block py-2 px-3 rounded-lg text-sm ${loc === locale ? "text-brand-600 font-semibold bg-brand-50" : "text-slate-700 hover:bg-slate-50"}`}
									>
										{localeNames[loc]}
									</a>
								))}
							</div>
						)}
					</div>

					<div className="pt-4 border-t space-y-3">
						<a href="https://app.dialogtab.com/" className="block text-center text-base font-medium text-slate-700 py-2.5 border border-slate-300 rounded-full">{dict.login}</a>
						<a href="https://app.dialogtab.com/register" className="block w-full text-center rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 transition-colors">{dict.tryFree}</a>
					</div>
				</div>
			)}
		</nav>
	);
}

function MobileAccordion({ title, children }: { title: string; children: React.ReactNode }) {
	const [open, setOpen] = useState(false);

	return (
		<div>
			<button
				className="flex items-center justify-between w-full text-base font-medium text-slate-700 py-2.5 px-3 rounded-lg hover:bg-slate-50"
				onClick={() => setOpen(!open)}
			>
				{title}
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}><path d="m6 9 6 6 6-6" /></svg>
			</button>
			{open && (
				<div className="pl-2 pb-2 space-y-1">
					{children}
				</div>
			)}
		</div>
	);
}
