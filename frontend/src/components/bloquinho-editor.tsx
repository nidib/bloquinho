import { PersistedBloquinho } from '../apis/bloquinho/bloquinho-api';
import { styled } from '../themes/theme';
import { Extension } from '../utils/constants/extensions';
import { BloquinhoContentEditor } from './bloquinho-content-editor';
import { Status, StatusBar } from './status-bar';

type Props = {
	title: string;
	content: string;
	extension: Extension;
	status: Status;
	onSave: (bloquinho: Partial<PersistedBloquinho>) => void;
};

export function BloquinhoEditor(props: Props) {
	const { content, extension, status, onSave } = props;

	const handleContentChange = (content: string) => {
		onSave({ content });
	};

	const handleExtensionChange = (extension: Extension) => {
		onSave({ extension });
	};

	return (
		<Box>
			<BloquinhoEditorBox>
				<BloquinhoContentEditor
					extension={extension}
					content={content}
					onContentChange={handleContentChange}
					autoFocus
				/>
			</BloquinhoEditorBox>
			<StatusBar status={status} extension={extension} onExtensionChange={handleExtensionChange} />
		</Box>
	);
}

const Box = styled('div', {
	height: '100%',
	flex: 1,
	position: 'relative',
});

const BloquinhoEditorBox = styled('div', {
	height: '100%',
	paddingBottom: 36,
});
