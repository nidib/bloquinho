'use client';

import { useLocalStorage } from '@uidotdev/usehooks';
import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import {
	FALLBACK_LANGUAGE,
	type Lang,
	type TranslationKey,
	t as translateKey,
} from 'src/utils/i18n';

type I18nContext = {
	language: Lang;
	changeLanguage: (language: Lang) => void;
	t: (key: TranslationKey) => string;
};

const I18Context = createContext<null | I18nContext>(null);

type Props = {
	children: ReactNode;
};

export function I18nProvider({ children }: Props) {
	const [language, setLanguage] = useLocalStorage<Lang>(
		'language',
		FALLBACK_LANGUAGE,
	);

	const changeLanguage = useCallback(
		(language: Lang) => {
			setLanguage(language);
		},
		[setLanguage],
	);

	const t = useCallback(
		(key: TranslationKey) => {
			return translateKey(key, language);
		},
		[language],
	);

	const context = useMemo(
		() => ({
			language,
			changeLanguage,
			t,
		}),
		[language, t, changeLanguage],
	);

	return <I18Context.Provider value={context}>{children}</I18Context.Provider>;
}

export function useI18n() {
	const ctx = useContext(I18Context);

	if (!ctx) {
		throw new Error(`useI18n requires the provider: ${I18nProvider.name}`);
	}

	return ctx;
}
