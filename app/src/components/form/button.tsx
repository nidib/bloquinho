import type { ReactNode } from 'react';
import { cn } from 'src/utils/classes';

type Props = {
	children: ReactNode;
	type?: 'button' | 'submit';
	disabled?: boolean;
};

export function Button({ type = 'button', disabled = false, ...props }: Props) {
	return (
		<button
			type={type}
			disabled={disabled}
			className={cn(
				'font-semibold text-white bg-zinc-700 hover:opacity-90 py-3 px-4 rounded-md disabled:pointer-events-none transition-all shadow-sm',
				'disabled:opacity-40 disabled:cursor-not-allowed',
				'focus:visible:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2',
			)}
		>
			{props.children}
		</button>
	);
}
