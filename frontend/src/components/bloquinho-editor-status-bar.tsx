import { SupportedExtensions, supportedExtensions } from '../apis/bloquinho/bloquinho-api';
import { styled } from '../themes/theme';
import { Select } from './core/select';

const LoadingIndicator = styled('div', {
	width: '15px',
	height: '15px',
	zIndex: 200,
	borderRadius: '10px',
	backgroundColor: '$outline',

	variants: {
		status: {
			loading: {
				backgroundColor: '$warning',
			},
			done: {
				backgroundColor: '$green',
			},
			error: {
				backgroundColor: '$error',
			},
		},
	},
});

const StatusBarBox = styled('div', {
	position: 'fixed',
	bottom: 0,
	left: 0,
	width: '100%',
	height: 36,
	padding: '$1',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	gap: '$1',
	backgroundColor: '#f5f5f5',
	color: '#6c6c6c',
	borderTop: '1px solid #ddd',
	'> div:not(:last-child)': {
		'&:after': {
			content: '|',
			color: '#ddd',
			paddingLeft: '$1',
		},
	},
});

export const StatusEnum = {
	LOADING: 'loading',
	DONE: 'done',
	ERROR: 'error',
} as const;

export type Status = (typeof StatusEnum)[keyof typeof StatusEnum];

type Props = {
	status: Status;
	extension: SupportedExtensions;
	onExtensionChange: (extension: SupportedExtensions) => void;
};

const options = [...supportedExtensions];
const titleByStatus: Record<Status, string> = {
	[StatusEnum.LOADING]: 'Carregando bloquinho...',
	[StatusEnum.DONE]: 'Bloquinho atualizado!',
	[StatusEnum.ERROR]: 'Algo deu errado!',
};

export function BloquinhoEditorStatusBar(props: Props) {
	const { status, extension, onExtensionChange } = props;
	const title = titleByStatus[status];

	return (
		<StatusBarBox>
			<Select
				id={'extension'}
				title={'Extension: '}
				values={options}
				onChange={onExtensionChange}
				selectedValue={extension}
			/>
			{status !== null ? <LoadingIndicator title={title} status={status} /> : null}
		</StatusBarBox>
	);
}
