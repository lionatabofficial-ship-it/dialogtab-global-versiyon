"use client";

import { useState } from "react";

const tabs = [
	{
		id: "order",
		label: "Get Order On WhatsApp",
		icon: <><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></>,
		title: "Get Order On WhatsApp",
		description: "Manage the cart behalf of users. Get the payment on WhatsApp Business.",
		features: ["Manage cart on behalf of users", "Get payment on WhatsApp Business", "Order confirmation & tracking", "Automated order updates"],
		cta: "Explore All E-commerce Features",
		ctaHref: "https://dialogtab.com/ecommerce",
		stats: [
			{ value: "+35%", label: "Order Conversion" },
			{ value: "28%", label: "Cart Recovery" },
			{ value: "94%", label: "Customer Satisfaction" },
		],
	},
	{
		id: "search",
		label: "Search & Identify Product",
		icon: <><path d="m21 21-4.34-4.34" /><circle cx="11" cy="11" r="8" /></>,
		title: "Search & Identify Product",
		description: "Search products, share product cards, and identify products from images.",
		features: ["Product search in chat", "Share product cards", "Image recognition", "Real-time availability"],
		cta: "Learn More",
		ctaHref: "#pricing",
		stats: [
			{ value: "5x", label: "Faster Search" },
			{ value: "89%", label: "Match Rate" },
			{ value: "2s", label: "Response Time" },
		],
	},
	{
		id: "multichannel",
		label: "Multi-Channel",
		icon: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
		title: "Multi-Channel with WhatsApp",
		description: "All chat platforms in one screen — WhatsApp, Instagram, Messenger, and Live Chat unified.",
		features: ["WhatsApp Business API", "Instagram Direct Messages", "Facebook Messenger", "Live Chat widget"],
		cta: "Explore Channels",
		ctaHref: "#",
		stats: [
			{ value: "5+", label: "Channels" },
			{ value: "1", label: "Unified Inbox" },
			{ value: "100%", label: "Coverage" },
		],
	},
	{
		id: "multiagent",
		label: "Multi-Agent",
		icon: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></>,
		title: "Multi-Agent on WhatsApp",
		description: "Enable multiple sales agents to work simultaneously, assign conversations, and collaborate.",
		features: ["Multiple agents on one number", "Auto-assign conversations", "Team collaboration", "Agent performance tracking"],
		cta: "Learn More",
		ctaHref: "#",
		stats: [
			{ value: "∞", label: "Agents" },
			{ value: "Auto", label: "Assignment" },
			{ value: "Real-time", label: "Collaboration" },
		],
	},
	{
		id: "track",
		label: "Track Performance",
		icon: <><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></>,
		title: "Track & Analyze Sales Performance",
		description: "Monitor agent performance with real-time analytics and conversion metrics.",
		features: ["Agent performance tracking", "Real-time conversion metrics", "Google Analytics integration", "Custom filtering and reporting"],
		cta: "View Analytics Features",
		ctaHref: "#pricing",
		stats: [
			{ value: "360°", label: "Analytics View" },
			{ value: "Real-time", label: "Tracking" },
			{ value: "Custom", label: "Reports" },
		],
	},
];

export default function Features() {
	const [activeTab, setActiveTab] = useState("order");
	const active = tabs.find((t) => t.id === activeTab) || tabs[0];

	return (
		<section className="py-20 bg-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block bg-brand-100 text-brand-700 text-sm font-bold px-4 py-2 rounded-full mb-4">FEATURES</span>
					<h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Start Selling in <span className="gradient-text">WhatsApp</span></h2>
					<p className="text-lg text-slate-600">Power-up your experts through WhatsApp to increase sales.</p>
				</div>

				<div className="flex flex-wrap justify-center gap-2 mb-12">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
								activeTab === tab.id
									? "bg-brand-600 text-white shadow-lg shadow-brand-500/30"
									: "bg-slate-100 text-slate-700 hover:bg-slate-200"
							}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">{tab.icon}</svg>
							{tab.label}
						</button>
					))}
				</div>

				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-3xl font-bold text-slate-900 mb-6">{active.title}</h3>
						<p className="text-lg text-slate-600 mb-8 leading-relaxed">{active.description}</p>
						<div className="space-y-4 mb-8">
							{active.features.map((feat) => (
								<div key={feat} className="flex items-start gap-3">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
									<span className="text-slate-700">{feat}</span>
								</div>
							))}
						</div>
						<a href={active.ctaHref} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
							{active.cta}
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
						</a>
					</div>

					<div className="relative">
						<div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-8 border border-slate-200">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">{active.icon}</svg>
								</div>
								<h4 className="text-xl font-bold text-slate-900">{active.title}</h4>
							</div>
							<div className="grid grid-cols-3 gap-4">
								{active.stats.map((stat) => (
									<div key={stat.label} className="bg-white rounded-xl p-4 text-center border border-slate-200 shadow-sm">
										<div className="text-2xl font-bold text-brand-600 mb-1">{stat.value}</div>
										<div className="text-xs text-slate-500">{stat.label}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
