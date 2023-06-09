import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { CreatedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { createOrUpdateBloquinho, retrieveBloquinhoIgnoringNotFound } from '../apis/bloquinho/bloquinho-gateways';
import { BloquinhoEditor } from '../components/bloquinho-editor';
import { styled } from '../themes/theme';
import { BloquinhoEditorStatusBar } from '../components/bloquinho-editor-status-bar';

const Box = styled('div', {
	height: '100%',
	position: 'relative',
});

const BloquinhoEditorBox = styled('div', {
	height: '100%',
	paddingBottom: 36,
});

type BloquinhoEditorPageParams = { bloquinhoTitle: string };
type InitialBloquinhoProperties = Pick<CreatedBloquinho, 'title' | 'content'>;

export function BloquinhoEditorPage() {
	const { bloquinhoTitle: title } = useParams() as BloquinhoEditorPageParams;
	const initialBloquinho = { title, content: '' };
	const [bloquinho, setBloquinho] = useState<InitialBloquinhoProperties | CreatedBloquinho>(initialBloquinho);
	const [status, setStatus] = useState<'saving' | 'saved' | 'error' | null>(null);

	const lazyCreateOrUpdateBloquinho = useMemo(() => {
		return debounce((title: string, content: string) => {
			createOrUpdateBloquinho(title, content)
				.then(() => setStatus('saved'))
				.catch(() => setStatus('error'));
		}, 800);
	}, []);

	const handleContentChange = (content: string) => {
		setStatus('saving');
		setBloquinho((current) => ({
			...current,
			content,
		}));
		lazyCreateOrUpdateBloquinho(bloquinho.title, content);
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
			<BloquinhoEditorBox>
				<BloquinhoEditor content={bloquinho.content} onContentChange={handleContentChange} autoFocus />
			</BloquinhoEditorBox>
			<BloquinhoEditorStatusBar status={status} />
		</Box>
	);
}
