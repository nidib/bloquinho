'use client';

import { useLocalStorage } from '@uidotdev/usehooks';
import {
	createContext,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import type { JSX, ReactNode } from 'react';

import { withClientOnly } from 'src/components/client-only';
import {
	FALLBACK_LANGUAGE,
	isLanguageAvailable,
	richStringF,
	t as translateKey,
} from 'src/utils/i18n';
import type { Lang, TranslationKey } from 'src/utils/i18n';

type I18nContext = {
	language: Lang;
	changeLanguage: (language: Lang) => void;
	t: (key: TranslationKey, ...textReplacements: string[]) => string;
	tt: (
		key: TranslationKey,
		...textReplacements: JSX.Element[]
	) => (string | JSX.Element | undefined)[];
};

const I18Context = createContext<null | I18nContext>(null);

type Props = {
	children: ReactNode;
};

export const I18nProvider = withClientOnly(({ children }: Props) => {
	const defaultLanguage = isLanguageAvailable(navigator.language)
		? navigator.language
		: FALLBACK_LANGUAGE;
	const [language, setLanguage] = useLocalStorage<Lang>(
		'language',
		defaultLanguage,
	);

	const changeLanguage = useCallback(
		(language: Lang) => {
			setLanguage(language);
		},
		[setLanguage],
	);

	const t = useCallback(
		(key: TranslationKey, ...replacements: string[]) => {
			return translateKey(key, language, ...replacements);
		},
		[language],
	);

	const tt = useCallback(
		(key: TranslationKey, ...replacements: JSX.Element[]) => {
			return richStringF(translateKey(key, language), ...replacements);
		},
		[language],
	);

	const context = useMemo(
		() => ({
			language,
			changeLanguage,
			t,
			tt,
		}),
		[language, t, changeLanguage, tt],
	);

	return <I18Context.Provider value={context}>{children}</I18Context.Provider>;
});

export function useI18n() {
	const ctx = useContext(I18Context);

	if (!ctx) {
		throw new Error(`useI18n requires the provider: ${I18nProvider.name}`);
	}

	return ctx;
}
