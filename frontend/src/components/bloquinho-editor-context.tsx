import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { NewBloquinho, PersistedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { Extension } from '../utils/constants/extensions';
import { Status, StatusEnum } from './status-bar';
import { debounce, merge } from 'lodash';
import { createOrUpdateBloquinho, retrieveOrCreateBloquinho } from '../apis/bloquinho/bloquinho-gateways';

type BloquinhoEditorContext = {
	status: Status;
	bloquinho: PersistedBloquinho | NewBloquinho;
	updateBloquinho: (blk: Partial<PersistedBloquinho>) => void;
	getOrCreateBloquinho: () => Promise<void>;
	changeContent: (content: string) => void;
	changeExtension: (extension: Extension) => void;
};

const BloquinhoEditorContext = createContext<null | BloquinhoEditorContext>(null);

export function BloquinhoEditorContextProvider(props: { title: string; children: ReactNode }) {
	const [status, setStatus] = useState<Status>(StatusEnum.LOADING);
	const [bloquinho, setBloquinho] = useState<PersistedBloquinho | NewBloquinho>({
		title: props.title,
		content: '',
		extension: 'txt',
	});

	const saveBloquinho = useMemo(() => {
		return debounce((title: string, content: string, extension: Extension) => {
			createOrUpdateBloquinho(title, content, extension)
				.then(() => setStatus(StatusEnum.DONE))
				.catch(() => setStatus(StatusEnum.ERROR));
		}, 800);
	}, []);

	const getOrCreateBloquinho = useCallback(async () => {
		try {
			const existingBloquinho = await retrieveOrCreateBloquinho(props.title);

			if (!existingBloquinho) {
				return;
			}

			setBloquinho(existingBloquinho);
			setStatus(StatusEnum.DONE);
		} catch (e) {
			setStatus(StatusEnum.ERROR);
		}
	}, [props.title]);

	const updateBloquinho = useCallback(
		(blk: Partial<PersistedBloquinho> = {}) => {
			setStatus(StatusEnum.LOADING);
			setBloquinho((current) => {
				const newBloquinho = merge(current, blk);

				saveBloquinho.cancel();
				saveBloquinho(newBloquinho.title, newBloquinho.content, newBloquinho.extension);

				return newBloquinho;
			});
		},
		[saveBloquinho]
	);

	const changeContent = useCallback(
		(content: string) => {
			updateBloquinho({ content });
		},
		[updateBloquinho]
	);

	const changeExtension = useCallback(
		(extension: Extension) => {
			updateBloquinho({ extension });
		},
		[updateBloquinho]
	);

	return (
		<BloquinhoEditorContext.Provider
			value={{ status, bloquinho, updateBloquinho, getOrCreateBloquinho, changeContent, changeExtension }}
		>
			{props.children}
		</BloquinhoEditorContext.Provider>
	);
}

export function useBloquinhoEditorContext() {
	const ctx = useContext(BloquinhoEditorContext);

	if (!ctx) {
		throw new Error();
	}

	return ctx;
}
