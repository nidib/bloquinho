'use client';

import { useBloquinhoEditorContext } from 'src/components/providers/bloquinho-editor-provider';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'src/components/tooltip';
import { cva } from 'src/utils/classes';

type Status = 'pending' | 'success' | 'error';

const titleByStatus: Record<Status, string> = {
	pending: 'Salvando bloquinho...',
	success: 'Bloquinho atualizado!',
	error: 'Algo deu errado!',
};

export function StatusIndicator() {
	const { status } = useBloquinhoEditorContext();
	const title = titleByStatus[status];

	return (
		<TooltipProvider delayDuration={400}>
			<Tooltip>
				<TooltipTrigger className="outline-none focus-visible:ring-offset-2 focus-visible:ring-zinc-700 focus-visible:ring-2 rounded-full cursor-help">
					<div className={statusIndicatorVariants({ status })} />
				</TooltipTrigger>
				<TooltipContent>{title}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

const statusIndicatorVariants = cva('w-[15px] h-[15px] z-[200] rounded-full', {
	variants: {
		status: {
			pending: ['bg-yellow-600'],
			success: ['bg-green-600'],
			error: ['bg-red-600'],
		},
	},
});
