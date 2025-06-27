import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

import { cn } from 'src/utils/classes';

const textareaVariants = cva(
	[
		'w-full bg-white text-zinc-700 max-w-full rounded-md shadow-sm placeholder-zinc-400 transition-all',
		'border border-zinc-200 ring-offset-white hover:border-zinc-300 focus:ring-0 focus-visible:border-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2',
	],
	{
		variants: {
			size: {
				default: 'text-sm px-3 py-2',
				lg: 'text-md px-4 py-3',
			},
			error: {
				true: 'border-red-200 hover:border-red-300 focus-visible:border-red-700 focus-visible:ring-red-700',
			},
		},
	},
);

type Props = {
	value: string;
	onChange: (value: string) => void;
	id?: string;
	className?: string;
	placeholder?: string;
	errorMessage?: string;
} & Pick<VariantProps<typeof textareaVariants>, 'size'>;

export function Textarea({ size = 'default', errorMessage, ...props }: Props) {
	const className = cn(
		textareaVariants({ size, error: Boolean(errorMessage) }),
		props.className,
	);

	return (
		<div className="w-full h-full flex flex-col items-start justify-center gap-1">
			<textarea
				value={props.value}
				onChange={e => props.onChange(e.currentTarget.value)}
				id={props.id}
				placeholder={props.placeholder}
				className={className}
			/>
			{Boolean(errorMessage) && (
				<span className="text-sm text-red-500">{errorMessage}</span>
			)}
		</div>
	);
}
