import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { blogPosts } from "@/data/blog-posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import BlogSearch from "@/components/BlogSearch";

export async function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);

	const title = `${dict.blog.pageTitle} | DialogTab`;
	const description = dict.blog.pageDescription;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "website",
			images: ["https://dialogtab.com/images/dialogtab.webp"],
			siteName: "DialogTab",
		},
		twitter: { card: "summary_large_image" },
		alternates: {
			canonical: `https://dialogtab.com/${locale}/blog`,
			languages: {
				en: "https://dialogtab.com/en/blog",
				tr: "https://dialogtab.com/tr/blog",
				es: "https://dialogtab.com/es/blog",
			},
		},
		robots: {
			index: true,
			follow: true,
			"max-snippet": -1,
			"max-image-preview": "large",
			"max-video-preview": -1,
		},
	};
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: rawLocale } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);

	const categories = ["All", ...new Set(blogPosts.map((p) => p.category))];

	// JSON-LD for Blog listing
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: `DialogTab ${dict.blog.pageTitle}`,
		description: dict.blog.pageDescription,
		url: `https://dialogtab.com/${locale}/blog`,
		publisher: {
			"@type": "Organization",
			name: "DialogTab",
			logo: { "@type": "ImageObject", url: "https://dialogtab.com/images/dialogtab.webp" },
		},
		inLanguage: locale,
		blogPost: blogPosts.map((post) => ({
			"@type": "BlogPosting",
			headline: post.title[locale],
			description: post.excerpt[locale],
			url: `https://dialogtab.com/${locale}/blog/${post.slug}`,
			datePublished: post.date,
			author: { "@type": "Person", name: post.author.name },
			image: `https://dialogtab.com${post.coverImage}`,
		})),
	};

	const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return (
		<>
			<Header dict={dict.header} locale={locale} />
			<main className="pt-24 pb-16">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				{/* Hero */}
				<section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-24">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
						<h1 className="text-4xl md:text-6xl font-extrabold mb-6">
							{dict.blog.pageTitle}
						</h1>
						<p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
							{dict.blog.pageDescription}
						</p>
						<BlogSearch
							placeholder={dict.blog.searchPlaceholder}
							posts={sortedPosts.map((p) => ({
								slug: p.slug,
								title: p.title[locale],
								excerpt: p.excerpt[locale],
							}))}
							locale={locale}
						/>
					</div>
				</section>

				{/* Categories + Posts */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					{/* Category Filters */}
					<div className="flex flex-wrap gap-2 mb-10 justify-center">
						{categories.map((cat) => (
							<span
								key={cat}
								className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors cursor-pointer"
							>
								{cat === "All"
									? dict.blog.allPosts
									: dict.blog.categories[cat as keyof typeof dict.blog.categories] || cat}
							</span>
						))}
					</div>

					{/* Posts Grid */}
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{sortedPosts.map((post) => (
							<article
								key={post.slug}
								className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
							>
								<Link href={`/${locale}/blog/${post.slug}`}>
									<div className="relative h-48 bg-gradient-to-br from-brand-500 to-purple-600 overflow-hidden">
										<Image
											src={post.coverImage}
											alt={post.title[locale]}
											fill
											className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
										/>
										<div className="absolute inset-0 flex items-center justify-center">
											<span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
												{dict.blog.categories[post.category as keyof typeof dict.blog.categories] || post.category}
											</span>
										</div>
									</div>
								</Link>
								<div className="p-6">
									<div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
										<time dateTime={post.date}>
											{new Date(post.date).toLocaleDateString(locale === "tr" ? "tr-TR" : locale === "es" ? "es-ES" : "en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</time>
										<span className="w-1 h-1 bg-slate-300 rounded-full" />
										<span>{post.readingTime} {dict.blog.readingTime}</span>
									</div>
									<Link href={`/${locale}/blog/${post.slug}`}>
										<h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
											{post.title[locale]}
										</h2>
									</Link>
									<p className="text-sm text-slate-500 mb-4 line-clamp-3">
										{post.excerpt[locale]}
									</p>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<Image
												src={post.author.avatar}
												alt={post.author.name}
												width={28}
												height={28}
												className="rounded-full"
												unoptimized
											/>
											<span className="text-xs text-slate-500">{post.author.name}</span>
										</div>
										<Link
											href={`/${locale}/blog/${post.slug}`}
											className="text-brand-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
										>
											{dict.blog.readMore}
											<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
										</Link>
									</div>
								</div>
							</article>
						))}
					</div>
				</section>

				{/* Newsletter */}
				<section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="bg-gradient-to-r from-brand-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
						<h2 className="text-2xl md:text-3xl font-bold mb-3">{dict.blog.newsletter.title}</h2>
						<p className="text-white/80 mb-6">{dict.blog.newsletter.description}</p>
						<div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
							<input
								type="email"
								placeholder={dict.blog.newsletter.placeholder}
								className="flex-1 px-5 py-3 rounded-xl text-slate-900 text-sm outline-none"
							/>
							<button
								type="button"
								className="px-6 py-3 bg-white text-brand-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors"
							>
								{dict.blog.newsletter.button}
							</button>
						</div>
					</div>
				</section>
			</main>
			<Footer dict={dict.footer} locale={locale} />
			<ChatWidget dict={dict.chatWidget} />
			<ScrollToTop />
		</>
	);
}
