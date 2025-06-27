'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import type { FeaturesFlags } from 'src/lib/types/feature-flags';

const FeatureFlagsContext = createContext<null | FeaturesFlags>(null);

export function useFeatureFlags() {
	const ctx = useContext(FeatureFlagsContext);

	if (!ctx) {
		throw new Error(
			`useFeatureFlags requires the provider: ${FeatureFlagsProvider.name}`,
		);
	}

	return ctx;
}

type Props = {
	children: ReactNode;
	featureFlags: FeaturesFlags;
};

export function FeatureFlagsProvider(props: Props) {
	return (
		<FeatureFlagsContext.Provider value={props.featureFlags}>
			{props.children}
		</FeatureFlagsContext.Provider>
	);
}
