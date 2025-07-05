import { Fragment } from 'react';
import type { JSX } from 'react';

const dictionary = {
	'en-US': {
		name: 'English',
		translations: {
			AppDescription: 'Sharing your snippets easily',
			CreateBloquinho: 'Create bloquinho',
			CreateBloquinhoInputPlaceholder: 'your-bloquinho-name',
			Version: 'Version',
			PublishedAt: 'Published at',
			Preferences: 'Preferences',
			LineWrap: 'Line wrap',
			SavingBloquinho: 'Saving bloquinho...',
			BloquinhoUpdated: 'Bloquinho updated!',
			SomethingWentWrong: 'Something went wrong!',
			ReportBugOrSuggestion: 'Report a bug or suggestion',
			ReportBugOrSuggestionDescription:
				'Found a bug, or have a cool idea? Tell me more!',
			Send: 'Send',
			Sending: 'Sending...',
			YourMessageHasBeenSentThankYou: 'Your message has been sent! Thank you!',
			Type: 'Type',
			SelectAType: 'Select a type',
			ThisFieldIsRequired: 'This field is required',
			Bug: 'Bug',
			Improvement: 'Improvement',
			Feedback: 'Feedback',
			HowToReproduce: 'How to reproduce',
			DescribeTheStepsToReproduce: 'Describe the steps to reproduce',
			WhatYouThought: 'What you thought',
			TellMeAboutYourIdea: 'Tell me about your idea',
			TellMeMore: 'Tell me more',
			Message: 'Message',
			TypeYourMessage: 'Type your message',
			Language: 'Language',
			TryAgainLater: 'Try again later.',
			BloquinhoUnderMaintenance: '%s is under maintenance',
			New: 'New',
		},
	},
	'pt-BR': {
		name: 'Português (Brasil)',
		translations: {
			AppDescription: 'Compartilhando seus snippets facilmente',
			CreateBloquinho: 'Criar bloquinho',
			CreateBloquinhoInputPlaceholder: 'nome-do-seu-bloquinho',
			Version: 'Versão',
			PublishedAt: 'Publicado em',
			Preferences: 'Preferências',
			LineWrap: 'Quebra de linha',
			SavingBloquinho: 'Salvando bloquinho...',
			BloquinhoUpdated: 'Bloquinho atualizado!',
			SomethingWentWrong: 'Algo deu errado!',
			ReportBugOrSuggestion: 'Reportar um bug ou sugestão',
			ReportBugOrSuggestionDescription:
				'Encontrou um bug, ou teve uma ideia? Me conta mais!',
			Send: 'Enviar',
			Sending: 'Enviando...',
			YourMessageHasBeenSentThankYou: 'Sua mensagem foi enviada! Obrigado!',
			Type: 'Tipo',
			SelectAType: 'Selecione um tipo',
			ThisFieldIsRequired: 'Esse campo é obrigatório',
			Bug: 'Bug',
			Improvement: 'Melhoria',
			Feedback: 'Feedback',
			HowToReproduce: 'Como reproduzir?',
			DescribeTheStepsToReproduce: 'Descreva os passos para reproduzir',
			WhatYouThought: 'O que você pensou?',
			TellMeAboutYourIdea: 'Me conta um pouco sobre essa sua ideia.',
			TellMeMore: 'Me conta mais!',
			Message: 'Mensagem',
			TypeYourMessage: 'Descreva aqui sua mensagem.',
			Language: 'Idioma',
			TryAgainLater: 'Tente novamente mais tarde.',
			BloquinhoUnderMaintenance: '%s em manutenção',
			New: 'Novo',
		},
	},
	'es-ES': {
		name: 'Español',
		translations: {
			AppDescription: 'Comparte tus fragmentos fácilmente',
			CreateBloquinho: 'Crear bloquinho',
			CreateBloquinhoInputPlaceholder: 'nombre-de-tu-bloquinho',
			Version: 'Versión',
			PublishedAt: 'Publicado el',
			Preferences: 'Preferencias',
			LineWrap: 'Ajuste de línea',
			SavingBloquinho: 'Guardando bloquinho...',
			BloquinhoUpdated: '¡Bloquinho actualizado!',
			SomethingWentWrong: '¡Algo salió mal!',
			ReportBugOrSuggestion: 'Reportar un error o sugerencia',
			ReportBugOrSuggestionDescription: '¿Encontraste un error o tienes una buena idea? ¡Cuéntame más!',
			Send: 'Enviar',
			Sending: 'Enviando...',
			YourMessageHasBeenSentThankYou: '¡Tu mensaje ha sido enviado! ¡Gracias!',
			Type: 'Tipo',
			SelectAType: 'Selecciona un tipo',
			ThisFieldIsRequired: 'Este campo es obligatorio',
			Bug: 'Error',
			Improvement: 'Mejora',
			Feedback: 'Comentario',
			HowToReproduce: 'Cómo reproducirlo',
			DescribeTheStepsToReproduce: 'Describe los pasos para reproducirlo',
			WhatYouThought: '¿Qué pensaste?',
			TellMeAboutYourIdea: 'Cuéntame sobre tu idea',
			TellMeMore: 'Cuéntame más',
			Message: 'Mensaje',
			TypeYourMessage: 'Escribe tu mensaje',
			Language: 'Idioma',
			TryAgainLater: 'Intenta de nuevo más tarde.',
			BloquinhoUnderMaintenance: '%s está en mantenimiento',
			New: 'Nuevo',
		},
	},
} as const;

export const FALLBACK_LANGUAGE = 'en-US';

export type Dictionary = typeof dictionary;
export type Lang = keyof Dictionary;
export type TranslationKey = keyof Dictionary[Lang]['translations'];

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
