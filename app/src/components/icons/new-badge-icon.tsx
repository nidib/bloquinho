'use client';

import { useI18n } from 'src/providers/i18n-provider';

export function NewBadgeIcon() {
	const { t } = useI18n();

	return (
		<div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-green-200 border border-solid border-green-500 text-green-950 py-0.5 px-1 rounded-md text-3xs font-semibold shadow-sm select-none opacity-90 uppercase">
			{t('New')}
		</div>
	);
}
