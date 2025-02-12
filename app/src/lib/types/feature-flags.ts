export const FeatureFlagsDefaultValues = {
	UNDER_MAINTENANCE: false,
};

export type FeaturesFlags = typeof FeatureFlagsDefaultValues;

export type Flags = keyof FeaturesFlags;
