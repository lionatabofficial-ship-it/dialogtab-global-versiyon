import Image from "next/image";

export default function Hero() {
	return (
		<section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
						Power-up your experts through{" "}
						<span className="text-green-500">WhatsApp</span>{" "}
						to increase sales
					</h1>
					<p className="mt-6 text-lg text-gray-600 leading-8">
						DialogTab is a conversational commerce platform that automates receiving
						your orders and guiding your users to products via WhatsApp.
					</p>
					<div className="mt-10 flex flex-col items-center gap-4">
						<a
							href="https://app.dialogtab.com/register"
							className="rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-700 transition-all hover:shadow-xl"
						>
							Start Selling in WhatsApp
						</a>
						<div className="flex items-center gap-6 text-sm text-gray-500">
							<span className="flex items-center gap-1">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								14-day free trial
							</span>
							<span className="flex items-center gap-1">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								No credit card required
							</span>
							<span className="flex items-center gap-1">
								<svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								All features included
							</span>
						</div>
					</div>
				</div>

				{/* Hero Image */}
				<div className="mt-16 mx-auto max-w-5xl">
					<div className="rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden">
						<Image
							src="/images/conversational_commerce_with_whatsapp_image.webp"
							alt="Conversational Commerce with WhatsApp"
							width={1200}
							height={600}
							className="w-full h-auto"
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
