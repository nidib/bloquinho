import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { CreatedBloquinho, SupportedExtensions } from '../apis/bloquinho/bloquinho-api';
import { createOrUpdateBloquinho, retrieveBloquinhoIgnoringNotFound } from '../apis/bloquinho/bloquinho-gateways';
import { BloquinhoEditor } from '../components/bloquinho-editor';
import { styled } from '../themes/theme';
import { BloquinhoEditorStatusBar, Status } from '../components/bloquinho-editor-status-bar';

const Box = styled('div', {
	height: '100%',
	position: 'relative',
});

const BloquinhoEditorBox = styled('div', {
	height: '100%',
	paddingBottom: 36,
});

type BloquinhoEditorPageParams = { bloquinhoTitle: string };
type InitialBloquinhoProperties = Pick<CreatedBloquinho, 'title' | 'content' | 'extension'>;

export function BloquinhoEditorPage() {
	const { bloquinhoTitle: title } = useParams() as BloquinhoEditorPageParams;
	const [bloquinho, setBloquinho] = useState<InitialBloquinhoProperties | CreatedBloquinho>({
		title,
		content: '',
		extension: 'txt',
	} satisfies InitialBloquinhoProperties);
	const [status, setStatus] = useState<Status>('loading');

	const lazyCreateOrUpdateBloquinho = useMemo(() => {
		return debounce((title: string, content: string, extension: SupportedExtensions) => {
			createOrUpdateBloquinho(title, content, extension)
				.then(() => setStatus('done'))
				.catch(() => setStatus('error'));
		}, 800);
	}, []);

	const handleExtensionChange = (extension: SupportedExtensions) => {
		setBloquinho((current) => ({
			...current,
			extension,
		}));
	};

	const handleContentChange = (content: string) => {
		setBloquinho((current) => ({
			...current,
			content,
		}));
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
		setStatus('loading');
		lazyCreateOrUpdateBloquinho(bloquinho.title, bloquinho.content, bloquinho.extension);
	}, [bloquinho, lazyCreateOrUpdateBloquinho]);

	useEffect(() => {
		document.addEventListener('keydown', handleSavingFromKeyboard);

		const handleBloquinhoInicialization = async () => {
			const bloquinhoExistente = await retrieveBloquinhoIgnoringNotFound(title);

			if (!bloquinhoExistente) {
				return;
			}

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
				<BloquinhoEditor
					extension={bloquinho.extension}
					content={bloquinho.content}
					onContentChange={handleContentChange}
					autoFocus
				/>
			</BloquinhoEditorBox>
			<BloquinhoEditorStatusBar
				status={status}
				extension={bloquinho.extension}
				onExtensionChange={handleExtensionChange}
			/>
		</Box>
	);
}
