'use client';

import { useI18n } from 'src/providers/i18n-provider';
import { App } from 'src/utils/constants/app-constants';

export function HomePageHeader() {
	const { t } = useI18n();

	return (
		<>
			<h1 className="text-zinc-700 text-7xl font-black">{App.NAME}</h1>
			<h2 className="text-zinc-600 text-4xl font-bold">
				{t('AppDescription')}
			</h2>
		</>
	);
}
