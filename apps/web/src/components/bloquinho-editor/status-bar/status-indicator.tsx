'use client';

import { useMemo } from 'react';

import { useBloquinhoEditorContext } from 'src/components/providers/bloquinho-editor-provider';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from 'src/components/ui/tooltip';
import { useI18n } from 'src/providers/i18n-provider';
import { cva } from 'src/utils/classes';

const statusIndicatorVariants = cva('w-[15px] h-[15px] z-200 rounded-full', {
	variants: {
		status: {
			pending: ['bg-yellow-600'],
			success: ['bg-green-600'],
			error: ['bg-red-600'],
		},
	},
});

type Status = 'pending' | 'success' | 'error';

export function StatusIndicator() {
	const { t } = useI18n();
	const { status } = useBloquinhoEditorContext();
	const title = useMemo(() => {
		const titleByStatus: Record<Status, string> = {
			pending: t('SavingBloquinho'),
			success: t('BloquinhoUpdated'),
			error: t('SomethingWentWrong'),
		};

		return titleByStatus[status];
	}, [status, t]);

	return (
		<TooltipProvider delayDuration={400}>
			<Tooltip>
				<TooltipTrigger className="outline-hidden focus-visible:ring-offset-2 focus-visible:ring-zinc-700 focus-visible:ring-2 rounded-full cursor-help">
					<div
						className={statusIndicatorVariants({ status })}
						role="status"
						aria-label={title}
					/>
				</TooltipTrigger>
				<TooltipContent>{title}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
