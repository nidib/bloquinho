import { useLocalStorage } from 'usehooks-ts';
import { PersistedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { Extension } from '../utils/constants/extensions';
import { BloquinhoContentEditor } from './bloquinho-content-editor';
import { Status, StatusBar } from './status-bar';

type Props = {
	title: string;
	content: string;
	extension: Extension;
	status: Status;
	watchers: number;
	onSave: (bloquinho: Partial<PersistedBloquinho>) => void;
};

export function BloquinhoEditor(props: Props) {
	const { content, extension, status, watchers, onSave } = props;
	const [lineWrap, setLineWrap] = useLocalStorage('lineWrap', true);

	const handleLineWrapChange = (lineWrap: boolean) => {
		setLineWrap(lineWrap);
	};

	const handleContentChange = (content: string) => {
		onSave({ content });
	};

	const handleExtensionChange = (extension: Extension) => {
		onSave({ extension });
	};

	return (
		<div className="w-full flex flex-col">
			<div className="h-full max-h-[calc(100%-36px)]">
				<BloquinhoContentEditor
					extension={extension}
					lineWrap={lineWrap}
					content={content}
					onContentChange={handleContentChange}
					autoFocus
				/>
			</div>
			<StatusBar
				lineWrap={lineWrap}
				onLineWrapChange={handleLineWrapChange}
				status={status}
				extension={extension}
				watchers={watchers}
				onExtensionChange={handleExtensionChange}
			/>
		</div>
	);
}
