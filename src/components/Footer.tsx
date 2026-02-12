import Link from "next/link";
import Image from "next/image";

const footerLinks = {
	about: [
		{ name: "Contact Us", href: "#contact" },
		{ name: "Privacy Policy", href: "/privacy" },
		{ name: "Terms of Service", href: "/terms" },
		{ name: "Refund Policy", href: "/refund" },
	],
	menu: [
		{ name: "Integrations", href: "#integrations" },
		{ name: "Ecommerce", href: "#ecommerce" },
		{ name: "Pricing", href: "#pricing" },
	],
};

export default function Footer() {
	return (
		<footer id="contact" className="bg-gray-900 text-gray-400">
			<div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-1">
						<Link href="/" className="flex items-center gap-2">
							<Image
								src="/images/dialogtab.webp"
								alt="DialogTab"
								width={140}
								height={36}
								className="h-7 w-auto brightness-200"
							/>
						</Link>
						<p className="mt-4 text-sm leading-6">
							Conversational commerce platform that powers sales through WhatsApp.
						</p>
						{/* Social Links */}
						<div className="mt-6 flex gap-4">
							<a
								href="https://linkedin.com/company/dialogtab"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-white transition-colors"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
								</svg>
							</a>
							<a
								href="https://facebook.com/dialogtab"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:text-white transition-colors"
							>
								<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
							</a>
						</div>
					</div>

					{/* About */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							About
						</h3>
						<ul className="mt-4 space-y-3">
							{footerLinks.about.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Menu */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Menu
						</h3>
						<ul className="mt-4 space-y-3">
							{footerLinks.menu.map((link) => (
								<li key={link.name}>
									<Link
										href={link.href}
										className="text-sm hover:text-white transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter / CTA */}
					<div>
						<h3 className="text-sm font-semibold text-white uppercase tracking-wider">
							Get Started
						</h3>
						<p className="mt-4 text-sm">
							Start your 14-day free trial today.
						</p>
						<a
							href="https://app.dialogtab.com/register"
							className="mt-4 inline-block rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
						>
							Try for free
						</a>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
					<p>&copy; 2012-2024 DialogTab. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
