import { ReactNode } from 'react';
import { styled } from '../../themes/theme';

const StyledButton = styled('button', {
	padding: '$1 $3',
	fontSize: '$0',
	backgroundColor: '$fullWhite',
	color: '$textRegular',
	border: '1px solid $border',
	borderRadius: '$rounded',
	cursor: 'pointer',
	boxShadow: '$shadow',
	transition: 'all ease 100ms',

	'&:hover': {
		backgroundColor: '$border',
	},
});

type ButtonProps = {
	children?: ReactNode;
	type?: 'button' | 'submit';
};

export function Button(props: ButtonProps) {
	const {
		type = 'submit',
		children,
	} = props;

	return (
		<StyledButton type={type}>
			{ children }
		</StyledButton>
	);
}
