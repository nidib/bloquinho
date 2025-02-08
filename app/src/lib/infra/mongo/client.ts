import { type Document, MongoClient } from 'mongodb';
import type { Bloquinho } from 'src/lib/types/bloquinho';
import { Envs } from 'src/utils/constants/envs';

export interface BloquinhoDocument extends Document, Bloquinho {}

const mongoClient = new MongoClient(Envs.MONGO_DB_URL).db('main');

export const mongoCollections = {
	bloquinho: mongoClient.collection<BloquinhoDocument>('bloquinho'),
};
