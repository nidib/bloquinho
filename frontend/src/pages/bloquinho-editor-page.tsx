import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { CreatedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { createOrUpdateBloquinho, retrieveBloquinhoIgnoringNotFound } from '../apis/bloquinho/bloquinho-gateways';
import { BloquinhoEditor } from '../components/bloquinho-editor';
import { styled } from '../themes/theme';

const Box = styled('div', {
	height: '100%',
	position: 'relative',
});

const LoadingIndicator = styled('div', {
	position: 'absolute',
	top: '$1',
	right: '$1',
	width: '15px',
	height: '15px',
	borderRadius: '10px',
	backgroundColor: '$outline',

	variants: {
		status: {
			saving: {
				backgroundColor: '$warning',
			},
			saved: {
				backgroundColor: '$green',
			},
		},
	},
});

type BloquinhoEditorPageParams = { bloquinhoTitle: string };
type InitialBloquinhoProperties = Pick<CreatedBloquinho, 'title' | 'content'>;

export function BloquinhoEditorPage() {
	const { bloquinhoTitle: title } = useParams() as BloquinhoEditorPageParams;
	const initialBloquinho = { title, content: '' };
	const [bloquinho, setBloquinho] = useState<InitialBloquinhoProperties | CreatedBloquinho>(initialBloquinho);
	const [status, setStatus] = useState<'saving' | 'saved' | null>(null);

	const lazyCreateOrUpdateBloquinho = useMemo(() => {
		return debounce(async (title: string, content: string) => {
			await createOrUpdateBloquinho(title, content);
			setStatus('saved');
		}, 800);
	}, []);

	const handleContentChange = async (content: string) => {
		setStatus('saving');
		setBloquinho((current) => ({
			...current,
			content,
		}));
		await lazyCreateOrUpdateBloquinho(bloquinho.title, content);
	};

	useEffect(() => {
		const handleBloquinhoInicialization = async () => {
			const bloquinhoExistente = await retrieveBloquinhoIgnoringNotFound(title);

			if (!bloquinhoExistente) {
				return;
			}

			setStatus('saved');
			setBloquinho(bloquinhoExistente);
		};

		void handleBloquinhoInicialization();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box>
			{status !== null ? <LoadingIndicator status={status} /> : null}
			<BloquinhoEditor content={bloquinho.content} onContentChange={handleContentChange} autoFocus />
		</Box>
	);
}
