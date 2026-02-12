import Image from "next/image";

const steps = [
	{
		numberImage: "/images/one.svg",
		title: "Register",
		description:
			"Sign up for a membership, select your trial, and choose the right package for your business.",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
			</svg>
		),
	},
	{
		numberImage: "/images/two.svg",
		title: "Connect Channels",
		description:
			"Connect your WhatsApp Business API, Web, Messenger, and Live Chat channels seamlessly.",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
			</svg>
		),
	},
	{
		numberImage: "/images/three.svg",
		title: "Go Live",
		description:
			"Grant expert access and start processing orders. Your team is ready to sell!",
		icon: (
			<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
		),
	},
];

export default function GettingStarted() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Go Live With Three Simple Steps
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Get started in minutes and begin selling on WhatsApp
					</p>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
					{steps.map((step, index) => (
						<div
							key={index}
							className="relative text-center bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
						>
							<div className="absolute top-4 right-6">
								<Image
									src={step.numberImage}
									alt={`Step ${index + 1}`}
									width={48}
									height={48}
									className="w-12 h-12 opacity-60"
								/>
							</div>
							<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
								{step.icon}
							</div>
							<h3 className="text-xl font-semibold text-gray-900">
								{step.title}
							</h3>
							<p className="mt-3 text-gray-600 leading-6">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
