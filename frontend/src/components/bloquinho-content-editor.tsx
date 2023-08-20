import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { Extension as CodeMirrorExtension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { sql } from '@codemirror/lang-sql';
import { html } from '@codemirror/lang-html';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { css } from '@codemirror/lang-css';

import { styled } from '../themes/theme';
import type { Extension } from '../utils/constants/extensions';

type Props = {
	content: string;
	onContentChange: (content: string) => void;
	extension: Extension;
	autoFocus: boolean;
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
	const { content, onContentChange, autoFocus, extension } = props;
	const languageExtension = languages[extension];
	const extensions = languageExtension ? [languageExtension] : undefined;

	return (
		<StyledCodeMirror
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

const StyledCodeMirror = styled(CodeMirror, {
	zIndex: 100,
	height: '100%',
	fontSize: '$3',
});
