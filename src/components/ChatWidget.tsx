"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface ChatWidgetDict {
	tooltipText: string;
	headerTitle: string;
	headerSubtitle: string;
	fullName: string;
	fullNamePlaceholder: string;
	phone: string;
	phonePlaceholder: string;
	email: string;
	emailPlaceholder: string;
	website: string;
	websitePlaceholder: string;
	sectorTitle: string;
	sectors: string[];
	submitButton: string;
	successMessage: string;
}

export default function ChatWidget({ dict }: { dict: ChatWidgetDict }) {
	const [open, setOpen] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [selectedSector, setSelectedSector] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const tooltipTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => {
		tooltipTimer.current = setTimeout(() => {
			if (!open) setShowTooltip(true);
		}, 2000);
		return () => {
			if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
		};
	}, [open]);

	useEffect(() => {
		if (open) {
			setShowTooltip(false);
			const timer = setTimeout(() => setFormVisible(true), 100);
			return () => clearTimeout(timer);
		} else {
			setFormVisible(false);
		}
	}, [open]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const data = new FormData(form);
		const params = new URLSearchParams();
		if (data.get("fullName")) params.set("name", data.get("fullName") as string);
		if (data.get("email")) params.set("email", data.get("email") as string);
		if (data.get("phone")) params.set("phone", data.get("phone") as string);
		if (data.get("website")) params.set("website", data.get("website") as string);
		if (selectedSector) params.set("sector", selectedSector);
		window.open(`https://app.dialogtab.com/register?${params.toString()}`, "_blank");
		setSubmitted(true);
		setTimeout(() => {
			setSubmitted(false);
			setOpen(false);
		}, 2000);
	};

	return (
		<div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
			{/* Form Panel */}
			{open && (
				<div className="w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4">
					{/* Gradient Header */}
					<div className="relative bg-gradient-to-r from-brand-600 via-brand-500 to-purple-500 px-6 py-5">
						<button
							onClick={() => setOpen(false)}
							className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
							aria-label="Close"
						>
							<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
						</button>
						<div className="flex items-center gap-3">
							<div className="w-11 h-11 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
								<Image src="https://app.dialogtab.com/dialogtab.png" alt="DialogTab" width={28} height={28} className="rounded-full" unoptimized />
							</div>
							<div>
								<h3 className="text-white font-bold text-base">{dict.headerTitle}</h3>
								<p className="text-white/80 text-xs">{dict.headerSubtitle}</p>
							</div>
						</div>
					</div>

					{/* Form Body */}
					<div className="p-5 max-h-[60vh] overflow-y-auto">
						{submitted ? (
							<div className="flex flex-col items-center justify-center py-10 gap-3">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
									<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
								</div>
								<p className="text-slate-700 font-semibold text-center">{dict.successMessage}</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-3">
								{/* Full Name */}
								<div className={`transition-all duration-300 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: "0ms" }}>
									<label className="block text-xs font-semibold text-slate-600 mb-1">{dict.fullName} *</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
										</span>
										<input
											name="fullName"
											type="text"
											required
											placeholder={dict.fullNamePlaceholder}
											className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 outline-none transition-all bg-slate-50 hover:bg-white"
										/>
									</div>
								</div>

								{/* Phone */}
								<div className={`transition-all duration-300 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: "80ms" }}>
									<label className="block text-xs font-semibold text-slate-600 mb-1">{dict.phone} *</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
										</span>
										<input
											name="phone"
											type="tel"
											required
											placeholder={dict.phonePlaceholder}
											className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 outline-none transition-all bg-slate-50 hover:bg-white"
										/>
									</div>
								</div>

								{/* Email */}
								<div className={`transition-all duration-300 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: "160ms" }}>
									<label className="block text-xs font-semibold text-slate-600 mb-1">{dict.email} *</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
										</span>
										<input
											name="email"
											type="email"
											required
											placeholder={dict.emailPlaceholder}
											className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 outline-none transition-all bg-slate-50 hover:bg-white"
										/>
									</div>
								</div>

								{/* Website */}
								<div className={`transition-all duration-300 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: "240ms" }}>
									<label className="block text-xs font-semibold text-slate-600 mb-1">{dict.website}</label>
									<div className="relative">
										<span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
											<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
										</span>
										<input
											name="website"
											type="url"
											placeholder={dict.websitePlaceholder}
											className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 outline-none transition-all bg-slate-50 hover:bg-white"
										/>
									</div>
								</div>

								{/* Sector Selection */}
								<div className={`transition-all duration-300 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: "320ms" }}>
									<label className="block text-xs font-semibold text-slate-600 mb-2">{dict.sectorTitle}</label>
									<div className="grid grid-cols-2 gap-2">
										{dict.sectors.map((sector) => (
											<button
												type="button"
												key={sector}
												onClick={() => setSelectedSector(sector === selectedSector ? "" : sector)}
												className={`px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
													selectedSector === sector
														? "bg-brand-500 text-white border-brand-500 shadow-sm"
														: "bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-300 hover:bg-brand-50"
												}`}
											>
												{sector}
											</button>
										))}
									</div>
								</div>

								{/* Submit */}
								<div className={`pt-2 transition-all duration-300 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`} style={{ transitionDelay: "400ms" }}>
									<button
										type="submit"
										className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-purple-500 text-white font-semibold text-sm hover:from-brand-600 hover:to-purple-600 transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2"
									>
										{dict.submitButton}
										<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			)}

			{/* Tooltip */}
			{showTooltip && !open && (
				<div className="relative animate-in fade-in-0 slide-in-from-right-2 mr-1">
					<div className="bg-white rounded-xl shadow-lg border border-slate-200 px-4 py-3 max-w-[220px]">
						<button
							onClick={() => setShowTooltip(false)}
							className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
							aria-label="Close tooltip"
						>
							<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
						</button>
						<p className="text-sm text-slate-700 leading-snug">{dict.tooltipText}</p>
					</div>
					{/* Arrow */}
					<div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45" />
				</div>
			)}

			{/* Widget Button */}
			<button
				onClick={() => setOpen(!open)}
				className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transition-all hover:scale-105"
				aria-label="Open form widget"
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
