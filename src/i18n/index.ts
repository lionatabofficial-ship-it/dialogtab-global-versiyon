import type { Locale } from "./config";

const dictionaries = {
	en: () => import("./dictionaries/en.json").then((m) => m.default),
	tr: () => import("./dictionaries/tr.json").then((m) => m.default),
	es: () => import("./dictionaries/es.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
	return (dictionaries[locale] || dictionaries.en)();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
