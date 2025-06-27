'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export function ReactQueryProvider(props: Props) {
	const client = useMemo(() => {
		return new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
					refetchOnWindowFocus: false,
				},
			},
		});
	}, []);

	return (
		<QueryClientProvider client={client}>{props.children}</QueryClientProvider>
	);
}
