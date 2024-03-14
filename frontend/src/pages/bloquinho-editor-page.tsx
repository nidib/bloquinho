import { debounce, merge, throttle } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { NewBloquinho, PersistedBloquinho, webSocketURL } from '../apis/bloquinho/bloquinho-api';
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

type WSClient = {
	id: string;
	coord: {
		x: number;
		y: number;
	};
};

const useClientsWithCoords = (title: string) => {
	const [clients, setClients] = useState<WSClient[]>([]);

	useEffect(() => {
		const clientId = crypto.randomUUID();
		const ws = new WebSocket(`${webSocketURL}/${title}/${clientId}`);

		const onMouseMove = throttle((e: MouseEvent) => {
			ws.send(JSON.stringify({ coord: { x: e.clientX, y: e.clientY } }));
		}, 1000);

		ws.addEventListener('open', () => {
			ws.send(JSON.stringify({ coord: { x: 0, y: 0 } }));
			document.addEventListener('mousemove', onMouseMove);
		});
		ws.addEventListener('error', (e) => {
			console.error(e);
		});
		ws.addEventListener('message', (e) => {
			const data = JSON.parse(e.data as string) as WSClient[];

			setClients(data);
		});

		return () => {
			ws.close();
			document.removeEventListener('mousemove', onMouseMove);
		};
	}, [title]);

	return {
		clients,
	};
};

export function BloquinhoEditorPage() {
	const { title } = useBloquinhoEditorPageParams();
	const [{ bloquinho, status }, { getOrCreateBloquinho, updateBloquinho }] = useBloquinho(title);
	const { clients } = useClientsWithCoords(title);

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
					watchers={clients.length}
					onSave={updateBloquinho}
				/>
			)}
		</div>
	);
}
