"use client";

import { useMemo } from "react";

function parseMarkdownToHTML(md: string): string {
	let html = md
		// Code blocks
		.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-slate-900 text-slate-100 p-4 rounded-xl text-sm overflow-x-auto my-4"><code>$2</code></pre>')
		// Inline code
		.replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-brand-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
		// Bold
		.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
		// Italic
		.replace(/\*(.+?)\*/g, "<em>$1</em>")
		// H3
		.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 mt-8 mb-3">$1</h3>')
		// H2
		.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 mt-10 mb-4" id="$1">$1</h2>')
		// Unordered lists
		.replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-600">$1</li>')
		// Ordered lists
		.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-slate-600 list-decimal">$1</li>')
		// Blockquote
		.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-brand-500 pl-4 py-2 my-4 text-slate-600 italic bg-brand-50/50 rounded-r-lg">$1</blockquote>')
		// Links
		.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-600 hover:text-brand-700 underline" target="_blank" rel="noopener noreferrer">$1</a>')
		// Horizontal rule
		.replace(/^---$/gm, '<hr class="my-8 border-slate-200" />')
		// Paragraphs (lines that don't start with HTML tags)
		.replace(/^(?!<[a-z]|$)(.+)$/gm, '<p class="text-slate-600 leading-relaxed mb-4">$1</p>');

	// Wrap consecutive <li> elements in <ul>
	html = html.replace(
		/(<li class="ml-4 text-slate-600">[\s\S]*?<\/li>\n?)+/g,
		'<ul class="list-disc space-y-2 my-4 pl-2">$&</ul>'
	);
	html = html.replace(
		/(<li class="ml-4 text-slate-600 list-decimal">[\s\S]*?<\/li>\n?)+/g,
		'<ol class="list-decimal space-y-2 my-4 pl-2">$&</ol>'
	);

	return html;
}

function extractHeadings(md: string): { id: string; text: string }[] {
	const headings: { id: string; text: string }[] = [];
	const regex = /^## (.+)$/gm;
	let match;
	while ((match = regex.exec(md)) !== null) {
		headings.push({ id: match[1], text: match[1] });
	}
	return headings;
}

export default function BlogContent({
	content,
	tocOnly = false,
}: {
	content: string;
	tocOnly?: boolean;
}) {
	const headings = useMemo(() => extractHeadings(content), [content]);
	const html = useMemo(() => parseMarkdownToHTML(content), [content]);

	if (tocOnly) {
		return (
			<nav aria-label="Table of contents">
				<ul className="space-y-2">
					{headings.map((h, i) => (
						<li key={i}>
							<a
								href={`#${encodeURIComponent(h.id)}`}
								className="text-sm text-slate-600 hover:text-brand-600 transition-colors block py-1 border-l-2 border-transparent hover:border-brand-500 pl-3"
							>
								{h.text}
							</a>
						</li>
					))}
				</ul>
			</nav>
		);
	}

	return (
		<div
			className="prose-custom max-w-none"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
