import { Fragment } from 'react';
import type { JSX } from 'react';

import type { Lang, TranslationKey } from './i18n/dictionary';
import { dictionary } from './i18n/dictionary';

export const FALLBACK_LANGUAGE = 'en-US';

export function t(
	key: TranslationKey,
	language: Lang,
	...textReplacements: string[]
) {
	if (dictionary[language] !== undefined) {
		return stringF(dictionary[language].translations[key], ...textReplacements);
	}

	return stringF(
		dictionary[FALLBACK_LANGUAGE].translations[key],
		...textReplacements,
	);
}

function stringF(str: string, ...values: string[]) {
	if (values.length === 0) {
		return str;
	}

	const newValues = [...values];
	return str.replace(/%s/g, () => newValues.shift() ?? '');
}

export function richStringF(str: string, ...richValues: JSX.Element[]) {
	const newReplacements = [...richValues];
	const parts = str.split(/(%s)/);

	return parts.map((part) => {
		if (part === '%s') {
			return <Fragment key={part}>{newReplacements.shift()}</Fragment>;
		}

		return part;
	});
}

export function getAvailableLanguages(): { name: string; code: Lang }[] {
	return Object.keys(dictionary).map(lang => ({
		name: dictionary[lang as Lang].name,
		code: lang as Lang,
	}));
}

const languageSet = new Set(Object.keys(dictionary));

export function isLanguageAvailable(language: string): language is Lang {
	return languageSet.has(language);
}
