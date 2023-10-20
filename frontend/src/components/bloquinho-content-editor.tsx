import { Editor } from '@monaco-editor/react';

import type { Extension } from '../utils/constants/extensions';
import React from 'react';

type Props = {
	content: string;
	onContentChange: (content: string) => void;
	extension: Extension;
	autoFocus: boolean;
	lineWrap: boolean;
};

type VSCodeExtensions =
	| 'javascript'
	| 'typescript'
	| 'markdown'
	| 'html'
	| 'css'
	| 'java'
	| 'python'
	| 'sql'
	| 'plaintext';

type onMountFn = Exclude<React.ComponentProps<typeof Editor>['onMount'], undefined>;
type IStandaloneCodeEditor = Parameters<onMountFn>[0];

export function BloquinhoContentEditor(props: Props) {
	const { content, onContentChange, autoFocus, extension, lineWrap } = props;
	const extensionMap: Record<Extension, VSCodeExtensions> = {
		js: 'javascript',
		ts: 'typescript',
		jsx: 'plaintext',
		tsx: 'plaintext',
		md: 'markdown',
		html: 'html',
		css: 'css',
		java: 'java',
		py: 'python',
		sql: 'sql',
		txt: 'plaintext',
	};
	const activeLanguage = extensionMap[extension];

	const focusEditor = (editor: IStandaloneCodeEditor) => {
		autoFocus && editor.focus();
	};

	return (
		<Editor
			height="100%"
			theme="light"
			onMount={focusEditor}
			value={content}
			language={activeLanguage}
			onChange={(value) => onContentChange(value ?? '')}
			options={{
				wordWrap: lineWrap ? 'on' : 'off',
				acceptSuggestionOnCommitCharacter: false,
				fontSize: 18,
				tabSize: 4,
				insertSpaces: false,
				renderWhitespace: 'all',
				minimap: { enabled: false },
			}}
		/>
	);
}
