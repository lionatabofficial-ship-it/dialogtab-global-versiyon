"use client";

import { useState } from "react";

const channels = [
	{ name: "WhatsApp", color: "bg-green-100 text-green-700" },
	{ name: "Messenger", color: "bg-blue-100 text-blue-700" },
	{ name: "Instagram", color: "bg-pink-100 text-pink-700" },
	{ name: "Live Chat", color: "bg-indigo-100 text-indigo-700" },
	{ name: "Telegram", color: "bg-sky-100 text-sky-700" },
];

const ecommerce = [
	"Shopify",
	"WooCommerce",
	"BigCommerce",
	"Magento",
	"OpenCart",
	"TSoft",
	"Ticimax",
	"PrestaShop",
	"Faprika",
	"Akinon",
	"Inveon",
];

const payments = [
	{ name: "Stripe", color: "bg-purple-100 text-purple-700" },
	{ name: "Mastercard", color: "bg-red-100 text-red-700" },
	{ name: "PayU", color: "bg-green-100 text-green-700" },
];

export default function Integrations() {
	const [showAllEcommerce, setShowAllEcommerce] = useState(false);
	const visibleEcommerce = showAllEcommerce ? ecommerce : ecommerce.slice(0, 6);

	return (
		<section className="py-20 bg-white">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center mb-16">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Integrations
					</h2>
					<p className="mt-4 text-lg text-gray-600">
						Connect all your channels and platforms in one place
					</p>
				</div>

				<div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
					{/* Channels */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Channels</h3>
						<div className="flex flex-wrap gap-3">
							{channels.map((ch) => (
								<span
									key={ch.name}
									className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${ch.color}`}
								>
									{ch.name}
								</span>
							))}
						</div>
					</div>

					{/* E-Commerce Platforms */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							E-Commerce Platforms
						</h3>
						<div className="flex flex-wrap gap-3">
							{visibleEcommerce.map((name) => (
								<span
									key={name}
									className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-gray-100 text-gray-700"
								>
									{name}
								</span>
							))}
						</div>
						{ecommerce.length > 6 && (
							<button
								onClick={() => setShowAllEcommerce(!showAllEcommerce)}
								className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
							>
								{showAllEcommerce ? "Show Less" : `+${ecommerce.length - 6} More`}
							</button>
						)}
					</div>

					{/* Payment Processors */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							Payment Processors
						</h3>
						<div className="flex flex-wrap gap-3">
							{payments.map((p) => (
								<span
									key={p.name}
									className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${p.color}`}
								>
									{p.name}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
