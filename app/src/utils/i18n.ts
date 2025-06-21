export const dictionary = {
	en: {
		name: 'English',
		translations: {
			AppDescription: 'Sharing your snippets easily',
			CreateBloquinho: 'Create bloquinho',
			CreateBloquinhoInputPlaceholder: 'your-bloquinho-name',
			Version: 'Version',
			PublishedAt: 'Published at',
			Preferences: 'Preferences',
			LineWrap: 'Line wrap',
		},
	},
	pt: {
		name: 'Português (Brasil)',
		translations: {
			AppDescription: 'Compartilhando seus snippets facilmente',
			CreateBloquinho: 'Criar bloquinho',
			CreateBloquinhoInputPlaceholder: 'nome-do-seu-bloquinho',
			Version: 'Versão',
			PublishedAt: 'Publicado em',
			Preferences: 'Preferências',
			LineWrap: 'Quebra de linha',
		},
	},
} as const;

export type Dictionary = typeof dictionary;
export type Lang = keyof Dictionary;
export type TranslationKey = keyof Dictionary[Lang]['translations'];

export function t(key: TranslationKey, language: Lang) {
	return (
		dictionary[language].translations[key] ?? dictionary.en.translations[key]
	);
}
