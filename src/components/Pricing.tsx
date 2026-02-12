"use client";

import { useState } from "react";

const plans = [
	{
		name: "Start",
		monthlyPrice: 30,
		annualPrice: 24,
		features: [
			"1 Channel",
			"Email support",
			"3-month data retention",
			"Basic analytics",
		],
		cta: "Try Free",
		highlighted: false,
	},
	{
		name: "Grow",
		monthlyPrice: 45,
		annualPrice: 36,
		badge: "Best",
		features: [
			"3 Channels",
			"WhatsApp Business API ($49/mo)",
			"Groups & Labels",
			"Product Search",
			"6-month data retention",
		],
		cta: "Try Free",
		highlighted: true,
	},
	{
		name: "Scale",
		monthlyPrice: 60,
		annualPrice: 48,
		features: [
			"Full e-commerce features",
			"API access",
			"Phone support",
			"12-month data retention",
			"Advanced analytics",
		],
		cta: "Try Free",
		highlighted: false,
	},
];

export default function Pricing() {
	const [annual, setAnnual] = useState(false);

	return (
		<section id="pricing" className="py-20 bg-white">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Simple, transparent pricing
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Choose the plan that fits your business
					</p>

					{/* Billing Toggle */}
					<div className="mt-8 flex items-center justify-center gap-4">
						<span className={`text-sm font-medium ${!annual ? "text-gray-900" : "text-gray-500"}`}>
							Monthly
						</span>
						<button
							onClick={() => setAnnual(!annual)}
							className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
								annual ? "bg-blue-600" : "bg-gray-300"
							}`}
						>
							<span
								className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
									annual ? "translate-x-6" : "translate-x-1"
								}`}
							/>
						</button>
						<span className={`text-sm font-medium ${annual ? "text-gray-900" : "text-gray-500"}`}>
							Annually{" "}
							<span className="text-green-600 text-xs font-semibold">Save 20%</span>
						</span>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:max-w-5xl lg:mx-auto">
					{plans.map((plan) => (
						<div
							key={plan.name}
							className={`relative rounded-2xl p-8 ${
								plan.highlighted
									? "bg-blue-600 text-white shadow-xl scale-105 border-2 border-blue-600"
									: "bg-white text-gray-900 shadow-sm border border-gray-200"
							}`}
						>
							{plan.badge && (
								<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-green-500 px-4 py-1 text-xs font-semibold text-white">
									{plan.badge}
								</span>
							)}
							<h3 className={`text-lg font-semibold ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
								{plan.name}
							</h3>
							<div className="mt-4 flex items-baseline gap-1">
								<span className="text-4xl font-bold">
									${annual ? plan.annualPrice : plan.monthlyPrice}
								</span>
								<span className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-gray-500"}`}>
									/agent/mo
								</span>
							</div>
							<ul className="mt-6 space-y-3">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-start gap-2">
										<svg
											className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
												plan.highlighted ? "text-blue-200" : "text-green-500"
											}`}
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										<span className={`text-sm ${plan.highlighted ? "text-blue-50" : "text-gray-600"}`}>
											{feature}
										</span>
									</li>
								))}
							</ul>
							<a
								href="https://app.dialogtab.com/register"
								className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
									plan.highlighted
										? "bg-white text-blue-600 hover:bg-blue-50"
										: "bg-blue-600 text-white hover:bg-blue-700"
								}`}
							>
								{plan.cta}
							</a>
						</div>
					))}
				</div>

				{/* Enterprise */}
				<div className="mt-12 text-center">
					<div className="inline-flex flex-col items-center rounded-2xl border border-gray-200 p-8 bg-gray-50">
						<h3 className="text-xl font-semibold text-gray-900">Enterprise</h3>
						<p className="mt-2 text-gray-600">
							Need a custom solution? Let&apos;s build the perfect plan for your business.
						</p>
						<a
							href="#contact"
							className="mt-4 rounded-full border-2 border-blue-600 px-6 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
						>
							Contact Us
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
