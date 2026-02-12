import Image from "next/image";

const showcases = [
	{
		title: "Simplify the purchasing process for customers",
		description:
			"Suggest products directly in chat, set and track sales goals, engage with visitors stuck at checkout, and upsell by offering complementary products.",
		features: [
			"Direct product suggestions in chat",
			"Sales goal setting and tracking",
			"Checkout abandonment recovery",
			"Upsell complementary products",
		],
		cta: "Explore All E-commerce Features",
		ctaHref: "#ecommerce",
		reversed: false,
		image: "/images/widget_blue_2.webp",
		imageAlt: "WhatsApp Commerce Widget",
	},
	{
		title: "Turn WhatsApp into your New Sales Channel",
		description:
			"Let your customers buy products on WhatsApp and finish the process on their favorite platform, while staying connected to upsell new products anytime.",
		features: [
			"Complete purchase flow on WhatsApp",
			"Cross-platform checkout integration",
			"Continuous customer engagement",
			"Real-time order management",
		],
		cta: "Learn More",
		ctaHref: "#pricing",
		reversed: true,
		image: "/images/tesettur_anasayfa.webp",
		imageAlt: "WhatsApp Sales Channel",
	},
	{
		title: "Track & Analyze Sales Performance",
		description:
			"Monitor agent performance with real-time analytics. Track conversion metrics, filter data, and integrate with Google Analytics for comprehensive insights.",
		features: [
			"Agent performance tracking",
			"Real-time conversion metrics",
			"Google Analytics integration",
			"Custom filtering and reporting",
		],
		cta: "View Analytics Features",
		ctaHref: "#pricing",
		reversed: false,
		image: "/images/analyticcards.webp",
		imageAlt: "Analytics Dashboard",
	},
];

export default function ProductShowcase() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
				{showcases.map((item, index) => (
					<div
						key={index}
						className={`flex flex-col gap-12 items-center ${
							item.reversed ? "lg:flex-row-reverse" : "lg:flex-row"
						}`}
					>
						{/* Text */}
						<div className="flex-1">
							<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
								{item.title}
							</h2>
							<p className="mt-4 text-lg text-gray-600 leading-8">
								{item.description}
							</p>
							<ul className="mt-6 space-y-3">
								{item.features.map((feat) => (
									<li key={feat} className="flex items-start gap-3">
										<svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
										<span className="text-gray-700">{feat}</span>
									</li>
								))}
							</ul>
							<a
								href={item.ctaHref}
								className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
							>
								{item.cta}
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>

						{/* Image */}
						<div className="flex-1 w-full">
							<div className="rounded-2xl bg-white shadow-lg border border-gray-200 overflow-hidden">
								<Image
									src={item.image}
									alt={item.imageAlt}
									width={600}
									height={400}
									className="w-full h-auto"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
