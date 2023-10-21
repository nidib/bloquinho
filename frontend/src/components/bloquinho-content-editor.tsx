import { Editor } from '@monaco-editor/react';

import { extensions, type Extension } from '../utils/constants/extensions';
import { Loading } from './core/loading';

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

const extensionMap: Record<Extension, VSCodeExtensions> = {
	js: 'javascript',
	ts: 'typescript',
	md: 'markdown',
	html: 'html',
	css: 'css',
	java: 'java',
	py: 'python',
	sql: 'sql',
	txt: 'plaintext',
};

type Props = {
	content: string;
	onContentChange: (content: string) => void;
	onExtensionChange: (extension: Extension) => void;
	extension: Extension;
	autoFocus: boolean;
	lineWrap: boolean;
};

export function BloquinhoContentEditor(props: Props) {
	const { content, onContentChange, onExtensionChange, autoFocus, extension, lineWrap } = props;
	const activeLanguage = extensionMap[extension];

	return (
		<Editor
			height="100%"
			theme="light"
			onMount={(editor, monaco) => {
				autoFocus && editor.focus();
				editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
					editor.trigger('anyString', 'editor.action.quickCommand', {});
				});
				Object.values(extensions).forEach((ext) => {
					editor.addAction({
						id: `change-language-to-${ext.value}`,
						label: `Change language to: ${ext.displayName}`,
						run() {
							onExtensionChange(ext.value);
						},
					});
				});
			}}
			value={content}
			language={activeLanguage}
			onChange={(value) => onContentChange(value ?? '')}
			loading={<Loading />}
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
