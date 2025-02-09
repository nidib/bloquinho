export type FeaturesFlags = {
	UNDER_MAINTENANCE: boolean;
	PLAYGROUND: boolean;
};

export type Flags = keyof FeaturesFlags;

export const FeatureFlagsDefaultValues: FeaturesFlags = {
	UNDER_MAINTENANCE: false,
	PLAYGROUND: false,
};
