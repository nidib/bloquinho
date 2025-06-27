'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

export type PublicServerInfo = {
	appVersion: null | string;
};

const PublicServerInfoContext = createContext<PublicServerInfo>({
	appVersion: null,
});

export function usePublicServerInfo() {
	return useContext(PublicServerInfoContext);
}

type Props = {
	children: ReactNode;
	publicServerInfo: PublicServerInfo;
};

export function PublicServerInfoProvider(props: Props) {
	return (
		<PublicServerInfoContext.Provider value={props.publicServerInfo}>
			{props.children}
		</PublicServerInfoContext.Provider>
	);
}
