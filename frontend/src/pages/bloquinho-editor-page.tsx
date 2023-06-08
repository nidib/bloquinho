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
	zIndex: 200,
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

	const handleSavingFromKeyboard = (e: KeyboardEvent) => {
		const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;
		const isSPressed = e.key === 's';

		if (!isCtrlOrCmdPressed || !isSPressed) {
			return;
		}

		e.preventDefault();
	};

	useEffect(() => {
		document.addEventListener('keydown', handleSavingFromKeyboard);

		const handleBloquinhoInicialization = async () => {
			const bloquinhoExistente = await retrieveBloquinhoIgnoringNotFound(title);

			if (!bloquinhoExistente) {
				return;
			}

			setStatus('saved');
			setBloquinho(bloquinhoExistente);
		};

		void handleBloquinhoInicialization();

		return () => {
			document.removeEventListener('keydown', handleSavingFromKeyboard);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box>
			{status !== null ? <LoadingIndicator status={status} /> : null}
			<BloquinhoEditor content={bloquinho.content} onContentChange={handleContentChange} autoFocus />
		</Box>
	);
}
