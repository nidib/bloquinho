'use client';

import { Editor } from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import { useCallback, useMemo } from 'react';
import type { ComponentProps } from 'react';

type EditorOptions = ComponentProps<typeof Editor>['options'];

type Props = {
	value: string;
	onChange: (value: string) => void;
	language: Language;
	lineWrap?: boolean;
};

export function CodeEditor({ lineWrap = true, ...props }: Props) {
	const options = useMemo<EditorOptions>(
		() => ({
			wordWrap: lineWrap ? 'on' : 'off',
			acceptSuggestionOnCommitCharacter: false,
			fontSize: 18,
			tabSize: 4,
			insertSpaces: false,
			renderWhitespace: 'all',
			minimap: { enabled: false },
		}),
		[lineWrap],
	);

	const focus = useCallback<OnMount>(editor => editor.focus(), []);

	return (
		<Editor
			theme="light"
			onMount={focus}
			defaultValue={props.value}
			language={props.language}
			onChange={(value = '') => props.onChange(value)}
			options={options}
		/>
	);
}

export type Language = | 'javascript'
	| 'typescript'
	| 'markdown'
	| 'html'
	| 'css'
	| 'java'
	| 'python'
	| 'sql'
	| 'plaintext'
	| 'php'
	| 'go';
