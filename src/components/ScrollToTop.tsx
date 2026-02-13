"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
	const [visible, setVisible] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const docHeight = document.documentElement.scrollHeight - window.innerHeight;
			const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

			setVisible(scrollTop > 300);
			setProgress(scrollPercent);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const circumference = 2 * Math.PI * 26; // r=26
	const strokeDashoffset = circumference - progress * circumference;

	return (
		<button
			onClick={scrollToTop}
			className={`fixed bottom-6 left-6 z-[99] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 group ${
				visible
					? "opacity-100 translate-y-0 pointer-events-auto"
					: "opacity-0 translate-y-4 pointer-events-none"
			}`}
			aria-label="Scroll to top"
		>
			{/* Progress Ring SVG */}
			<svg
				className="absolute inset-0 w-full h-full -rotate-90"
				viewBox="0 0 60 60"
				preserveAspectRatio="xMidYMid meet"
			>
				{/* Background circle */}
				<circle
					cx="30"
					cy="30"
					r="26"
					strokeWidth="3"
					fill="white"
					stroke="#e2e8f0"
					className="drop-shadow-sm"
				/>
				{/* Progress circle */}
				<circle
					cx="30"
					cy="30"
					r="26"
					strokeWidth="3"
					fill="none"
					stroke="url(#scrollGradient)"
					strokeLinecap="round"
					style={{
						strokeDasharray: circumference,
						strokeDashoffset: strokeDashoffset,
						transition: "stroke-dashoffset 0.15s ease-out",
					}}
				/>
				<defs>
					<linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" stopColor="#3b82f6" />
						<stop offset="100%" stopColor="#8b5cf6" />
					</linearGradient>
				</defs>
			</svg>

			{/* Arrow */}
			<span className="relative text-brand-600 group-hover:text-brand-700 transition-colors font-bold text-lg">
				↑
			</span>
		</button>
	);
}
