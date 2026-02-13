"use client";

import { useState } from "react";
import Image from "next/image";

interface IndustryContent {
	titleStart: string;
	titleHighlight: string;
	description: string;
}

interface HeroDict {
	selectIndustry: string;
	industries: string[];
	industryContent: IndustryContent[];
	bookDemo: string;
	tryFree: string;
	partnerBadge: string;
	dashboardAlt: string;
}

export default function Hero({ dict }: { dict: HeroDict }) {
	const [selectedIdx, setSelectedIdx] = useState(0);
	const [displayIdx, setDisplayIdx] = useState(0);
	const [animating, setAnimating] = useState(false);

	const content = dict.industryContent[displayIdx];

	const handleSelect = (idx: number) => {
		if (idx === selectedIdx || animating) return;
		setSelectedIdx(idx);
		setAnimating(true);
		setTimeout(() => {
			setDisplayIdx(idx);
			setAnimating(false);
		}, 300);
	};

	return (
		<section className="relative pt-28 pb-16 overflow-hidden bg-[#f8f8f6]">
			<div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl" />
			<div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<p className="text-sm text-slate-500 mb-3">{dict.selectIndustry}</p>
					<div className="flex flex-wrap justify-center gap-2">
						{dict.industries.map((ind, idx) => (
							<button
								key={ind}
								onClick={() => handleSelect(idx)}
								className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
									selectedIdx === idx
										? "bg-brand-600 text-white shadow-lg shadow-brand-500/25 scale-105"
										: "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
								}`}
							>
								{ind}
							</button>
						))}
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<div
							className={`transition-all duration-300 ease-in-out ${
								animating
									? "opacity-0 translate-y-4"
									: "opacity-100 translate-y-0"
							}`}
						>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
								{content.titleStart}<span className="text-brand-500">{content.titleHighlight}</span>
							</h1>
							<p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.description }} />
						</div>
						<div className="flex flex-col sm:flex-row gap-4 mb-8">
							<a href="https://app.dialogtab.com/register" className="bg-slate-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">{dict.bookDemo}</a>
							<a href="https://app.dialogtab.com/register" className="bg-brand-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2">
								{dict.tryFree}
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
						</div>
						<div className="flex items-center gap-2 text-sm text-slate-500">
							<div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-white"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
							</div>
							<span dangerouslySetInnerHTML={{ __html: dict.partnerBadge }} />
						</div>
					</div>

					<div className="relative">
						<Image
							alt={dict.dashboardAlt}
							className="w-full rounded-2xl shadow-2xl"
							src="/images/mainpage.png"
							width={800}
							height={500}
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
