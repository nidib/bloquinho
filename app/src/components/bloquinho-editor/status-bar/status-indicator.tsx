'use client';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'src/components/tooltip';
import { cva } from 'src/utils/classes';

type Status = 'pending' | 'success' | 'error';

const statusIndicatorVariants = cva('w-[15px] h-[15px] z-[200] rounded-full', {
	variants: {
		status: {
			pending: ['bg-yellow-600'],
			success: ['bg-green-600'],
			error: ['bg-red-600'],
		},
	},
});

type Props = {
	title: string;
	status: Status;
};

export function StatusIndicator({ title, status }: Props) {
	return (
		<TooltipProvider delayDuration={400}>
			<Tooltip>
				<TooltipTrigger className="outline-none focus-visible:ring-offset-2 focus-visible:ring-zinc-700 focus-visible:ring-2 rounded-full">
					<div className={statusIndicatorVariants({ status })} />
				</TooltipTrigger>
				<TooltipContent>{title}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
