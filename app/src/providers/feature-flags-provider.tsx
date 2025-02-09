'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { FeaturesFlags } from 'src/lib/types/feature-flags';

const featureFlagContext = createContext<null | FeaturesFlags>(null);

export function useFeatureFlags() {
	const ctx = useContext(featureFlagContext);

	if (!ctx) {
		throw new Error(
			`useFeatureFlags requires the provider: ${FeatureFlagContextProvider.name}`,
		);
	}

	return ctx;
}

type Props = {
	children: ReactNode;
	featureFlags: FeaturesFlags;
};

export function FeatureFlagContextProvider(props: Props) {
	return (
		<featureFlagContext.Provider value={props.featureFlags}>
			{props.children}
		</featureFlagContext.Provider>
	);
}
