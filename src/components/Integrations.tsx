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
	{ name: "T-Soft", image: "/images/tsoft.webp" },
	{ name: "Ticimax", image: "/images/ticimax.jpg" },
	{ name: "PrestaShop", image: "/images/prestashop.webp" },
];

const payments = [
	{ name: "Stripe", image: "/images/stripe.webp" },
	{ name: "Mastercard", image: "/images/mastercard.png" },
	{ name: "PayU", image: "/images/payu.webp" },
];

export default function Integrations() {
	return (
		<section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fff' fill-opacity='0.1'%3E%3Cpath d='M36 16c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-center max-w-3xl mx-auto mb-16">
					<span className="inline-block bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-full mb-4 backdrop-blur-sm">SUPPORTED PLATFORMS</span>
					<h2 className="text-3xl md:text-5xl font-bold mb-6">Increase your customer experience by <span className="text-brand-400">integrate</span></h2>
					<p className="text-lg text-slate-300">Increase your customer experience by integrate with the applications what you like and need.</p>
				</div>

				{/* Channels */}
				<div className="mb-12">
					<h3 className="text-center text-xl font-bold mb-6 text-slate-300">Channels</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{channels.map((ch) => (
							<div key={ch.name} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 transition-all cursor-pointer w-28">
								<Image alt={ch.name} className="w-12 h-12 object-contain mb-3 group-hover:scale-110 transition-transform" src={ch.image} width={48} height={48} />
								<span className="text-sm font-medium text-center">{ch.name}</span>
							</div>
						))}
					</div>
				</div>

				{/* E-Commerce */}
				<div className="mb-12">
					<h3 className="text-center text-xl font-bold mb-6 text-slate-300">E-Commerce</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{ecommerce.map((item) => (
							<div key={item.name} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 transition-all cursor-pointer w-28">
								<Image alt={item.name} className="w-10 h-10 object-contain mb-2 group-hover:scale-110 transition-transform" src={item.image} width={40} height={40} />
								<span className="text-xs font-medium text-center">{item.name}</span>
							</div>
						))}
					</div>
				</div>

				{/* Payment */}
				<div className="mb-12">
					<h3 className="text-center text-xl font-bold mb-6 text-slate-300">Payment</h3>
					<div className="flex flex-wrap justify-center gap-4">
						{payments.map((p) => (
							<div key={p.name} className="group bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center hover:bg-white/10 transition-all cursor-pointer w-32">
								<Image alt={p.name} className="h-8 object-contain mb-3 group-hover:scale-110 transition-transform" src={p.image} width={80} height={32} />
								<span className="text-sm font-medium">{p.name}</span>
							</div>
						))}
					</div>
				</div>

				<div className="text-center">
					<a href="https://dialogtab.com/integrations" className="bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-sm inline-flex items-center gap-2 hover:bg-brand-600 transition-all hover:-translate-y-0.5 shadow-lg">
						All Integrations
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
					</a>
				</div>
			</div>
		</section>
	);
}
