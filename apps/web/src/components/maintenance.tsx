'use client';

import { useI18n } from 'src/providers/i18n-provider';

export function MaintenancePage() {
	const { t, tt } = useI18n();

	return (
		<div className="h-screen w-full flex flex-col gap-3 items-center justify-center text-foreground/85">
			<h1 className="text-2xl lg:text-4xl font-bold">
				{tt('BloquinhoUnderMaintenance', <strong>Bloquinho</strong>)}
			</h1>
			<h2 className="text-lg lg:text-2xl">{t('TryAgainLater')}</h2>
		</div>
	);
}
