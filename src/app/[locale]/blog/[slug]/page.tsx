import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { blogPosts } from "@/data/blog-posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import ScrollToTop from "@/components/ScrollToTop";
import BlogContent from "@/components/BlogContent";
import ShareButtons from "@/components/ShareButtons";

export async function generateStaticParams() {
	const params: { locale: string; slug: string }[] = [];
	for (const locale of locales) {
		for (const post of blogPosts) {
			params.push({ locale, slug: post.slug });
		}
	}
	return params;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale: rawLocale, slug } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const post = blogPosts.find((p) => p.slug === slug);
	if (!post) return {};

	const title = `${post.title[locale]} | DialogTab Blog`;
	const description = post.excerpt[locale];

	return {
		title,
		description,
		keywords: post.tags[locale].join(", "),
		openGraph: {
			title,
			description,
			type: "article",
			publishedTime: post.date,
			authors: [post.author.name],
			tags: post.tags[locale],
			images: [{ url: `https://dialogtab.com${post.coverImage}`, width: 1200, height: 630, alt: post.title[locale] }],
			siteName: "DialogTab",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
		alternates: {
			canonical: `https://dialogtab.com/${locale}/blog/${slug}`,
			languages: {
				en: `https://dialogtab.com/en/blog/${slug}`,
				tr: `https://dialogtab.com/tr/blog/${slug}`,
				es: `https://dialogtab.com/es/blog/${slug}`,
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

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale: rawLocale, slug } = await params;
	const locale = (locales.includes(rawLocale as Locale) ? rawLocale : "en") as Locale;
	const dict = await getDictionary(locale);
	const post = blogPosts.find((p) => p.slug === slug);

	if (!post) notFound();

	const relatedPosts = blogPosts
		.filter((p) => p.slug !== slug)
		.sort(() => 0.5 - Math.random())
		.slice(0, 3);

	// JSON-LD BlogPosting
	const blogPostingLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title[locale],
		description: post.excerpt[locale],
		image: `https://dialogtab.com${post.coverImage}`,
		datePublished: post.date,
		dateModified: post.date,
		author: {
			"@type": "Person",
			name: post.author.name,
		},
		publisher: {
			"@type": "Organization",
			name: "DialogTab",
			logo: { "@type": "ImageObject", url: "https://dialogtab.com/images/dialogtab.webp" },
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://dialogtab.com/${locale}/blog/${slug}`,
		},
		inLanguage: locale,
		keywords: post.tags[locale].join(", "),
		wordCount: post.content[locale].split(/\s+/).length,
		articleSection: post.category,
	};

	// JSON-LD BreadcrumbList
	const breadcrumbLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "DialogTab",
				item: `https://dialogtab.com/${locale}`,
			},
			{
				"@type": "ListItem",
				position: 2,
				name: dict.blog.pageTitle,
				item: `https://dialogtab.com/${locale}/blog`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: post.title[locale],
				item: `https://dialogtab.com/${locale}/blog/${slug}`,
			},
		],
	};

	// JSON-LD FAQPage (GEO optimization)
	const faqLd =
		post.faqs[locale].length > 0
			? {
					"@context": "https://schema.org",
					"@type": "FAQPage",
					mainEntity: post.faqs[locale].map((faq) => ({
						"@type": "Question",
						name: faq.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: faq.answer,
						},
					})),
				}
			: null;

	return (
		<>
			<Header dict={dict.header} locale={locale} />
			<main className="pt-24 pb-16">
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
				/>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
				/>
				{faqLd && (
					<script
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
					/>
				)}

				{/* Hero */}
				<section className="bg-gradient-to-br from-slate-900 via-slate-800 to-brand-900 text-white py-16 md:py-24">
					<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
						{/* Breadcrumb */}
						<nav aria-label="Breadcrumb" className="mb-6">
							<ol className="flex items-center gap-2 text-sm text-slate-400">
								<li>
									<Link href={`/${locale}`} className="hover:text-white transition-colors">DialogTab</Link>
								</li>
								<li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg></li>
								<li>
									<Link href={`/${locale}/blog`} className="hover:text-white transition-colors">{dict.blog.pageTitle}</Link>
								</li>
								<li><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg></li>
								<li className="text-white/70 truncate max-w-[200px]">{post.title[locale]}</li>
							</ol>
						</nav>

						<span className="inline-block bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm">
							{dict.blog.categories[post.category as keyof typeof dict.blog.categories] || post.category}
						</span>

						<h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
							{post.title[locale]}
						</h1>

						<p className="text-lg text-slate-300 mb-8 max-w-3xl">
							{post.excerpt[locale]}
						</p>

						<div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
							<div className="flex items-center gap-2">
								<Image
									src={post.author.avatar}
									alt={post.author.name}
									width={36}
									height={36}
									className="rounded-full"
									unoptimized
								/>
								<div>
									<span className="text-white font-medium">{post.author.name}</span>
									<span className="block text-xs">{post.author.role[locale]}</span>
								</div>
							</div>
							<span className="w-1 h-1 bg-slate-500 rounded-full" />
							<time dateTime={post.date}>
								{new Date(post.date).toLocaleDateString(
									locale === "tr" ? "tr-TR" : locale === "es" ? "es-ES" : "en-US",
									{ year: "numeric", month: "long", day: "numeric" }
								)}
							</time>
							<span className="w-1 h-1 bg-slate-500 rounded-full" />
							<span>{post.readingTime} {dict.blog.readingTime}</span>
						</div>
					</div>
				</section>

				{/* Content */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid lg:grid-cols-[1fr_300px] gap-12">
						{/* Main Article */}
						<article className="min-w-0">
							{/* Tags */}
							<div className="flex flex-wrap gap-2 mb-8">
								{post.tags[locale].map((tag) => (
									<span key={tag} className="bg-brand-50 text-brand-700 text-xs font-medium px-3 py-1 rounded-full">
										{tag}
									</span>
								))}
							</div>

							{/* Markdown Content */}
							<BlogContent content={post.content[locale]} />

							{/* FAQ Section */}
							{post.faqs[locale].length > 0 && (
								<div className="mt-12 border-t border-slate-200 pt-10">
									<h2 className="text-2xl font-bold text-slate-900 mb-6">{dict.blog.faqTitle}</h2>
									<div className="space-y-4">
										{post.faqs[locale].map((faq, i) => (
											<details
												key={i}
												className="group bg-slate-50 rounded-xl border border-slate-200 overflow-hidden"
											>
												<summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-slate-900 text-sm hover:bg-slate-100 transition-colors">
													{faq.question}
													<svg
														className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
													>
														<path d="m6 9 6 6 6-6" />
													</svg>
												</summary>
												<div className="px-6 pb-4 text-sm text-slate-600 leading-relaxed">
													{faq.answer}
												</div>
											</details>
										))}
									</div>
								</div>
							)}

							{/* Share */}
							<div className="mt-10 pt-8 border-t border-slate-200">
								<h3 className="text-sm font-bold text-slate-700 mb-3">{dict.blog.shareArticle}</h3>
								<ShareButtons
									url={`https://dialogtab.com/${locale}/blog/${slug}`}
									title={post.title[locale]}
								/>
							</div>
						</article>

						{/* Sidebar */}
						<aside className="hidden lg:block space-y-8">
							{/* Table of Contents */}
							<div className="sticky top-28 bg-slate-50 rounded-2xl border border-slate-200 p-6">
								<h3 className="font-bold text-sm text-slate-900 mb-4">{dict.blog.tableOfContents}</h3>
								<BlogContent content={post.content[locale]} tocOnly />
							</div>
						</aside>
					</div>
				</section>

				{/* Related Posts */}
				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-200">
					<h2 className="text-2xl font-bold text-slate-900 mb-8">{dict.blog.relatedPosts}</h2>
					<div className="grid md:grid-cols-3 gap-6">
						{relatedPosts.map((rp) => (
							<Link
								key={rp.slug}
								href={`/${locale}/blog/${rp.slug}`}
								className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
							>
								<div className="relative h-36 bg-gradient-to-br from-brand-500 to-purple-600">
									<Image
										src={rp.coverImage}
										alt={rp.title[locale]}
										fill
										className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<div className="p-5">
									<span className="text-xs text-brand-600 font-medium">
										{dict.blog.categories[rp.category as keyof typeof dict.blog.categories] || rp.category}
									</span>
									<h3 className="text-sm font-bold text-slate-900 mt-1 group-hover:text-brand-600 transition-colors line-clamp-2">
										{rp.title[locale]}
									</h3>
									<span className="text-xs text-slate-400 mt-2 block">{rp.readingTime} {dict.blog.readingTime}</span>
								</div>
							</Link>
						))}
					</div>
				</section>
			</main>
			<Footer dict={dict.footer} locale={locale} />
			<ChatWidget dict={dict.chatWidget} />
			<ScrollToTop />
		</>
	);
}
