'use client';

import { PlayCircleIcon } from 'lucide-react';
import { cn } from 'src/utils/classes';

type Props = {
	showing: boolean;
	onClick: (showing: boolean) => void;
};

export function PlaygroundToggle(props: Props) {
	return (
		<button
			type="button"
			className={cn(
				'transition-all flex h-8 w-fit items-center justify-between rounded-md border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:border-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
				props.showing && 'bg-zinc-200 border-zinc-300 hover:bg-zinc-200',
			)}
			onClick={() => props.onClick(!props.showing)}
		>
			<PlayCircleIcon className="w-4 h-4" />
		</button>
	);
}
