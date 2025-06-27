import { type Document, MongoClient } from 'mongodb';

import type { Bloquinho } from 'src/lib/types/bloquinho';
import type { FeaturesFlags, Flags } from 'src/lib/types/feature-flags';
import { Envs } from 'src/utils/constants/envs';

export interface BloquinhoDocument extends Document, Bloquinho {}

export interface FeatureFlagDocument extends Document {
	key: Flags;
	value: FeaturesFlags[Flags];
}

const mongoClient = new MongoClient(Envs.MONGO_DB_URL).db('main');

export const mongo = {
	Bloquinho: mongoClient.collection<BloquinhoDocument>('bloquinho'),
	FeatureFlag: mongoClient.collection<FeatureFlagDocument>('feature_flag'),
};
