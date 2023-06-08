import CodeMirror from '@uiw/react-codemirror';
import { Extension } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';

import { styled } from '../themes/theme';

type BloquinhoEditorProps = {
	content: string;
	onContentChange: (content: string) => void;
	autoFocus: boolean;
};

type SupportedLanguages = 'js' | 'jsx' | 'ts' | 'tsx' | 'java';

const StyledCodeMirror = styled(CodeMirror, {
	zIndex: 100,
	height: '100%',
	fontSize: '$3',
});

const languages: Record<SupportedLanguages, Extension> = {
	js: javascript({ jsx: false, typescript: false }),
	jsx: javascript({ jsx: true, typescript: false }),
	ts: javascript({ jsx: false, typescript: true }),
	tsx: javascript({ jsx: true, typescript: true }),
	java: java(),
};

const preferences = {
	autocompletion: false,
	tabSize: 4,
};

export function BloquinhoEditor(props: BloquinhoEditorProps) {
	const { content, onContentChange, autoFocus } = props;
	const bloquinhoLanguage: SupportedLanguages | undefined = 'txt' as SupportedLanguages;
	const languageExtension = languages[bloquinhoLanguage];
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
