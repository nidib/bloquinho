'use client';

import type { VariantProps } from 'class-variance-authority';
import type { ChangeEventHandler } from 'react';
import { cn, cva } from 'src/utils/classes';

const inputVariants = cva(
	[
		'text-ellipsis whitespace-nowrap overflow-hidden',
		'w-full bg-white text-zinc-700 max-w-full rounded-md shadow-sm placeholder-zinc-400 transition-all',
		'border border-zinc-200 ring-offset-white hover:border-zinc-300 focus-visible:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2',
	],
	{
		variants: {
			size: {
				default: 'text-sm px-3 py-2',
				lg: 'text-md px-4 py-3',
			},
		},
	},
);

type TextInputProps = {
	id?: string;
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	autoFocus?: boolean;
} & VariantProps<typeof inputVariants>;

export function TextInput({ size = 'default', ...props }: TextInputProps) {
	const { value, onChange, placeholder, autoFocus } = props;
	const className = cn(inputVariants({ size }));

	const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		onChange(e.target.value);
	};

	return (
		<input
			type="text"
			id={props.id}
			placeholder={placeholder}
			value={value}
			onChange={handleValueChange}
			// biome-ignore lint/a11y/noAutofocus: In some cases this makes sense
			autoFocus={autoFocus}
			className={className}
		/>
	);
}
