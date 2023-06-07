import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { CreatedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { createBloquinho, getBloquinho, updateBloquinho } from '../apis/bloquinho/bloquinho-gateways';
import { BloquinhoEditor } from '../components/bloquinho-editor';
import { Optional } from '../utils/types';
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

export function BloquinhoEditorPage() {
	const { bloquinhoTitle } = useParams();
	const [bloquinho, setBloquinho] = useState<Optional<CreatedBloquinho>>(null);
	const [status, setStatus] = useState<'saving' | 'saved' | null>(null);	

	const handleBloquinhoInicialization = async () => {
		if (!bloquinhoTitle) {
			return;
		}

		let bloquinhoNovoOuExistente = await getBloquinho(bloquinhoTitle);

		if (!bloquinhoNovoOuExistente) {
			bloquinhoNovoOuExistente = await createBloquinho(bloquinhoTitle, '');
		}

		setStatus('saved');
		setBloquinho(bloquinhoNovoOuExistente);
	};

	const saveBloquinho = useCallback(debounce(async (id: string, content: string) => {
		await updateBloquinho(id, content);
		setStatus('saved');
	}, 800), []);

	useEffect(() => {
		handleBloquinhoInicialization();
	}, []);

	const handleContentChange = async (newContent: string) => {
		if (!bloquinho) {
			return;
		}

		setStatus('saving');
		setBloquinho(current => {
			if (!current) {
				return current;
			}

			return {
				...current,
				content: newContent,
			};
		});
		await saveBloquinho(bloquinho.id, newContent);
	};

	if (!bloquinho) {
		return null;
	}

	return (
		<Box>
			{ status !== null ? <LoadingIndicator status={status} /> : null}
			<BloquinhoEditor
				content={bloquinho.content}
				onContentChange={handleContentChange}
			/>
		</Box>
	);
}
