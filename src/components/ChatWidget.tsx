"use client";

import { useState } from "react";
import Image from "next/image";

export default function ChatWidget() {
	const [open, setOpen] = useState(false);

	return (
		<div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
			{/* Chat Panel */}
			{open && (
				<div className="w-[360px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4">
					{/* Header */}
					<div className="bg-gradient-to-r from-brand-600 to-brand-700 px-5 py-4 flex items-center gap-3">
						<div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
							<Image src="https://app.dialogtab.com/dialogtab.png" alt="DialogTab" width={24} height={24} className="rounded-full" unoptimized />
						</div>
						<div className="flex-1">
							<h3 className="text-white font-semibold text-sm">DialogTab</h3>
							<p className="text-white/80 text-xs">Typically replies within minutes</p>
						</div>
						<button
							onClick={() => setOpen(false)}
							className="text-white/80 hover:text-white transition-colors p-1"
							aria-label="Close chat"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
						</button>
					</div>

					{/* Body */}
					<div className="p-5 bg-slate-50 min-h-[200px]">
						<div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-[85%]">
							<p className="text-sm text-slate-700 leading-relaxed">
								Hi there! 👋 Welcome to DialogTab. How can we help you today?
							</p>
							<span className="text-xs text-slate-400 mt-2 block">Just now</span>
						</div>
					</div>

					{/* Actions */}
					<div className="p-4 border-t border-slate-100 space-y-2">
						<a
							href="https://api.whatsapp.com/send?phone=&text=Hi%2C%20I%20would%20like%20to%20learn%20more%20about%20DialogTab"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-sm transition-colors"
						>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
							Chat on WhatsApp
						</a>
						<a
							href="https://app.dialogtab.com/register"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-medium text-sm transition-colors"
						>
							Start Free Trial
						</a>
					</div>
				</div>
			)}

			{/* Widget Button */}
			<button
				onClick={() => setOpen(!open)}
				className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all hover:scale-105"
				aria-label="Open chat widget"
			>
				{/* Pulse Ring */}
				{!open && (
					<span className="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-20" />
				)}

				{/* Button Background */}
				<span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 to-brand-700" />

				{/* Icon */}
				<span className="relative flex items-center justify-center w-full h-full">
					{open ? (
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
					) : (
						<Image
							src="https://app.dialogtab.com/dialogtab.png"
							alt="DialogTab"
							width={32}
							height={32}
							className="rounded-full"
							unoptimized
						/>
					)}
				</span>

				{/* Badge */}
				{!open && (
					<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold ring-2 ring-white">
						1
					</span>
				)}
			</button>
		</div>
	);
}
