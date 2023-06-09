import { styled } from '../themes/theme';

const LoadingIndicator = styled('div', {
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
	backgroundColor: '#f5f5f5',
	color: '#6c6c6c',
	borderTop: '1px solid #ddd',
});

type Props = {
	status: 'saving' | 'saved' | 'error' | null;
};

export function BloquinhoEditorStatusBar(props: Props) {
	const { status } = props;

	return <StatusBarBox>{status !== null ? <LoadingIndicator status={status} /> : null}</StatusBarBox>;
}
