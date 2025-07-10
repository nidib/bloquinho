import type { ChangeEventHandler, ComponentProps } from 'react';

import { cva } from 'src/utils/classes';

const inputVariants = cva(
	['file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'],
	{
		variants: {
			size: {
				default: 'text-sm px-3 py-2',
				lg: 'h-12.5 text-md px-4 py-3 rounded-md',
			},
		},
	},
);

type Props = {
	value: string;
	onChange: (value: string) => void;
	id?: string;
	size?: 'lg' | 'default';
} & Pick<ComponentProps<'input'>, 'type' | 'disabled' | 'autoFocus' | 'className' | 'placeholder'>;

function Input({ type = 'text', className, value, onChange, size = 'default', ...props }: Props) {
	const handleValueChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		onChange(e.target.value);
	};

	return (
		<input
			{...props}
			type={type}
			data-slot="input"
			className={inputVariants({ size, className })}
			value={value}
			onChange={handleValueChange}
		/>
	);
}

export { Input };
