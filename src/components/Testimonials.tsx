interface TestimonialItem {
	quote: string;
	author: string;
	role: string;
	initials: string;
}

interface TestimonialsDict {
	badge: string;
	title: string;
	titleHighlight: string;
	subtitle: string;
	items: TestimonialItem[];
}

const cardStyles = [
	{ gradient: "from-blue-50 to-white", border: "border-blue-100", avatar: "from-blue-400 to-blue-600" },
	{ gradient: "from-purple-50 to-white", border: "border-purple-100", avatar: "from-purple-400 to-purple-600" },
	{ gradient: "from-green-50 to-white", border: "border-green-100", avatar: "from-green-400 to-green-600" },
	{ gradient: "from-orange-50 to-white", border: "border-orange-100", avatar: "from-orange-400 to-orange-600" },
	{ gradient: "from-rose-50 to-white", border: "border-rose-100", avatar: "from-rose-400 to-rose-600" },
	{ gradient: "from-teal-50 to-white", border: "border-teal-100", avatar: "from-teal-400 to-teal-600" },
];

const starIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>
);

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
	return (
		<section id="referanslar" className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block bg-brand-100 text-brand-700 text-sm font-bold px-4 py-2 rounded-full mb-4">{dict.badge}</span>
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
						{dict.title} <span className="text-brand-500">{dict.titleHighlight}</span>
					</h2>
					<p className="text-lg text-slate-600">{dict.subtitle}</p>
				</div>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{dict.items.map((item, i) => {
						const style = cardStyles[i % cardStyles.length];
						return (
							<div key={i} className={`bg-gradient-to-br ${style.gradient} p-8 rounded-2xl border ${style.border} hover:shadow-lg transition-all duration-300`}>
								<div className="flex gap-1 mb-4">
									{starIcon}{starIcon}{starIcon}{starIcon}{starIcon}
								</div>
								<p className="text-slate-700 mb-6 leading-relaxed">
									&ldquo;{item.quote}&rdquo;
								</p>
								<div className="flex items-center gap-3">
									<div className={`w-12 h-12 bg-gradient-to-br ${style.avatar} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
										{item.initials}
									</div>
									<div>
										<div className="font-bold text-slate-900">{item.author}</div>
										<div className="text-sm text-slate-500">{item.role}</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
