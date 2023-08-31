import clsx from 'clsx';
import { ChangeEventHandler } from 'react';

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
		<input
			type={'text'}
			placeholder={placeholder}
			value={value}
			onChange={handleValueChange}
			autoFocus={autoFocus}
			className={clsx([
				'bg-white',
				'text-zinc-700',
				'px-4',
				'py-3',
				'min-w-[300px]',
				'max-w-full',
				'rounded',
				'outline-none',
				'ring-1',
				'ring-zinc-200',
				'focus-visible:ring-zinc-300',
				'shadow-sm',
				'placeholder-zinc-400',
				'transition-all',
			])}
		/>
	);
}
