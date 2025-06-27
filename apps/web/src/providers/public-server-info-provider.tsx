'use client';

import { createContext, type ReactNode, useContext } from 'react';

export type PublicServerInfo = {
	appVersion: null | string;
};

const publicServerInfoContext = createContext<PublicServerInfo>({
	appVersion: null,
});

export function usePublicServerInfo() {
	return useContext(publicServerInfoContext);
}

type Props = {
	children: ReactNode;
	publicServerInfo: PublicServerInfo;
};

export function PublicServerInfoProvider(props: Props) {
	return (
		<publicServerInfoContext.Provider value={props.publicServerInfo}>
			{props.children}
		</publicServerInfoContext.Provider>
	);
}
