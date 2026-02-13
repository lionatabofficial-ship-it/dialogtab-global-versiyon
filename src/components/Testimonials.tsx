"use client";

import { useState } from "react";
import Image from "next/image";

const testimonialStyles = [
	{
		logo: "/images/tesetturislandlogo.png",
		gradient: "from-rose-500 to-pink-600",
		metricColor: "text-rose-500",
	},
	{
		logo: "/images/flormarlogo.svg",
		gradient: "from-purple-500 to-indigo-600",
		metricColor: "text-purple-500",
	},
];

interface TestimonialsDict {
	badge: string;
	title: string;
	subtitle: string;
	items: {
		quote: string;
		author: string;
		role: string;
		metric: string;
		metricLabel: string;
	}[];
}

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
	const [current, setCurrent] = useState(0);
	const t = dict.items[current];
	const style = testimonialStyles[current];

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<span className="inline-block bg-brand-100 text-brand-700 text-sm font-bold px-4 py-2 rounded-full mb-4">{dict.badge}</span>
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{dict.title}</h2>
					<p className="text-lg text-slate-600">{dict.subtitle}</p>
				</div>

				<div className="max-w-5xl mx-auto">
					<div className="grid md:grid-cols-5 gap-8 items-center">
						<div className={`md:col-span-3 bg-gradient-to-br ${style.gradient} rounded-3xl p-8 md:p-12 text-white relative overflow-hidden`}>
							<div className="absolute top-4 right-4 opacity-20">
								<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-24 h-24"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z" /></svg>
							</div>
							<Image alt={t.author} className="h-8 mb-8 brightness-0 invert" src={style.logo} width={120} height={32} />
							<blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 relative z-10">&ldquo;{t.quote}&rdquo;</blockquote>
							<div>
								<div className="font-bold">{t.author}</div>
								<div className="text-white/80 text-sm">{t.role}</div>
							</div>
						</div>
						<div className="md:col-span-2 bg-slate-50 rounded-3xl p-8 md:p-12 text-center">
							<div className={`text-6xl md:text-7xl font-bold ${style.metricColor} mb-2`}>{t.metric}</div>
							<div className="text-slate-600 text-lg">{t.metricLabel}</div>
						</div>
					</div>

					<div className="flex items-center justify-center gap-4 mt-8">
						<button onClick={() => setCurrent(current === 0 ? dict.items.length - 1 : current - 1)} className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m15 18-6-6 6-6" /></svg>
						</button>
						<div className="flex items-center gap-2">
							{dict.items.map((item, i) => (
								<button key={i} onClick={() => setCurrent(i)} className="p-1">
									<Image alt={item.author} className={`h-6 transition-all ${i === current ? "opacity-100 grayscale-0" : "opacity-40 grayscale"}`} src={testimonialStyles[i].logo} width={60} height={24} />
								</button>
							))}
						</div>
						<button onClick={() => setCurrent(current === dict.items.length - 1 ? 0 : current + 1)} className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="m9 18 6-6-6-6" /></svg>
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
