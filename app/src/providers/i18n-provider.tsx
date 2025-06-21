'use client';

import {
	type ReactNode,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import {
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
	const [language, setLanguage] = useState<Lang>('en');

	const changeLanguage = useCallback((language: Lang) => {
		setLanguage(language);
	}, []);

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
