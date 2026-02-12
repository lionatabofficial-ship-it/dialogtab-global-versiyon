import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-white border-t border-slate-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
					<div className="col-span-2">
						<Link href="/" className="flex items-center gap-3 mb-4">
							<Image alt="DialogTab" className="h-8 w-auto" src="/images/dialogtab.webp" width={160} height={32} />
							<span className="text-xl font-bold text-slate-900">DialogTab</span>
						</Link>
						<p className="text-slate-600 text-sm mb-4">&copy; 2012-2024</p>
						<div className="flex items-center gap-3">
							<a href="http://linkedin.com/company/dialogtab" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-brand-100 hover:text-brand-600 transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
							</a>
							<a href="https://www.facebook.com/DialogTab-103427578055913/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-brand-100 hover:text-brand-600 transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
							</a>
						</div>
					</div>

					<div>
						<h4 className="font-bold text-slate-900 mb-4">About</h4>
						<ul className="space-y-2">
							<li><Link href="/locations" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Locations</Link></li>
							<li><Link href="/contact" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Contact Us</Link></li>
							<li><Link href="/privacy-policy" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
							<li><Link href="/terms-of-service" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Terms of Service</Link></li>
							<li><Link href="/refund-policy" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Refund Policy</Link></li>
						</ul>
					</div>

					<div>
						<h4 className="font-bold text-slate-900 mb-4">Menu</h4>
						<ul className="space-y-2">
							<li><a href="https://dialogtab.com/integrations" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Integrations</a></li>
							<li><a href="https://dialogtab.com/whatsApp-chrome-extension-for-multiagent" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Extension</a></li>
							<li><a href="https://dialogtab.com/livechat-for-ecommerce" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Ecommerce</a></li>
							<li><Link href="#pricing" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Pricing</Link></li>
							<li><Link href="/blog" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">Blog</Link></li>
						</ul>
					</div>

					<div>
						<h4 className="font-bold text-slate-900 mb-4">Other Projects</h4>
						<ul className="space-y-2">
							<li><a href="https://retentiontab.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-brand-600 transition-colors">RetentionTab</a></li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
}
