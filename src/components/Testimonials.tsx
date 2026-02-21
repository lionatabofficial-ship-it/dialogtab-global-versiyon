"use client";

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

const cardColors = [
	{ bg: "bg-white", border: "border-blue-100", avatar: "from-blue-500 to-blue-700" },
	{ bg: "bg-white", border: "border-purple-100", avatar: "from-purple-500 to-purple-700" },
	{ bg: "bg-white", border: "border-green-100", avatar: "from-green-500 to-green-700" },
	{ bg: "bg-white", border: "border-orange-100", avatar: "from-orange-500 to-orange-700" },
	{ bg: "bg-white", border: "border-rose-100", avatar: "from-rose-500 to-rose-700" },
	{ bg: "bg-white", border: "border-teal-100", avatar: "from-teal-500 to-teal-700" },
];

function StarRating() {
	return (
		<div className="flex gap-0.5">
			{[...Array(5)].map((_, i) => (
				<svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
					<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
				</svg>
			))}
		</div>
	);
}

function TestimonialCard({ item, index }: { item: TestimonialItem; index: number }) {
	const style = cardColors[index % cardColors.length];
	return (
		<div className={`${style.bg} border ${style.border} rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 w-[340px] flex-shrink-0 mx-3`}>
			<StarRating />
			<p className="text-slate-700 text-sm leading-relaxed mt-4 mb-6 line-clamp-4">
				&ldquo;{item.quote}&rdquo;
			</p>
			<div className="flex items-center gap-3 pt-4 border-t border-slate-100">
				<div className={`w-10 h-10 bg-gradient-to-br ${style.avatar} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
					{item.initials}
				</div>
				<div>
					<div className="font-semibold text-slate-900 text-sm">{item.author}</div>
					<div className="text-xs text-slate-500">{item.role}</div>
				</div>
			</div>
		</div>
	);
}

export default function Testimonials({ dict }: { dict: TestimonialsDict }) {
	const items = dict.items;
	const doubled = [...items, ...items];

	return (
		<section id="referanslar" className="py-20 bg-slate-50 overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block bg-brand-100 text-brand-700 text-sm font-bold px-4 py-2 rounded-full mb-4">{dict.badge}</span>
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
						{dict.title} <span className="text-brand-500">{dict.titleHighlight}</span>
					</h2>
					<p className="text-lg text-slate-600">{dict.subtitle}</p>
				</div>
			</div>

			{/* Auto-scrolling marquee */}
			<div className="relative">
				{/* Fade edges */}
				<div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
				<div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

				<div className="flex animate-marquee hover:[animation-play-state:paused]">
					{doubled.map((item, i) => (
						<TestimonialCard key={`${item.author}-${i}`} item={item} index={i % items.length} />
					))}
				</div>
			</div>
		</section>
	);
}
