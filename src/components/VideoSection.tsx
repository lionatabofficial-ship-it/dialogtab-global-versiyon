export default function VideoSection() {
	return (
		<section className="py-20 bg-slate-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<span className="inline-block bg-brand-500/20 text-brand-400 text-sm font-bold px-4 py-2 rounded-full mb-4">WATCH HOW IT WORKS</span>
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-6">See DialogTab in action</h2>
					<p className="text-lg text-slate-400 max-w-2xl mx-auto">Watch how DialogTab helps teams deliver exceptional customer experiences across all channels.</p>
				</div>

				<div className="relative max-w-5xl mx-auto">
					<div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-800">
						<video className="w-full aspect-video object-cover" poster="/images/mainpage.png">
							<source src="/images/video.mp4" type="video/mp4" />
						</video>
						<button className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group">
							<div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 md:w-10 md:h-10 text-brand-600 ml-1"><polygon points="6 3 20 12 6 21 6 3" /></svg>
							</div>
						</button>
					</div>
					<div className="absolute -top-4 -left-4 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl" />
					<div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
				</div>

				<div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-12 text-center">
					<div>
						<div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">2min</div>
						<div className="text-slate-400 text-sm">Setup time</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">5+</div>
						<div className="text-slate-400 text-sm">Channels supported</div>
					</div>
					<div>
						<div className="text-3xl md:text-4xl font-bold text-brand-400 mb-2">24/7</div>
						<div className="text-slate-400 text-sm">AI automation</div>
					</div>
				</div>
			</div>
		</section>
	);
}
