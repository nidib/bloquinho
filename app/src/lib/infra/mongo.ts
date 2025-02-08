import { type Document, MongoClient } from 'mongodb';
import { Envs } from 'src/utils/constants/envs';

type BloquinhoExtension =
	| 'txt'
	| 'java'
	| 'js'
	| 'jsx'
	| 'ts'
	| 'tsx'
	| 'sql'
	| 'html'
	| 'py'
	| 'md'
	| 'css';

export interface BloquinhoDocument extends Document {
	id: string;
	title: string;
	content: string;
	extension: BloquinhoExtension;
	last_viewed_at: Date;
	created_at: Date;
	updated_at: Date;
}

const mongoClient = new MongoClient(Envs.MONGO_DB_URL).db('main');

export const mongoCollections = {
	bloquinho: mongoClient.collection<BloquinhoDocument>('bloquinho'),
};
