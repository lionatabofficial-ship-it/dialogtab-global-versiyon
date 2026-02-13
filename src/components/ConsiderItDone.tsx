export interface ConsiderItDoneDict {
	title: string;
	description: string;
	aiTitle: string;
	aiDescription: string;
	discoverAI: string;
	aiFeatures: string[];
	inboxTitle: string;
	inboxDescription: string;
	discoverInbox: string;
	inboxLabel: string;
	journeysTitle: string;
	journeysDescription: string;
	discoverJourneys: string;
	aiRouting: string;
	intents: string;
	support: string;
	sales: string;
	aiHelpmate: string;
	supportBot: string;
	assignToTeam: string;
}

export default function ConsiderItDone({ dict }: { dict: ConsiderItDoneDict }) {
	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">{dict.title}</h2>
					<p className="text-lg text-slate-600 max-w-2xl mx-auto">{dict.description}</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8 mb-20">
					{/* DialogTab AI Card */}
					<div className="bg-slate-900 rounded-3xl p-8">
						<div className="mb-6">
							<h3 className="text-2xl font-bold text-white mb-4">{dict.aiTitle}</h3>
							<p className="text-slate-300 mb-6">{dict.aiDescription}</p>
							<a href="#" className="inline-flex items-center gap-2 font-semibold text-brand-400 hover:text-brand-300 transition-colors">
								{dict.discoverAI}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
						</div>
						<div className="bg-slate-800 rounded-2xl p-4 space-y-3">
							{[
								{ icon: "M12 8V4H8", extra: <><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></>, label: dict.aiFeatures[0], color: "bg-brand-500" },
								{ icon: "", extra: <><rect width="8" height="8" x="3" y="3" rx="2" /><path d="M7 11v4a2 2 0 0 0 2 2h4" /><rect width="8" height="8" x="13" y="13" rx="2" /></>, label: dict.aiFeatures[1], color: "bg-purple-500" },
								{ icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", extra: null, label: dict.aiFeatures[2], color: "bg-green-500" },
							].map((item) => (
								<div key={item.label} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
									<div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center`}>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
											{item.icon && <path d={item.icon} />}
											{item.extra}
										</svg>
									</div>
									<div className="text-white text-sm font-medium">{item.label}</div>
								</div>
							))}
						</div>
					</div>

					{/* Omnichannel Inbox Card */}
					<div className="bg-white rounded-3xl p-8 border border-slate-200">
						<div className="mb-6">
							<h3 className="text-2xl font-bold text-slate-900 mb-4">{dict.inboxTitle}</h3>
							<p className="text-slate-600 mb-6">{dict.inboxDescription}</p>
							<a href="#" className="inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-700 transition-colors">
								{dict.discoverInbox}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
						</div>
						<div className="bg-slate-50 rounded-2xl p-4 space-y-2">
							<div className="font-bold text-slate-900 mb-3">{dict.inboxLabel}</div>
							{[
								{ name: "WhatsApp", color: "bg-green-500", letter: "W" },
								{ name: "Instagram", color: "bg-gradient-to-br from-purple-500 to-pink-500", letter: "I" },
								{ name: "Facebook", color: "bg-blue-600", letter: "F" },
							].map((ch) => (
								<div key={ch.name} className="flex items-center justify-between p-2 bg-white rounded-lg">
									<div className="flex items-center gap-2">
										<div className={`w-6 h-6 ${ch.color} rounded-full flex items-center justify-center`}>
											<span className="text-white text-xs">{ch.letter}</span>
										</div>
										<span className="text-sm font-medium">{ch.name}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* AI Journeys Section */}
				<div className="grid lg:grid-cols-2 gap-8 items-center bg-slate-900 rounded-3xl overflow-hidden">
					<div className="p-8 lg:p-12">
						<h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{dict.journeysTitle}</h3>
						<p className="text-slate-300 mb-6 leading-relaxed">{dict.journeysDescription}</p>
						<a href="#" className="inline-flex items-center gap-2 text-brand-400 font-semibold hover:text-brand-300 transition-colors">
							{dict.discoverJourneys}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>
					<div className="bg-gradient-to-br from-teal-400 to-cyan-500 p-8 min-h-[300px] flex items-center justify-center">
						<div className="bg-white rounded-2xl p-4 shadow-xl max-w-xs">
							<div className="flex items-center gap-2 mb-4">
								<div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-orange-600"><rect width="8" height="8" x="3" y="3" rx="2" /><path d="M7 11v4a2 2 0 0 0 2 2h4" /><rect width="8" height="8" x="13" y="13" rx="2" /></svg>
								</div>
								<div>
									<div className="font-semibold text-sm">{dict.aiRouting}</div>
									<div className="text-xs text-slate-500">{dict.intents}</div>
								</div>
							</div>
							<div className="flex gap-8 justify-center my-4">
								<div className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">{dict.support}</div>
								<div className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-medium">{dict.sales}</div>
							</div>
							<div className="grid grid-cols-2 gap-3 mt-4">
								<div className="bg-slate-50 rounded-xl p-3">
									<div className="flex items-center gap-2 mb-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-600"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
										<span className="text-xs font-medium">{dict.aiHelpmate}</span>
									</div>
									<div className="text-xs text-slate-500">{dict.supportBot}</div>
								</div>
								<div className="bg-slate-50 rounded-xl p-3">
									<div className="flex items-center gap-2 mb-1">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-600"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
										<span className="text-xs font-medium">{dict.assignToTeam}</span>
									</div>
									<div className="text-xs text-slate-500">{dict.sales}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
