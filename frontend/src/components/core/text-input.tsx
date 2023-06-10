import { ChangeEventHandler } from 'react';
import { styled } from '../../themes/theme';

const Input = styled('input', {
	backgroundColor: '$fullWhite',
	color: '$textRegular',
	width: '300px',
	maxWidth: '100%',
	padding: '$1 $2',
	fontSize: '$0',
	border: '1px solid $border',
	borderRadius: '$rounded',
	boxShadow: '$shadow',
	outline: 'none',

	'&:focus-visible': {
		outline: '1px solid $border',
	},

	'&::placeholder': {
		color: '$placeholder',
	},
});

type TextInputProps = {
	value: string;
	placeholder?: string;
	info?: string;
	onChange: (value: string) => void;
	autoFocus: boolean;
};

export function TextInput(props: TextInputProps) {
	const { value, onChange, placeholder, autoFocus } = props;

	const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		onChange(e.target.value);
	};

	return (
		<Input
			type={'text'}
			placeholder={placeholder}
			value={value}
			onChange={handleValueChange}
			autoFocus={autoFocus}
		/>
	);
}
