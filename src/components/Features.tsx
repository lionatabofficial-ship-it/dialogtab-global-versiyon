const features = [
	{
		title: "Get Order On WhatsApp",
		description:
			"Create a cart for your customer and receive payment directly on WhatsApp Business.",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
			</svg>
		),
		color: "bg-green-50 text-green-600",
	},
	{
		title: "Search & Identify Product",
		description:
			"Search products, share product cards, and identify products from images using image recognition.",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
		),
		color: "bg-blue-50 text-blue-600",
	},
	{
		title: "Multi-Channel with WhatsApp",
		description:
			"All chat platforms in one screen — WhatsApp, Instagram, Messenger, and Live Chat unified in DialogTab.",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
			</svg>
		),
		color: "bg-purple-50 text-purple-600",
	},
	{
		title: "Multi-Agent on WhatsApp",
		description:
			"Enable multiple sales agents to work on WhatsApp simultaneously, assign conversations, and collaborate.",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
			</svg>
		),
		color: "bg-orange-50 text-orange-600",
	},
];

export default function Features() {
	return (
		<section id="ecommerce" className="py-20 bg-white">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="relative rounded-2xl border border-gray-100 p-8 shadow-sm hover:shadow-md transition-shadow"
						>
							<div className={`inline-flex items-center justify-center rounded-xl p-3 ${feature.color}`}>
								{feature.icon}
							</div>
							<h3 className="mt-4 text-lg font-semibold text-gray-900">
								{feature.title}
							</h3>
							<p className="mt-2 text-sm text-gray-600 leading-6">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
