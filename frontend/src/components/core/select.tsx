import { styled } from '../../themes/theme';

const StyledSelect = styled('select', {
	minWidth: '60px',
	padding: '2px',
	borderRadius: '$rounded',
	fontFamily: '$mono',
	fontSize: '$textSmall',
	cursor: 'pointer',
	border: '1px solid $border',
	boxShadow: '$shadow',
	outline: 'none',
	color: '$textRegular',

	'&:focus-visible': {
		outline: '1px solid $border',
	},
});

const StyledLabel = styled('label', {
	fontFamily: '$mono',
	fontSize: '$textSmall',
	cursor: 'pointer',
});

type Props<T extends string> = {
	id: string;
	title: string;
	values: T[];
	selectedValue: T | null;
	defaultValue?: T;
	onChange: (value: T) => void;
};

export function Select<T extends string>(props: Props<T>) {
	const { id, title, values, defaultValue, selectedValue, onChange } = props;

	return (
		<div>
			<StyledLabel htmlFor={id}>{title}</StyledLabel>
			<StyledSelect id={id} value={selectedValue ?? defaultValue} onChange={(e) => onChange(e.target.value as T)}>
				{values.map((value) => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
			</StyledSelect>
		</div>
	);
}
