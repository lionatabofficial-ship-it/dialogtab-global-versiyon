"use client";

import { useState } from "react";

const testimonials = [
	{
		quote:
			"Together with DialogTab, we have increased the conversion rate by 19%.",
		author: "Adem Hocu",
		role: "Ecommerce Manager",
		company: "Tesettur Island",
		metric: "19%",
		metricLabel: "Increased Sales",
	},
	{
		quote:
			"DialogTab has increased our productivity by 35% by offering a solution enabling physical store experts to work on websites in hybrid way.",
		author: "Gokhan Ozkan",
		role: "Ecommerce Manager",
		company: "Flormar",
		metric: "35%",
		metricLabel: "More Productive",
	},
];

export default function Testimonials() {
	const [current, setCurrent] = useState(0);

	return (
		<section className="py-20 bg-gray-50">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
						Trusted by Leading Brands
					</h2>
				</div>

				<div className="mx-auto max-w-3xl">
					<div className="relative bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
						{/* Metric Badge */}
						<div className="absolute -top-6 left-1/2 -translate-x-1/2">
							<div className="bg-blue-600 text-white rounded-full px-6 py-2 text-center">
								<span className="text-2xl font-bold">{testimonials[current].metric}</span>
								<span className="ml-2 text-sm">{testimonials[current].metricLabel}</span>
							</div>
						</div>

						{/* Quote */}
						<div className="mt-4 text-center">
							<svg className="w-10 h-10 text-gray-200 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
								<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
							</svg>
							<blockquote className="text-xl text-gray-700 leading-8 italic">
								&ldquo;{testimonials[current].quote}&rdquo;
							</blockquote>
							<div className="mt-6">
								<p className="font-semibold text-gray-900">
									{testimonials[current].author}
								</p>
								<p className="text-sm text-gray-500">
									{testimonials[current].role}, {testimonials[current].company}
								</p>
							</div>
						</div>

						{/* Navigation */}
						<div className="mt-8 flex items-center justify-center gap-4">
							<button
								onClick={() =>
									setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
								}
								className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
							>
								<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
								</svg>
							</button>
							<div className="flex gap-2">
								{testimonials.map((_, index) => (
									<button
										key={index}
										onClick={() => setCurrent(index)}
										className={`w-2.5 h-2.5 rounded-full transition-colors ${
											index === current ? "bg-blue-600" : "bg-gray-300"
										}`}
									/>
								))}
							</div>
							<button
								onClick={() =>
									setCurrent(current === testimonials.length - 1 ? 0 : current + 1)
								}
								className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
							>
								<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
