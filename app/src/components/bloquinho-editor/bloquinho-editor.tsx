'use client';

import {
	BloquinhoEditorContextProvider,
	type EditableBloquinho,
	useBloquinhoEditorContext,
} from 'src/components/bloquinho-editor/context';
import { StatusBar } from 'src/components/bloquinho-editor/status-bar/status-bar';
import { ClientOnly } from 'src/components/client-only';
import { CodeEditor, type Language } from 'src/components/code-editor';

type Props = EditableBloquinho & {};

export function BloquinhoEditor(props: Props) {
	const bloquinho = {
		title: props.title,
		content: props.content,
		extension: props.extension,
	};

	return (
		<div className="h-[100dvh] flex flex-col">
			<ClientOnly>
				<BloquinhoEditorContextProvider bloquinho={bloquinho}>
					<BloquinhoCodeEditor />
					<BloquinhoStatusBar />
				</BloquinhoEditorContextProvider>
			</ClientOnly>
		</div>
	);
}

function BloquinhoCodeEditor() {
	const { content, setContent, lineWrap, extension } =
		useBloquinhoEditorContext();
	const languageByExtension: Record<EditableBloquinho['extension'], Language> =
		{
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

	return (
		<CodeEditor
			value={content}
			onChange={setContent}
			lineWrap={lineWrap}
			language={languageByExtension[extension]}
		/>
	);
}

function BloquinhoStatusBar() {
	const { lineWrap, enableLineWrap, disableLineWrap, extension, setExtension } =
		useBloquinhoEditorContext();

	return (
		<StatusBar
			status="error"
			lineWrap={lineWrap}
			onLineWrapChange={(wrap) => (wrap ? enableLineWrap() : disableLineWrap())}
			extension={extension}
			onExtensionChange={setExtension}
		/>
	);
}
