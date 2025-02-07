import type { ChangeEventHandler } from 'react';
import { cn } from 'src/utils/classes';

type TextInputProps = {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	autoFocus?: boolean;
};

export function TextInput(props: TextInputProps) {
	const { value, onChange, placeholder, autoFocus } = props;

	const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		onChange(e.target.value);
	};

	return (
		<input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={handleValueChange}
			// biome-ignore lint/a11y/noAutofocus: In some cases this makes sense
			autoFocus={autoFocus}
			className={cn(
				'bg-white text-zinc-700 px-4 py-3 min-w-[300px] max-w-full rounded-md shadow-sm placeholder-zinc-400 transition-all',
				'border border-zinc-200 ring-offset-background hover:border-zinc-300 focus-visible:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2',
			)}
		/>
	);
}
