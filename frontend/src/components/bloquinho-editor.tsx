import CodeMirror, { BasicSetupOptions } from '@uiw/react-codemirror';
import { Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';

import { styled } from '../themes/theme';
import { SupportedExtensions } from '../apis/bloquinho/bloquinho-api';

type BloquinhoEditorProps = {
	content: string;
	onContentChange: (content: string) => void;
	extension: SupportedExtensions;
	autoFocus: boolean;
};

const StyledCodeMirror = styled(CodeMirror, {
	zIndex: 100,
	height: '100%',
	fontSize: '$3',
});

const languages: Record<SupportedExtensions, Extension | null> = {
	js: javascript({ jsx: false, typescript: false }),
	jsx: javascript({ jsx: true, typescript: false }),
	ts: javascript({ jsx: false, typescript: true }),
	tsx: javascript({ jsx: true, typescript: true }),
	java: java(),
	txt: null,
};

const preferences: BasicSetupOptions = {
	autocompletion: false,
	tabSize: 4,
};

export function BloquinhoEditor(props: BloquinhoEditorProps) {
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
