"use client";

import { useState } from "react";

interface FeaturesDict {
	badge: string;
	titleStart: string;
	titleHighlight: string;
	subtitle: string;
	tabs: {
		label: string;
		title: string;
		description: string;
		features: string[];
		cta: string;
		stats: { value: string; label: string }[];
	}[];
}

const hardcodedTabs = [
	{
		id: "order",
		icon: <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>,
		ctaHref: "https://dialogtab.com/ecommerce",
	},
	{
		id: "search",
		icon: <><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></>,
		ctaHref: "#pricing",
	},
	{
		id: "multichannel",
		icon: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
		ctaHref: "#",
	},
	{
		id: "multiagent",
		icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></>,
		ctaHref: "#",
	},
	{
		id: "track",
		icon: <><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>,
		ctaHref: "#pricing",
	},
];

export default function Features({ dict }: { dict: FeaturesDict }) {
	const [activeTab, setActiveTab] = useState("order");

	const tabs = hardcodedTabs.map((ht, i) => ({
		...ht,
		label: dict.tabs[i].label,
		title: dict.tabs[i].title,
		description: dict.tabs[i].description,
		features: dict.tabs[i].features,
		cta: dict.tabs[i].cta,
		stats: dict.tabs[i].stats,
	}));

	const active = tabs.find((t) => t.id === activeTab) || tabs[0];

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block bg-brand-100 text-brand-700 text-sm font-bold px-4 py-2 rounded-full mb-4">{dict.badge}</span>
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{dict.titleStart} <span className="gradient-text">{dict.titleHighlight}</span></h2>
					<p className="text-lg text-slate-600">{dict.subtitle}</p>
				</div>

				<div className="flex flex-wrap justify-center gap-2 mb-12">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
								activeTab === tab.id
									? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
									: "bg-slate-100 text-slate-700 hover:bg-slate-200"
							}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">{tab.icon}</svg>
							{tab.label}
						</button>
					))}
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-3xl font-bold text-slate-900 mb-6">{active.title}</h3>
						<p className="text-lg text-slate-600 mb-8 leading-relaxed">{active.description}</p>
						<div className="space-y-4 mb-8">
							{active.features.map((feat) => (
								<div key={feat} className="flex items-start gap-3">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
									<span className="text-slate-700">{feat}</span>
								</div>
							))}
						</div>
						<a href={active.ctaHref} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
							{active.cta}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>

					<div className="relative">
						<div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">{active.icon}</svg>
								</div>
								<h4 className="text-xl font-bold text-slate-900">{active.title}</h4>
							</div>
							<div className="grid grid-cols-3 gap-4">
								{active.stats.map((stat) => (
									<div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
										<div className="text-2xl font-bold text-brand-600 mb-1">{stat.value}</div>
										<div className="text-xs text-slate-500">{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
