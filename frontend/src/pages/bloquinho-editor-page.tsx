import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BloquinhoEditor } from '../components/bloquinho-editor';
import { useCommandS } from '../utils/hooks/use-command-s';
import { Loading } from '../components/core/loading';
import { BloquinhoEditorContextProvider, useBloquinhoEditorContext } from '../components/bloquinho-editor-context';

const useBloquinhoEditorPageParams = () => useParams() as { title: string };

function BloquinhoEditorPageWithContext() {
	const { bloquinho, status, updateBloquinho, getOrCreateBloquinho, changeContent, changeExtension } =
		useBloquinhoEditorContext();

	useCommandS(updateBloquinho);

	useEffect(() => {
		void getOrCreateBloquinho();
	}, [getOrCreateBloquinho]);

	return (
		<div className="h-[100svh] flex justify-center">
			{!bloquinho.id ? (
				<Loading />
			) : (
				<BloquinhoEditor
					title={bloquinho.title}
					content={bloquinho.content}
					extension={bloquinho.extension}
					status={status}
					onContentChange={changeContent}
					onExtensionChange={changeExtension}
				/>
			)}
		</div>
	);
}

export function BloquinhoEditorPage() {
	const { title } = useBloquinhoEditorPageParams();

	return (
		<BloquinhoEditorContextProvider title={title}>
			<BloquinhoEditorPageWithContext />
		</BloquinhoEditorContextProvider>
	);
}
