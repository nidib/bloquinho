'use client';

import { createContext, type ReactNode, useContext } from 'react';

import type { FeaturesFlags } from 'src/lib/types/feature-flags';

const featureFlagsContext = createContext<null | FeaturesFlags>(null);

export function useFeatureFlags() {
	const ctx = useContext(featureFlagsContext);

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
		<featureFlagsContext.Provider value={props.featureFlags}>
			{props.children}
		</featureFlagsContext.Provider>
	);
}
