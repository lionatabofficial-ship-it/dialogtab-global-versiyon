"use client";

import { useState } from "react";

interface PricingDict {
	badge: string;
	titleStart: string;
	titleHighlight: string;
	subtitle: string;
	annually: string;
	monthly: string;
	save20: string;
	saved20: string;
	perAgent: string;
	tryFree: string;
	plans: {
		name: string;
		subtitle: string;
		badge?: string;
		features: { text: string; included: boolean }[];
	}[];
	enterprise: string;
	enterpriseDesc: string;
	contactUs: string;
	allPricesNote: string;
}

const prices = [
	{ monthlyPrice: 30, annualPrice: 24, highlighted: false },
	{ monthlyPrice: 45, annualPrice: 36, highlighted: true },
	{ monthlyPrice: 60, annualPrice: 48, highlighted: false },
];

export default function Pricing({ dict }: { dict: PricingDict }) {
	const [annual, setAnnual] = useState(true);

	return (
		<section id="pricing" className="py-20 bg-gradient-to-b from-slate-50 to-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-12">
					<span className="inline-block bg-brand-100 text-brand-700 text-sm font-bold px-4 py-2 rounded-full mb-4">{dict.badge}</span>
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{dict.titleStart} <span className="gradient-text">{dict.titleHighlight}</span></h2>
					<p className="text-lg text-slate-600 mb-8">{dict.subtitle}</p>
					<div className="inline-flex items-center gap-3 bg-slate-100 p-1.5 rounded-full">
						<button onClick={() => setAnnual(true)} className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${annual ? "bg-white text-brand-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{dict.annually}</button>
						<button onClick={() => setAnnual(false)} className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${!annual ? "bg-white text-brand-600 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>{dict.monthly}</button>
						<span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{dict.save20}</span>
					</div>
				</div>

				<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
					{dict.plans.map((plan, i) => (
						<div key={plan.name} className={`relative bg-white rounded-2xl p-8 ${prices[i].highlighted ? "border-2 border-brand-500 shadow-2xl shadow-brand-500/20" : "border border-slate-200 shadow-lg shadow-slate-900/5"}`}>
							{plan.badge && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<div className="bg-gradient-to-r from-brand-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>
										{plan.badge}
									</div>
								</div>
							)}
							<div className="mb-6">
								<h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
								<p className="text-slate-500 text-sm">{plan.subtitle}</p>
							</div>
							<div className="mb-6">
								<div className="flex items-baseline gap-1">
									<span className="text-4xl font-bold text-brand-600">${annual ? prices[i].annualPrice : prices[i].monthlyPrice}</span>
									<span className="text-slate-500">{dict.perAgent}</span>
								</div>
								{annual && <div className="text-sm text-green-600 font-medium mt-1">{dict.saved20}</div>}
							</div>
							<ul className="space-y-3 mb-8">
								{plan.features.map((f) => (
									<li key={f.text} className="flex items-center gap-3">
										{f.included ? (
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500 flex-shrink-0"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
										) : (
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300 flex-shrink-0"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
										)}
										<span className={f.included ? "text-slate-700" : "text-slate-400"}>{f.text}</span>
									</li>
								))}
							</ul>
							<a href="https://app.dialogtab.com/register" className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${prices[i].highlighted ? "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-500/30" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}>
								{dict.tryFree}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
						</div>
					))}
				</div>

				<div className="max-w-md mx-auto mt-8">
					<div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg text-center">
						<h3 className="text-xl font-bold text-slate-900 mb-2">{dict.enterprise}</h3>
						<p className="text-slate-500 text-sm mb-6">{dict.enterpriseDesc}</p>
						<a href="https://dialogtab.com/contact" className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold text-sm inline-flex items-center gap-2 hover:bg-brand-700 transition-all">
							{dict.contactUs}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>
				</div>
				<p className="text-center text-slate-500 text-sm mt-12">{dict.allPricesNote}</p>
			</div>
		</section>
	);
}
