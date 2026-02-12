"use client";

import { useState } from "react";
import Image from "next/image";

const channels = [
	{ name: "WhatsApp", image: "/images/whatsapp.webp" },
	{ name: "Messenger", image: "/images/messenger.webp" },
	{ name: "Instagram", image: "/images/instagram.webp" },
	{ name: "Live Chat", image: "/images/livechat.svg" },
	{ name: "Telegram", image: "/images/telegram.png" },
];

const ecommerce = [
	{ name: "Shopify", image: "/images/shopify.webp" },
	{ name: "WooCommerce", image: "/images/woocommerce.png" },
	{ name: "BigCommerce", image: "/images/bigcommerce.webp" },
	{ name: "Magento", image: "/images/magento.png" },
	{ name: "OpenCart", image: "/images/opencart.webp" },
	{ name: "TSoft", image: "/images/tsoft.webp" },
	{ name: "Ticimax", image: "/images/ticimax.jpg" },
	{ name: "PrestaShop", image: "/images/prestashop.webp" },
	{ name: "Faprika", image: "/images/faprika.png" },
	{ name: "Akinon", image: "/images/akinon.webp" },
	{ name: "Inveon", image: "/images/inveon.webp" },
];

const payments = [
	{ name: "Stripe", image: "/images/stripe.webp" },
	{ name: "Mastercard", image: "/images/mastercard.png" },
	{ name: "PayU", image: "/images/payu.webp" },
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
						<div className="flex flex-wrap gap-4">
							{channels.map((ch) => (
								<div
									key={ch.name}
									className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-4 py-2"
								>
									<Image
										src={ch.image}
										alt={ch.name}
										width={24}
										height={24}
										className="w-6 h-6 object-contain"
									/>
									<span className="text-sm font-medium text-gray-700">{ch.name}</span>
								</div>
							))}
						</div>
					</div>

					{/* E-Commerce Platforms */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-4">
							E-Commerce Platforms
						</h3>
						<div className="flex flex-wrap gap-4">
							{visibleEcommerce.map((item) => (
								<div
									key={item.name}
									className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-4 py-2"
								>
									<Image
										src={item.image}
										alt={item.name}
										width={24}
										height={24}
										className="w-6 h-6 object-contain"
									/>
									<span className="text-sm font-medium text-gray-700">{item.name}</span>
								</div>
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
						<div className="flex flex-wrap gap-4">
							{payments.map((p) => (
								<div
									key={p.name}
									className="flex items-center gap-2 rounded-full bg-gray-50 border border-gray-200 px-4 py-2"
								>
									<Image
										src={p.image}
										alt={p.name}
										width={24}
										height={24}
										className="w-6 h-6 object-contain"
									/>
									<span className="text-sm font-medium text-gray-700">{p.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
