import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { MaintenancePage } from 'src/components/maintenance';
import { ReactQueryProvider } from 'src/components/providers/react-query-provider';
import { FeatureFlagsService } from 'src/lib/infra/mongo/services/feature-flag-services';
import { cn } from 'src/utils/classes';
import { App } from 'src/utils/constants/app-constants';
import { FeatureFlagContextProvider } from 'src/providers/feature-flags-provider';
import type { FeaturesFlags } from 'src/lib/types/feature-flags';
import './globals.css';

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: App.TITLE,
	description: App.DESCRIPTION,
	icons: [
		'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>🗒</text></svg>',
	],
};

type Props = Readonly<{
	children: ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
	const featureFlags: FeaturesFlags = {
		UNDER_MAINTENANCE:
			await FeatureFlagsService.getFeatureFlagValue('UNDER_MAINTENANCE'),
		PLAYGROUND: await FeatureFlagsService.getFeatureFlagValue('PLAYGROUND'),
	};
	const underMaintenance = featureFlags.UNDER_MAINTENANCE;

	return (
		<html lang="pt-BR" className={cn(nunito.variable)}>
			<body className="antialiased">
				{underMaintenance ? (
					<MaintenancePage />
				) : (
					<FeatureFlagContextProvider featureFlags={featureFlags}>
						<ReactQueryProvider>{children}</ReactQueryProvider>
					</FeatureFlagContextProvider>
				)}
			</body>
		</html>
	);
}
