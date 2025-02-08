import { randomUUID } from 'node:crypto';
import {
	type BloquinhoDocument,
	mongoCollections,
} from 'src/lib/infra/mongo/client';
import {
	extensions,
	type EditableBloquinhoFields,
} from 'src/lib/types/bloquinho';
import { z } from 'zod';

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

const editableBloquinhoSchema = z.object({
	content: z.string(),
	extension: z.enum(extensions),
});

export async function updateBloquinhoByTitle(
	title: string,
	data: EditableBloquinhoFields,
): Promise<BloquinhoDocument> {
	const parsedData = editableBloquinhoSchema.parse(data);
	const updatedBloquinho = await mongoCollections.bloquinho.findOneAndUpdate(
		{ title },
		{
			$set: {
				content: parsedData.content,
				extension: parsedData.extension,
				last_viewed_at: new Date(),
				updated_at: new Date(),
			},
		},
		{ returnDocument: 'after' },
	);

	if (!updatedBloquinho) {
		throw new Error('Could not update bloquinho');
	}

	return updatedBloquinho;
}
