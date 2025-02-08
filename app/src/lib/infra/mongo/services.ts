import { randomUUID } from 'node:crypto';
import {
	type BloquinhoDocument,
	mongoCollections,
} from 'src/lib/infra/mongo/client';

/**
 * If the title already exists, it updates `last_viewed_at` and returns it.
 * If the title does not exist, it creates and returns it.
 */
export async function getOrCreateBloquinhoByTitle(
	title: string,
): Promise<BloquinhoDocument> {
	const bloquinho = await mongoCollections.bloquinho.findOneAndUpdate(
		{ title },
		{
			$set: {
				last_viewed_at: new Date(),
			},
			$setOnInsert: {
				title,
				id: randomUUID().toString(),
				content: '',
				extension: 'txt',
				// Not passing last_viewed_at here since it'll be added in $set on both cases
				created_at: new Date(),
				updated_at: new Date(),
			},
		},
		{ upsert: true, returnDocument: 'after' },
	);

	if (!bloquinho) {
		throw new Error('Could not create bloquinho');
	}

	return bloquinho;
}
