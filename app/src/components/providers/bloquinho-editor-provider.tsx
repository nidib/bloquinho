'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from '@uidotdev/usehooks';
import { type ReactNode, createContext, useContext } from 'react';
import { BloquinhoApi } from 'src/lib/infra/api/bloquinho-api';
import type {
	EditableBloquinhoFields,
	Extension,
} from 'src/lib/types/bloquinho';
import { useFeatureFlags } from 'src/providers/feature-flags-provider';
import { asyncDebounce } from 'src/utils/functions';

const debouncedUpdate = asyncDebounce(BloquinhoApi.updateBloquinhoByTitle, 800);

const BloquinhoEditorContext = createContext<{
	status: 'error' | 'pending' | 'success';
	content: string;
	setContent: (content: string) => void;
	extension: Extension;
	setExtension: (extension: Extension) => void;
	lineWrap: boolean;
	enableLineWrap: VoidFunction;
	disableLineWrap: VoidFunction;
	showingPlayground: boolean;
	showPlayground: VoidFunction;
	hidePlayground: VoidFunction;
} | null>(null);

export function useBloquinhoEditorContext() {
	const ctx = useContext(BloquinhoEditorContext);

	if (!ctx) {
		throw new Error(
			`useBloquinhoEditorContext requires the provider: ${BloquinhoEditorContextProvider.name}`,
		);
	}

	return ctx;
}

type Props = {
	children: ReactNode;
	bloquinho: EditableBloquinhoFields & {
		title: string;
	};
};

export function BloquinhoEditorContextProvider(props: Props) {
	const isPlaygroundFeatureEnabled = useFeatureFlags().PLAYGROUND;
	const queryClient = useQueryClient();
	const { data: bloquinho } = useQuery({
		queryKey: ['bloquinho', props.bloquinho.title],
		initialData: props.bloquinho,
	});
	const mutation = useMutation({
		mutationFn: async (data: EditableBloquinhoFields) => {
			const updatedBloquinho = await debouncedUpdate(bloquinho.title, data);
			return {
				title: updatedBloquinho.title,
				content: updatedBloquinho.content,
				extension: updatedBloquinho.extension,
			};
		},
		onMutate: (soonToBeUpdatedBloquinho) => {
			queryClient.setQueryData(
				['bloquinho', props.bloquinho.title],
				(current: EditableBloquinhoFields) => ({
					...current,
					...soonToBeUpdatedBloquinho,
				}),
			);
		},
		onSuccess: (updatedBloquinho) => {
			queryClient.setQueryData<EditableBloquinhoFields>(
				['bloquinho', props.bloquinho.title],
				updatedBloquinho,
			);
		},
	});
	const [lineWrap, setLineWrap] = useLocalStorage('lineWrap', true);
	const [showPlaygroundLocal, setShowPlaygroundLocal] = useLocalStorage(
		'showPlayground',
		false,
	);
	const showingPlayground = isPlaygroundFeatureEnabled && showPlaygroundLocal;

	const enableLineWrap = () => setLineWrap(true);
	const disableLineWrap = () => setLineWrap(false);

	const showPlayground = () => setShowPlaygroundLocal(true);
	const hidePlayground = () => setShowPlaygroundLocal(false);

	const context = {
		status: mutation.status === 'idle' ? 'success' : mutation.status,
		content: bloquinho.content,
		setContent: (content: string) => {
			mutation.mutate({ content, extension: bloquinho.extension });
		},
		extension: bloquinho.extension,
		setExtension: (extension: Extension) => {
			mutation.mutate({ extension, content: bloquinho.content });
		},
		lineWrap,
		enableLineWrap,
		disableLineWrap,
		showingPlayground,
		showPlayground,
		hidePlayground,
	};

	return (
		<BloquinhoEditorContext.Provider value={context}>
			{props.children}
		</BloquinhoEditorContext.Provider>
	);
}
