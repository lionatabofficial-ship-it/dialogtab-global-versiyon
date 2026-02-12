export default function StatsSection() {
	return (
		<section className="py-20 bg-slate-900 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid md:grid-cols-3 gap-12 mb-16">
					<div>
						<div className="text-5xl md:text-6xl font-bold text-brand-400 mb-4">80%</div>
						<div className="text-lg font-semibold mb-2">of repetitive conversations resolved</div>
						<p className="text-slate-400">In an instant with the AI Agent. This AI agent has the power to lighten the workload.</p>
					</div>
					<div>
						<div className="text-5xl md:text-6xl font-bold text-brand-400 mb-4">3x</div>
						<div className="text-lg font-semibold mb-2">faster resolution time</div>
						<p className="text-slate-400">AI Journeys will bring leads and customers to their answers, fast.</p>
					</div>
					<div>
						<div className="text-5xl md:text-6xl font-bold text-brand-400 mb-4">98%</div>
						<div className="text-lg font-semibold mb-2">WhatsApp open rate</div>
						<p className="text-slate-400">WhatsApp is a popular channel. You&apos;ll see that reflected in your engagement metrics.</p>
					</div>
				</div>

				<div className="bg-gradient-to-r from-brand-500 to-purple-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
					<div>
						<h3 className="text-2xl md:text-3xl font-bold mb-2">Experience DialogTab</h3>
						<p className="text-white/80">See how you can reach and service leads and customers better with an AI-first omnichannel inbox.</p>
					</div>
					<div className="flex gap-4 mt-6 md:mt-0">
						<a href="#" className="bg-white text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-100 transition-colors">Book a demo</a>
						<a href="https://app.dialogtab.com/register" className="bg-brand-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-800 transition-colors flex items-center gap-2">
							Try for free
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
