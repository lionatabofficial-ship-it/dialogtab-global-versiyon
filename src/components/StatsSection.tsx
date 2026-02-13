interface StatsSectionDict {
	stat1Value: string;
	stat1Title: string;
	stat1Desc: string;
	stat2Value: string;
	stat2Title: string;
	stat2Desc: string;
	stat3Value: string;
	stat3Title: string;
	stat3Desc: string;
	ctaTitle: string;
	ctaDesc: string;
	bookDemo: string;
	tryFree: string;
}

export default function StatsSection({ dict }: { dict: StatsSectionDict }) {
	return (
		<section className="py-20 bg-slate-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-3 gap-12 mb-16">
					<div>
						<div className="text-5xl md:text-6xl font-bold text-brand-400 mb-4">{dict.stat1Value}</div>
						<div className="text-lg font-semibold mb-2">{dict.stat1Title}</div>
						<p className="text-slate-400">{dict.stat1Desc}</p>
					</div>
					<div>
						<div className="text-5xl md:text-6xl font-bold text-brand-400 mb-4">{dict.stat2Value}</div>
						<div className="text-lg font-semibold mb-2">{dict.stat2Title}</div>
						<p className="text-slate-400">{dict.stat2Desc}</p>
					</div>
					<div>
						<div className="text-5xl md:text-6xl font-bold text-brand-400 mb-4">{dict.stat3Value}</div>
						<div className="text-lg font-semibold mb-2">{dict.stat3Title}</div>
						<p className="text-slate-400">{dict.stat3Desc}</p>
					</div>
				</div>

				<div className="bg-gradient-to-r from-brand-500 to-purple-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
					<div>
						<h3 className="text-2xl md:text-3xl font-bold mb-2">{dict.ctaTitle}</h3>
						<p className="text-white/80">{dict.ctaDesc}</p>
					</div>
					<div className="flex gap-4 mt-6 md:mt-0">
						<a href="#" className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors">{dict.bookDemo}</a>
						<a href="https://app.dialogtab.com/register" className="bg-brand-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-800 transition-colors flex items-center gap-2">
							{dict.tryFree}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
