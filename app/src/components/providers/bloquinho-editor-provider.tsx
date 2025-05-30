'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocalStorage } from '@uidotdev/usehooks';
import { type ReactNode, createContext, useContext } from 'react';
import { Api } from 'src/lib/client/client-api';
import type {
	EditableBloquinhoFields,
	Extension,
} from 'src/lib/types/bloquinho';
import { asyncDebounce } from 'src/utils/functions';

const debouncedUpdate = asyncDebounce(
	Api.Bloquinho.updateBloquinhoByTitle,
	800,
);

const BloquinhoEditorContext = createContext<{
	status: 'error' | 'pending' | 'success';
	content: string;
	setContent: (content: string) => void;
	extension: Extension;
	setExtension: (extension: Extension) => void;
	lineWrap: boolean;
	enableLineWrap: VoidFunction;
	disableLineWrap: VoidFunction;
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

export function BloquinhoEditorContextProvider(props: {
	children: ReactNode;
	bloquinho: EditableBloquinhoFields & {
		title: string;
	};
}) {
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

	const enableLineWrap = () => setLineWrap(true);
	const disableLineWrap = () => setLineWrap(false);

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
	};

	return (
		<BloquinhoEditorContext.Provider value={context}>
			{props.children}
		</BloquinhoEditorContext.Provider>
	);
}
