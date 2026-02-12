export default function GettingStarted() {
	const steps = [
		{
			number: "1",
			title: "Register",
			description: "Become a member in just a few seconds. Complete the trial version and select the perfect package.",
			icon: <><path d="m16 11 2 2 4-4" /><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></>,
		},
		{
			number: "2",
			title: "Connect Channels",
			description: "Choose your channels between WhatsApp Business API, WhatsApp Web, Messenger, Live Chat, or collect all and connect to the platform.",
			icon: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
		},
		{
			number: "3",
			title: "Go Live",
			description: "Give access to the experts and start to get orders immediately.",
			icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
		},
	];

	return (
		<section className="py-20 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white relative overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
				<div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center mb-16">
					<span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 backdrop-blur-sm">GET STARTED</span>
					<h2 className="text-3xl md:text-5xl font-bold mb-6">Go Live With Three Simple Steps</h2>
					<p className="text-lg text-white/80 max-w-2xl mx-auto">Ready to get started? It&apos;s easy and straightforward to set up your order channels to the platform!</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{steps.map((step, index) => (
						<div key={step.number} className="relative">
							<div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 h-full hover:bg-white/15 transition-all">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-600 font-bold text-2xl shadow-lg">{step.number}</div>
									<div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">{step.icon}</svg>
									</div>
								</div>
								<h3 className="text-xl font-bold mb-4">{step.title}</h3>
								<p className="text-white/80 leading-relaxed">{step.description}</p>
							</div>
							{index < 2 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30" />}
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<a href="https://app.dialogtab.com/register" className="inline-flex items-center gap-2 bg-white text-brand-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-all hover:-translate-y-0.5 shadow-lg">
						Start Free Trial
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
					</a>
				</div>
			</div>
		</section>
	);
}
