import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { Extension as CodeMirrorExtension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { sql } from '@codemirror/lang-sql';
import { html } from '@codemirror/lang-html';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { css } from '@codemirror/lang-css';

import type { Extension } from '../utils/constants/extensions';
import { EditorView } from '@codemirror/view';
import { useMemo } from 'react';

type Props = {
	content: string;
	onContentChange: (content: string) => void;
	extension: Extension;
	autoFocus: boolean;
	lineWrap: boolean;
};

const languages: Record<Extension, CodeMirrorExtension | null> = {
	js: javascript({ jsx: false, typescript: false }),
	jsx: javascript({ jsx: true, typescript: false }),
	ts: javascript({ jsx: false, typescript: true }),
	tsx: javascript({ jsx: true, typescript: true }),
	java: java(),
	sql: sql(),
	html: html(),
	py: python(),
	md: markdown(),
	css: css(),
	txt: null,
};

const preferences: BasicSetupOptions = {
	autocompletion: false,
	tabSize: 4,
};

export function BloquinhoContentEditor(props: Props) {
	const { content, onContentChange, autoFocus, extension, lineWrap } = props;
	const extensions = useMemo(() => {
		const extensions: CodeMirrorExtension[] = [];

		if (lineWrap) {
			extensions.push(EditorView.lineWrapping);
		}

		const language = languages[extension];

		if (language) {
			extensions.push(language);
		}

		return extensions;
	}, [extension, lineWrap]);

	return (
		<CodeMirror
			className="z-[100] h-full text-xl"
			value={content}
			height={'100%'}
			theme={'light'}
			basicSetup={preferences}
			extensions={extensions}
			onChange={onContentChange}
			autoFocus={autoFocus}
			indentWithTab
		/>
	);
}
