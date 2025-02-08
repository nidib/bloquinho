'use client';

import { useLocalStorage } from '@uidotdev/usehooks';
import { type ReactNode, createContext, useContext, useState } from 'react';
import type { Bloquinho, Extension } from 'src/lib/types/bloquinho';

const BloquinhoEditorContext = createContext<{
	content: string;
	setContent: (content: string) => void;
	extension: Extension;
	setExtension: (extension: Extension) => void;
	lineWrap: boolean;
	enableLineWrap: VoidFunction;
	disableLineWrap: VoidFunction;
} | null>(null);

export function useBloquinhoEditorContext() {
	const ctx = useContext(BloquinhoEditorContext);

	if (!ctx) {
		throw new Error(
			`useBloquinhoEditorContext requires the provider: ${BloquinhoEditorContextProvider.name}`,
		);
	}

	return ctx;
}

export type EditableBloquinho = Pick<
	Bloquinho,
	'title' | 'content' | 'extension'
>;

export function BloquinhoEditorContextProvider(props: {
	children: ReactNode;
	bloquinho: EditableBloquinho;
}) {
	const [lineWrap, setLineWrap] = useLocalStorage('lineWrap', true);
	const [content, setContent] = useState(props.bloquinho.content);
	const [extension, setExtension] = useState(props.bloquinho.extension);

	const enableLineWrap = () => setLineWrap(true);
	const disableLineWrap = () => setLineWrap(false);

	const context = {
		content,
		setContent,
		extension,
		setExtension,
		lineWrap,
		enableLineWrap,
		disableLineWrap,
	};

	return (
		<BloquinhoEditorContext.Provider value={context}>
			{props.children}
		</BloquinhoEditorContext.Provider>
	);
}
