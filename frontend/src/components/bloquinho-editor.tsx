import { useLocalStorage } from 'usehooks-ts';

import { Extension } from '../utils/constants/extensions';
import { BloquinhoContentEditor } from './bloquinho-content-editor';
import { Status, StatusBar } from './status-bar';

type Props = {
	title: string;
	content: string;
	extension: Extension;
	status: Status;
	onContentChange: (content: string) => void;
	onExtensionChange: (extension: Extension) => void;
};

export function BloquinhoEditor(props: Props) {
	const { content, extension, status, onContentChange, onExtensionChange } = props;
	const [lineWrap, setLineWrap] = useLocalStorage('lineWrap', true);

	const handleLineWrapChange = (lineWrap: boolean) => {
		setLineWrap(lineWrap);
	};

	return (
		<div className="w-full flex flex-col">
			<div className="h-full max-h-[calc(100%-36px)]">
				<BloquinhoContentEditor
					extension={extension}
					lineWrap={lineWrap}
					content={content}
					onContentChange={onContentChange}
					onExtensionChange={onExtensionChange}
					autoFocus
				/>
			</div>
			<StatusBar
				lineWrap={lineWrap}
				onLineWrapChange={handleLineWrapChange}
				status={status}
				extension={extension}
				onExtensionChange={onExtensionChange}
			/>
		</div>
	);
}
