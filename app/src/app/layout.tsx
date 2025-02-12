import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import type { ReactNode } from 'react';
import { MaintenancePage } from 'src/components/maintenance';
import { ReactQueryProvider } from 'src/components/providers/react-query-provider';
import { FeatureFlagsService } from 'src/lib/infra/mongo/services/feature-flag-services';
import { FeatureFlagsProvider } from 'src/providers/feature-flags-provider';
import {
	type PublicServerInfo,
	PublicServerInfoProvider,
} from 'src/providers/public-server-info-provider';
import { cn } from 'src/utils/classes';
import { App } from 'src/utils/constants/app-constants';
import { Envs } from 'src/utils/constants/envs';
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
	const publicServerInfo: PublicServerInfo = {
		appVersion: Envs.VERCEL_GIT_COMMIT_SHA ?? null,
	};
	const featureFlags = await FeatureFlagsService.getFeatureFlagsValues([
		'UNDER_MAINTENANCE',
	]);

	return (
		<html lang="pt-BR" className={cn(nunito.variable)}>
			<body className="antialiased">
				{featureFlags.UNDER_MAINTENANCE ? (
					<MaintenancePage />
				) : (
					<PublicServerInfoProvider publicServerInfo={publicServerInfo}>
						<FeatureFlagsProvider featureFlags={featureFlags}>
							<ReactQueryProvider>{children}</ReactQueryProvider>
						</FeatureFlagsProvider>
					</PublicServerInfoProvider>
				)}
			</body>
		</html>
	);
}
