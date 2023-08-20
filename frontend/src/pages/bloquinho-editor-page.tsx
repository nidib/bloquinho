import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { styled } from '../themes/theme';
import { PersistedBloquinho, NewBloquinho } from '../apis/bloquinho/bloquinho-api';
import { createOrUpdateBloquinho, retrieveBloquinhoIgnoringNotFound } from '../apis/bloquinho/bloquinho-gateways';
import { BloquinhoEditor } from '../components/bloquinho-editor';
import { BloquinhoEditorStatusBar, Status, StatusEnum } from '../components/bloquinho-editor-status-bar';
import { Extension } from '../utils/constants/extensions';

const Box = styled('div', {
	height: '100%',
	position: 'relative',
});

const BloquinhoEditorBox = styled('div', {
	height: '100%',
	paddingBottom: 36,
});

type BloquinhoEditorPageParams = { bloquinhoTitle: string };

export function BloquinhoEditorPage() {
	const { bloquinhoTitle: title } = useParams() as BloquinhoEditorPageParams;
	const [bloquinho, setBloquinho] = useState<NewBloquinho | PersistedBloquinho>({
		title,
		content: '',
		extension: 'txt',
	});
	const [status, setStatus] = useState<Status>(StatusEnum.LOADING);

	const lazyCreateOrUpdateBloquinho = useMemo(() => {
		return debounce((title: string, content: string, extension: Extension) => {
			createOrUpdateBloquinho(title, content, extension)
				.then(() => setStatus(StatusEnum.DONE))
				.catch(() => setStatus(StatusEnum.ERROR));
		}, 800);
	}, []);

	const handleExtensionChange = (extension: Extension) => {
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
		document.addEventListener('keydown', handleSavingFromKeyboard);

		retrieveBloquinhoIgnoringNotFound(title)
			.then((bloquinhoExistente) => {
				if (!bloquinhoExistente) {
					return;
				}

				setBloquinho(bloquinhoExistente);
			})
			.catch(() => setStatus(StatusEnum.ERROR));

		return () => {
			document.removeEventListener('keydown', handleSavingFromKeyboard);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setStatus(StatusEnum.LOADING);

		lazyCreateOrUpdateBloquinho(bloquinho.title, bloquinho.content, bloquinho.extension);
	}, [bloquinho, lazyCreateOrUpdateBloquinho]);

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
