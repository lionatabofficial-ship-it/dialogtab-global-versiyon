import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "DialogTab",
		url: "https://dialogtab.com",
		logo: "https://dialogtab.com/images/dialogtab.webp",
		description:
			"DialogTab is a conversational commerce platform that helps businesses sell, support and engage customers through WhatsApp, Instagram, Facebook Messenger and more.",
		foundingDate: "2012",
		sameAs: [
			"https://www.linkedin.com/company/dialogtab",
			"https://www.facebook.com/DialogTab-103427578055913/",
		],
		contactPoint: {
			"@type": "ContactPoint",
			contactType: "customer support",
			url: "https://dialogtab.com/contact",
			availableLanguage: ["English", "Turkish"],
		},
		offers: {
			"@type": "AggregateOffer",
			priceCurrency: "USD",
			lowPrice: "0",
			highPrice: "199",
			offerCount: "3",
		},
	};

	const jsonLdSoftware = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "DialogTab",
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		description:
			"Omnichannel conversational commerce platform for WhatsApp Business API, Instagram, Facebook Messenger, Telegram and live chat.",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.8",
			ratingCount: "120",
		},
	};

	return (
		<footer className="bg-white border-t border-slate-100" role="contentinfo" itemScope itemType="https://schema.org/WPFooter">
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
					{/* Brand Column */}
					<div className="col-span-2">
						<Link href="/" className="flex items-center gap-3 mb-4" aria-label="DialogTab - Home">
							<Image alt="DialogTab Logo" className="h-8 w-auto" src="/images/dialogtab.webp" width={160} height={32} />
							<span className="text-xl font-bold text-slate-900">DialogTab</span>
						</Link>
						<p className="text-slate-600 text-sm mb-2">
							Conversational commerce platform for WhatsApp Business API. Automate sales, support &amp; engagement across all messaging channels.
						</p>
						<p className="text-slate-500 text-xs mb-4">&copy; 2012-{new Date().getFullYear()} DialogTab. All rights reserved.</p>
						<div className="flex items-center gap-3" aria-label="Social media links">
							<a href="https://www.linkedin.com/company/dialogtab" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-brand-100 hover:text-brand-600 transition-colors" aria-label="Follow DialogTab on LinkedIn">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
							</a>
							<a href="https://www.facebook.com/DialogTab-103427578055913/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-brand-100 hover:text-brand-600 transition-colors" aria-label="Follow DialogTab on Facebook">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
							</a>
							<a href="https://x.com/dialogtab" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-brand-100 hover:text-brand-600 transition-colors" aria-label="Follow DialogTab on X (Twitter)">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
							</a>
							<a href="https://www.instagram.com/dialogtab/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-brand-100 hover:text-brand-600 transition-colors" aria-label="Follow DialogTab on Instagram">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
							</a>
						</div>
					</div>

					{/* About Column */}
					<nav aria-label="About">
						<h4 className="font-bold text-slate-900 mb-4">About</h4>
						<ul className="space-y-2">
							<li><Link href="/locations" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Locations</Link></li>
							<li><Link href="/contact" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Contact Us</Link></li>
							<li><Link href="/privacy-policy" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
							<li><Link href="/terms-of-service" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Terms of Service</Link></li>
							<li><Link href="/refund-policy" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Refund Policy</Link></li>
						</ul>
					</nav>

					{/* Solutions Column */}
					<nav aria-label="Solutions">
						<h4 className="font-bold text-slate-900 mb-4">Solutions</h4>
						<ul className="space-y-2">
							<li><a href="https://dialogtab.com/integrations" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Integrations</a></li>
							<li><a href="https://dialogtab.com/whatsApp-chrome-extension-for-multiagent" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Chrome Extension</a></li>
							<li><a href="https://dialogtab.com/livechat-for-ecommerce" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Ecommerce Live Chat</a></li>
							<li><Link href="#features" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">AI Chatbot</Link></li>
							<li><Link href="#features" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Omnichannel Inbox</Link></li>
						</ul>
					</nav>

					{/* Resources Column */}
					<nav aria-label="Resources">
						<h4 className="font-bold text-slate-900 mb-4">Resources</h4>
						<ul className="space-y-2">
							<li><Link href="/blog" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Blog</Link></li>
							<li><Link href="#pricing" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Pricing</Link></li>
							<li><a href="https://dialogtab.com/integrations" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">API Documentation</a></li>
							<li><a href="https://app.dialogtab.com/register" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Free Trial</a></li>
						</ul>
					</nav>

					{/* Other Projects Column */}
					<div>
						<h4 className="font-bold text-slate-900 mb-4">Other Projects</h4>
						<ul className="space-y-2">
							<li><a href="https://retentiontab.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">RetentionTab</a></li>
						</ul>

						<h4 className="font-bold text-slate-900 mb-4 mt-8">Channels</h4>
						<ul className="space-y-2">
							<li><span className="text-sm text-slate-600">WhatsApp Business</span></li>
							<li><span className="text-sm text-slate-600">Instagram DM</span></li>
							<li><span className="text-sm text-slate-600">Facebook Messenger</span></li>
							<li><span className="text-sm text-slate-600">Telegram</span></li>
							<li><span className="text-sm text-slate-600">Live Chat</span></li>
						</ul>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-xs text-slate-500">
						DialogTab is an official <strong>WhatsApp Business Solution Provider</strong>. All trademarks belong to their respective owners.
					</p>
					<div className="flex items-center gap-6">
						<Link href="/privacy-policy" className="text-xs text-slate-500 hover:text-brand-600 transition-colors">Privacy</Link>
						<Link href="/terms-of-service" className="text-xs text-slate-500 hover:text-brand-600 transition-colors">Terms</Link>
						<Link href="/refund-policy" className="text-xs text-slate-500 hover:text-brand-600 transition-colors">Refunds</Link>
						<Link href="/contact" className="text-xs text-slate-500 hover:text-brand-600 transition-colors">Contact</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
