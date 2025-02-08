import { mongo } from 'src/lib/infra/mongo/client';
import {
	FeatureFlagsDefaultValues,
	type FeaturesFlags,
	type Flags,
} from 'src/lib/types/feature-flags';

async function getFeatureFlagValue<T extends Flags>(
	feat: T,
): Promise<FeaturesFlags[T]> {
	const featureFlag = await mongo.FeatureFlag.findOneAndUpdate(
		{ key: feat },
		{
			$setOnInsert: {
				key: feat,
				value: FeatureFlagsDefaultValues[feat],
			},
		},
		{ upsert: true, returnDocument: 'after' },
	);

	if (featureFlag === null) {
		throw new Error(`Could not get feature flag: ${feat}`);
	}

	return featureFlag.value;
}

export const FeatureFlagsService = {
	getFeatureFlagValue,
};
