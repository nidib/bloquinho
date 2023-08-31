import { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
	children?: ReactNode;
	type?: 'button' | 'submit';
};

export function Button(props: Props) {
	const { type = 'submit', children } = props;

	return (
		<button
			className={clsx([
				'ring-1',
				'ring-zinc-200',
				'bg-zinc-200',
				'py-3',
				'px-4',
				'text-zinc-700',
				'rounded',
				'outline-none',
				'focus-visible:ring-zinc-300',
				'focus-visible:bg-zinc-300',
				'hover:ring-zinc-300',
				'hover:bg-zinc-300',
				'hover:bg-zinc-200',
				'transition-all',
				'shadow-sm',
			])}
			type={type}
		>
			{children}
		</button>
	);
}
