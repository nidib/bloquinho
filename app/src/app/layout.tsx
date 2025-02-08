import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { MaintenancePage } from 'src/components/maintenance';
import { cn } from 'src/utils/classes';
import { App } from 'src/utils/constants/app-constants';
import { Envs } from 'src/utils/constants/envs';
import './globals.css';
import { ReactQueryProvider } from 'src/components/providers/react-query-provider';

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
	children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
	return (
		<html lang="pt-BR" className={cn(nunito.variable)}>
			<body className="antialiased">
				{Envs.MAINTENANCE ? (
					<MaintenancePage />
				) : (
					<ReactQueryProvider>{children}</ReactQueryProvider>
				)}
			</body>
		</html>
	);
}
