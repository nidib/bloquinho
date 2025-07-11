import { mongo } from 'src/lib/infra/mongo/client';
import { FeatureFlagsDefaultValues } from 'src/lib/types/feature-flags';
import type { FeaturesFlags, Flags } from 'src/lib/types/feature-flags';

async function getFeatureFlagValue<T extends Flags>(
	flag: T,
): Promise<FeaturesFlags[T]> {
	const featureFlag = await mongo.FeatureFlag.findOneAndUpdate(
		{ key: flag },
		{
			$setOnInsert: {
				key: flag,
				value: FeatureFlagsDefaultValues[flag],
			},
		},
		{ upsert: true, returnDocument: 'after' },
	);

	if (featureFlag === null) {
		throw new Error(`Could not get feature flag: ${flag}`);
	}

	return featureFlag.value as FeaturesFlags[T];
}

async function getFeatureFlagsValues<T extends Flags>(
	flags: T[],
): Promise<Pick<FeaturesFlags, T>> {
	const map = {} as Pick<FeaturesFlags, T>;

	const featureFlagsCursor = mongo.FeatureFlag.find({
		key: { $in: flags },
	});
	for await (const featureFlag of featureFlagsCursor) {
		const key = featureFlag.key as T;
		const value = featureFlag.value as FeaturesFlags[T];
		map[key] = value;
	}

	return map;
}

async function seed() {
	let key: Flags;
	for (key in FeatureFlagsDefaultValues) {
		const defaultValue = FeatureFlagsDefaultValues[key];
		await mongo.FeatureFlag.updateOne(
			{ key },
			{
				$setOnInsert: {
					value: defaultValue,
				},
			},
			{ upsert: true },
		);
	}

	return mongo.FeatureFlag.find().toArray();
}

export const FeatureFlagsService = {
	getFeatureFlagValue,
	getFeatureFlagsValues,
	MIGRATION_ONLY: {
		/**
		 * Only used to initialize the app to have the initial values created if they don't exist yet.
		 */
		seed,
	},
};
