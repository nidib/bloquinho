import { styled } from '../themes/theme';


const Textarea = styled('textarea', {
	border: 0,
	borderRadius: 0,
	resize: 'none',
	display: 'block',
	outline: 'none',
	width: '100%',
	height: '100%',
	fontSize: '$0',
	padding: '$1',
});

type BloquinhoEditorProps = {
	content: string;
	onContentChange: (content: string) => void;
};

export function BloquinhoEditor(props: BloquinhoEditorProps) {
	const { content, onContentChange } = props;

	return (
		<Textarea
			value={content}
			onChange={e => onContentChange(e.target.value)}
		/>
	);
}
