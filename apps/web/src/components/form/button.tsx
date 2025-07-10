'use client';

import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn, cva } from 'src/utils/classes';

const buttonVariants = cva(
	[
		'flex items-center justify-center min-w-fit border',
		'font-semibold rounded-md disabled:pointer-events-none transition-all',
		'disabled:opacity-40 disabled:cursor-not-allowed select-none',
		'focus:visible:outline-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2',
	],
	{
		variants: {
			variant: {
				primary: 'text-white bg-zinc-800 border-zinc-800 hover:opacity-90',
				secondary:
					'shadow-xs text-zinc-800 bg-white border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200 data-[state=open]:border-zinc-300 data-[state=open]:bg-zinc-200',
			},
			size: {
				default: 'text-sm px-3 py-2',
				lg: 'text-md px-4 py-3',
			},
		},
	},
);

type Props = {
	children: ReactNode;
	type?: 'button' | 'submit';
	disabled?: boolean;
	onClick?: VoidFunction;
} & VariantProps<typeof buttonVariants>;

export function Button({
	type = 'button',
	disabled = false,
	variant = 'primary',
	size = 'default',
	...props
}: Props) {
	const classNames = cn(buttonVariants({ size, variant }));

	return (
		<button
			type={type}
			disabled={disabled}
			className={classNames}
			onClick={props.onClick}
			{...props}
		>
			{props.children}
		</button>
	);
}
