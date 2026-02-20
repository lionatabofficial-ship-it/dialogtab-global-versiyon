import Image from "next/image";

export interface IndustrySectionDict {
	titleStart: string;
	titleHighlight: string;
	subtitle: string;
	industries: {
		title: string;
		description: string;
		cta: string;
	}[];
}

const industryConfig = [
	{
		type: "icon" as const,
		icon: <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>,
	},
	{
		type: "image" as const,
		image: "/images/tatil.jpg",
	},
	{
		type: "image" as const,
		image: "/images/otomotiv.jpg",
	},
	{
		type: "icon" as const,
		icon: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
	},
	{
		type: "icon" as const,
		icon: <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" /></>,
	},
	{
		type: "image" as const,
		image: "/images/booking.jpg",
	},
];

export default function IndustrySection({ dict }: { dict: IndustrySectionDict }) {
	const industries = dict.industries.map((ind, i) => ({
		...industryConfig[i],
		title: ind.title,
		description: ind.description,
		cta: ind.cta,
	}));

	return (
		<section className="py-20 bg-[#f8f8f6]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-8 mb-16">
					<div>
						<h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight">
							{dict.titleStart} <em className="not-italic text-brand-600">{dict.titleHighlight}</em>
						</h2>
					</div>
					<div className="flex items-center">
						<p className="text-lg text-slate-600">{dict.subtitle}</p>
					</div>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{industries.map((item) => (
						<div key={item.title} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer">
							{item.type === "icon" ? (
								<div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-600 group-hover:text-brand-600">{item.icon}</svg>
								</div>
							) : (
								<div className="mb-4 rounded-2xl overflow-hidden">
									<Image alt={item.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" src={item.image!} width={400} height={160} />
								</div>
							)}
							<h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
							<p className="text-slate-600 mb-4">{item.description}</p>
							<a href="#" className="inline-flex items-center gap-2 text-slate-900 font-semibold group-hover:text-brand-600 transition-colors">
								{item.cta}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
