'use client';

import { useQuery } from '@tanstack/react-query';
import { type ReactNode, useMemo, type CSSProperties } from 'react';
import { Playground } from 'src/components/bloquinho-editor/playground';
import { StatusBar } from 'src/components/bloquinho-editor/status-bar/status-bar';
import { ClientOnly } from 'src/components/client-only';
import { CodeEditor, type Language } from 'src/components/code-editor';
import {
	BloquinhoEditorContextProvider,
	useBloquinhoEditorContext,
} from 'src/components/providers/bloquinho-editor-provider';
import {
	EXECUTION_PARAM_EXTRACTOR_BY_EXTENSION,
	PistonApi,
} from 'src/lib/infra/api/piston-api';
import type {
	EditableBloquinhoFields,
	Extension,
} from 'src/lib/types/bloquinho';

type Props = EditableBloquinhoFields & {
	title: string;
};

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
					<div
						className="flex flex-1"
						style={{ '--playground-width': '500px' } as CSSProperties}
					>
						<BloquinhoCodeEditor />
						<IfShowingPlayground>
							<BloquinhoPlayground />
						</IfShowingPlayground>
					</div>
					<BloquinhoStatusBar />
				</BloquinhoEditorContextProvider>
			</ClientOnly>
		</div>
	);
}

function BloquinhoCodeEditor() {
	const { content, setContent, lineWrap, extension, showingPlayground } =
		useBloquinhoEditorContext();
	const languageByExtension: Record<Extension, Language> = {
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
			width={
				showingPlayground ? 'calc(100% - var(--playground-width))' : '100%'
			}
		/>
	);
}

function IfShowingPlayground({ children }: { children: ReactNode }) {
	const { showingPlayground } = useBloquinhoEditorContext();

	if (!showingPlayground) {
		return null;
	}

	return children;
}

function BloquinhoPlayground() {
	const { showPlayground, extension, content } = useBloquinhoEditorContext();
	const {
		execute,
		result,
		isExecuting,
		hasRuntimes,
		errorFetchingRuntimes,
		selectedRuntime,
	} = useExecutionResult(extension, content);
	const buttonLabel = useMemo(() => {
		if (!hasRuntimes) {
			return 'Carregando...';
		}

		if (!selectedRuntime) {
			return 'Extensão não suportada';
		}

		return isExecuting ? 'Executando...' : 'Executar';
	}, [hasRuntimes, isExecuting, selectedRuntime]);

	if (!showPlayground) {
		return null;
	}

	return (
		<Playground
			stdout={result?.run.stdout ?? ''}
			stderr={result?.run.stderr ?? ''}
			didError={result?.run.code !== undefined && result.run.code !== 0}
			executeButton={
				<Playground.ExecuteButton
					onRun={execute}
					disabled={
						errorFetchingRuntimes ||
						!hasRuntimes ||
						!selectedRuntime ||
						isExecuting
					}
				>
					{buttonLabel}
				</Playground.ExecuteButton>
			}
			runtimeDetails={selectedRuntime ?? undefined}
			errorMessage={
				errorFetchingRuntimes ? (
					<>
						Algo deu errado. <br /> Tente novamente mais tarde.
					</>
				) : null
			}
			className="w-[--playground-width]"
		/>
	);
}

function useAvailableRuntimes(extension: Extension) {
	// Avoids returning a new array on every render
	const initialData = useMemo(() => [], []);
	const { data = initialData, isError } = useQuery({
		queryKey: ['runtimes'],
		queryFn: async () => {
			return PistonApi.getRuntimes();
		},
		// 5 hours cache
		staleTime: 1000 * 60 * 60 * 5,
	});
	const executionParams = useMemo(() => {
		return (
			data.find(
				EXECUTION_PARAM_EXTRACTOR_BY_EXTENSION[extension] ?? (() => false),
			) ?? null
		);
	}, [data, extension]);

	return {
		selectedRuntime: executionParams,
		hasRuntimes: data.length > 0,
		isError,
	};
}

function useExecutionResult(extension: Extension, content: string) {
	const {
		hasRuntimes,
		selectedRuntime,
		isError: errorFetchingRuntimes,
	} = useAvailableRuntimes(extension);
	const { data, refetch, isFetching } = useQuery({
		queryKey: ['playground', extension],
		queryFn: async () => {
			if (!selectedRuntime) {
				throw new Error('No runtime available');
			}

			return PistonApi.execute(
				selectedRuntime.language,
				selectedRuntime.version,
				content,
			);
		},
		enabled: false,
	});

	return {
		result: data,
		execute: refetch,
		isExecuting: isFetching,
		selectedRuntime,
		hasRuntimes,
		errorFetchingRuntimes,
	};
}

function BloquinhoStatusBar() {
	const {
		status,
		lineWrap,
		enableLineWrap,
		disableLineWrap,
		extension,
		setExtension,
		showingPlayground,
		showPlayground,
		hidePlayground,
	} = useBloquinhoEditorContext();

	return (
		<StatusBar
			status={status}
			lineWrap={lineWrap}
			onLineWrapChange={(wrap) => (wrap ? enableLineWrap() : disableLineWrap())}
			extension={extension}
			onExtensionChange={setExtension}
			showPlayground={showingPlayground}
			onPlaygroundClick={(show) => {
				show ? showPlayground() : hidePlayground();
			}}
		/>
	);
}
