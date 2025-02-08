'use client';

import { Editor, type OnChange, type OnMount } from '@monaco-editor/react';
import { type ComponentProps, useCallback, useMemo } from 'react';

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

	const focus = useCallback<OnMount>((editor) => editor.focus(), []);

	const handleChange = useCallback<OnChange>(
		(value = '') => props.onChange(value),
		[props.onChange],
	);

	return (
		<Editor
			theme="light"
			onMount={focus}
			value={props.value}
			language={props.language}
			onChange={handleChange}
			options={options}
		/>
	);
}

export type Language =
	| 'javascript'
	| 'typescript'
	| 'markdown'
	| 'html'
	| 'css'
	| 'java'
	| 'python'
	| 'sql'
	| 'plaintext';
