import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
	variable: '--font-nunito',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Bloquinho',
	description: 'Compartilhando suas notas e snippets de forma fácil.',
};

type Props = Readonly<{
	children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
	return (
		<html lang="pt-BR" className={nunito.variable}>
			<body className="antialiased">{children}</body>
		</html>
	);
}
