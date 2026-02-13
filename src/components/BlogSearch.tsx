"use client";

import { useState } from "react";
import Link from "next/link";

interface SearchPost {
	slug: string;
	title: string;
	excerpt: string;
}

export default function BlogSearch({
	placeholder,
	posts,
	locale,
}: {
	placeholder: string;
	posts: SearchPost[];
	locale: string;
}) {
	const [query, setQuery] = useState("");
	const [focused, setFocused] = useState(false);

	const filtered = query.length >= 2
		? posts.filter(
				(p) =>
					p.title.toLowerCase().includes(query.toLowerCase()) ||
					p.excerpt.toLowerCase().includes(query.toLowerCase())
			)
		: [];

	return (
		<div className="relative max-w-lg mx-auto">
			<div className="relative">
				<svg
					className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<circle cx="11" cy="11" r="8" />
					<path d="m21 21-4.3-4.3" />
				</svg>
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => setFocused(true)}
					onBlur={() => setTimeout(() => setFocused(false), 200)}
					placeholder={placeholder}
					className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-400 text-sm outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition-all"
				/>
			</div>

			{focused && filtered.length > 0 && (
				<div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
					{filtered.map((post) => (
						<Link
							key={post.slug}
							href={`/${locale}/blog/${post.slug}`}
							className="block px-5 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
						>
							<h4 className="text-sm font-semibold text-slate-900">{post.title}</h4>
							<p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{post.excerpt}</p>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
