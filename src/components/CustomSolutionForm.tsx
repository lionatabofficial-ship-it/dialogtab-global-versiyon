"use client";

interface FormDict {
	title: string;
	subtitle: string;
	nameLabel: string;
	namePlaceholder: string;
	emailLabel: string;
	emailPlaceholder: string;
	phoneLabel: string;
	phonePlaceholder: string;
	websiteLabel: string;
	websitePlaceholder: string;
	messageLabel: string;
	messagePlaceholder: string;
	submitButton: string;
}

export default function CustomSolutionForm({ dict }: { dict: FormDict }) {
	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const name = fd.get("name") as string;
		const email = fd.get("email") as string;
		const phone = fd.get("phone") as string;
		const website = fd.get("website") as string;
		const message = fd.get("message") as string;

		const subject = encodeURIComponent(`Custom Solution Request - ${name}`);
		const body = encodeURIComponent(
			`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nWebsite: ${website}\n\nSolution Description:\n${message}`
		);

		window.location.href = `mailto:info@dialogtab.com?subject=${subject}&body=${body}`;
	}

	return (
		<section id="contact-form" className="py-20 bg-white">
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{dict.title}</h2>
					<p className="text-lg text-slate-600">{dict.subtitle}</p>
				</div>
				<form onSubmit={handleSubmit} className="bg-[#f8f8f6] rounded-3xl p-8 sm:p-10 space-y-6">
					<div className="grid sm:grid-cols-2 gap-6">
						<div>
							<label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">{dict.nameLabel}</label>
							<input type="text" id="name" name="name" required placeholder={dict.namePlaceholder} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900" />
						</div>
						<div>
							<label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">{dict.emailLabel}</label>
							<input type="email" id="email" name="email" required placeholder={dict.emailPlaceholder} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900" />
						</div>
					</div>
					<div className="grid sm:grid-cols-2 gap-6">
						<div>
							<label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">{dict.phoneLabel}</label>
							<input type="tel" id="phone" name="phone" placeholder={dict.phonePlaceholder} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900" />
						</div>
						<div>
							<label htmlFor="website" className="block text-sm font-semibold text-slate-700 mb-2">{dict.websiteLabel}</label>
							<input type="url" id="website" name="website" placeholder={dict.websitePlaceholder} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900" />
						</div>
					</div>
					<div>
						<label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">{dict.messageLabel}</label>
						<textarea id="message" name="message" rows={5} required placeholder={dict.messagePlaceholder} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all text-slate-900 resize-none" />
					</div>
					<button type="submit" className="w-full bg-brand-500 text-white py-4 rounded-full font-semibold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 text-base flex items-center justify-center gap-2">
						{dict.submitButton}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
					</button>
				</form>
			</div>
		</section>
	);
}
