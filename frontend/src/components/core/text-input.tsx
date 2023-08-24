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
			className="bg-white text-zinc-800 px-4 py-3 min-w-[300px] max-w-full border border-zinc-200 rounded focus:outline-1 focus:outline-zinc-200 shadow-sm placeholder-zinc-400"
		/>
	);
}
