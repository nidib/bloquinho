import { debounce, merge } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { NewBloquinho, PersistedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { Status, StatusEnum } from '../components/status-bar';
import { BloquinhoEditor } from '../components/bloquinho-editor';
import { useCommandS } from '../utils/hooks/use-command-s';
import { createOrUpdateBloquinho, retrieveOrCreateBloquinho } from '../apis/bloquinho/bloquinho-gateways';
import { Extension } from '../utils/constants/extensions';
import loading from '../assets/loading.svg';

const useBloquinhoEditorPageParams = () => useParams() as { title: string };

const useBloquinho = (title: string) => {
	const [status, setStatus] = useState<Status>(StatusEnum.LOADING);
	const [bloquinho, setBloquinho] = useState<PersistedBloquinho | NewBloquinho>({
		title,
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
			const existingBloquinho = await retrieveOrCreateBloquinho(title);

			if (!existingBloquinho) {
				return;
			}

			setBloquinho(existingBloquinho);
			setStatus(StatusEnum.DONE);
		} catch (e) {
			setStatus(StatusEnum.ERROR);
		}
	}, [title]);

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

	return [
		{ bloquinho, status },
		{ getOrCreateBloquinho, updateBloquinho },
	] as const;
};

export function BloquinhoEditorPage() {
	const { title } = useBloquinhoEditorPageParams();
	const [{ bloquinho, status }, { getOrCreateBloquinho, updateBloquinho }] = useBloquinho(title);

	useCommandS(updateBloquinho);

	useEffect(() => {
		void getOrCreateBloquinho();
	}, [getOrCreateBloquinho]);

	return (
		<div className="h-[100svh] flex justify-center">
			{!bloquinho.id ? (
				<img src={loading} width={40} />
			) : (
				<BloquinhoEditor
					title={bloquinho.title}
					content={bloquinho.content}
					extension={bloquinho.extension}
					status={status}
					onSave={updateBloquinho}
				/>
			)}
		</div>
	);
}
