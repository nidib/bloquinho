import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { AxiosError } from 'axios';

import { CreatedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { createOrUpdateBloquinho, retrieveBloquinho } from '../apis/bloquinho/bloquinho-gateways';
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

type UsedBloquinhoProperties = Pick<CreatedBloquinho, 'title' | 'content'>;

export function BloquinhoEditorPage() {
	const { bloquinhoTitle } = useParams();
	const emptyBloquinho = { title: bloquinhoTitle, content: '' } as UsedBloquinhoProperties;
	const [bloquinho, setBloquinho] = useState<UsedBloquinhoProperties>(emptyBloquinho);
	const [status, setStatus] = useState<'saving' | 'saved' | null>(null);

	const handleBloquinhoInicialization = async () => {
		if (!bloquinhoTitle) {
			return;
		}

		try {
			const bloquinhoExistente = await retrieveBloquinho(bloquinhoTitle);

			if (!bloquinhoExistente) {
				return;
			}

			setStatus('saved');
			setBloquinho(bloquinhoExistente);
		} catch (e) {
			if (e instanceof AxiosError && e.response?.status === 404) {
				setBloquinho(emptyBloquinho);
				return;
			}

			throw e;
		}
	};

	const deboucedUpdateBloquinho = useCallback(debounce(async (title: string, content: string) => {
		await createOrUpdateBloquinho(title, content);
		setStatus('saved');
	}, 800), []);

	const handleContentChange = async (content: string) => {
		setStatus('saving');
		setBloquinho(current => ({
			...current,
			content,
		}));
		await deboucedUpdateBloquinho(bloquinho.title, content);
	};

	useEffect(() => {
		handleBloquinhoInicialization();
	}, []);

	return (
		<Box>
			{ status !== null ? <LoadingIndicator status={status} /> : null}
			<BloquinhoEditor
				content={bloquinho.content}
				onContentChange={handleContentChange}
				autoFocus
			/>
		</Box>
	);
}
