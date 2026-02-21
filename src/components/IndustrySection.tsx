import Image from "next/image";
import Link from "next/link";

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

const sectorSlugs = ["insurance", "automotive", "hospitality", "wholesale", "e-commerce", "cosmetics", "health", "education"];

const industryConfig: ({ type: "icon"; icon: React.ReactNode } | { type: "image"; image: string })[] = [
	{
		type: "icon",
		icon: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
	},
	{
		type: "image",
		image: "/images/otomotiv.jpg",
	},
	{
		type: "image",
		image: "/images/tatil.jpg",
	},
	{
		type: "icon",
		icon: <><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></>,
	},
	{
		type: "icon",
		icon: <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>,
	},
	{
		type: "icon",
		icon: <><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /><path d="M8.5 8.5v.01" /><path d="M16 15.5v.01" /><path d="M12 12v.01" /><path d="M11 17v.01" /><path d="M7 14v.01" /></>,
	},
	{
		type: "icon",
		icon: <><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" /></>,
	},
	{
		type: "image",
		image: "/images/booking.jpg",
	},
];

export default function IndustrySection({ dict, locale }: { dict: IndustrySectionDict; locale: string }) {
	const industries = dict.industries.map((ind, i) => ({
		...industryConfig[i],
		title: ind.title,
		description: ind.description,
		cta: ind.cta,
		slug: sectorSlugs[i],
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

				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{industries.map((item) => (
						<Link key={item.title} href={`/${locale}/sectors/${item.slug}`} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all group cursor-pointer block">
							{item.type === "icon" ? (
								<div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-slate-600 group-hover:text-brand-600">{item.icon}</svg>
								</div>
							) : (
								<div className="mb-4 rounded-2xl overflow-hidden">
									<Image alt={item.title} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300" src={item.image!} width={400} height={128} />
								</div>
							)}
							<h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
							<p className="text-slate-600 text-sm mb-4">{item.description}</p>
							<span className="inline-flex items-center gap-2 text-slate-900 font-semibold text-sm group-hover:text-brand-600 transition-colors">
								{item.cta}
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
							</span>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
