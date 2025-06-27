import { randomUUID } from 'node:crypto';

import { z } from 'zod';

import { type BloquinhoDocument, mongo } from 'src/lib/infra/mongo/client';
import {
	type EditableBloquinhoFields,
	extensions,
} from 'src/lib/types/bloquinho';

/**
 * If the title already exists, it updates `last_viewed_at` and returns it.
 * If the title does not exist, it creates and returns it.
 */
async function getOrCreateBloquinhoByTitle(
	title: string,
): Promise<BloquinhoDocument> {
	const bloquinho = await mongo.Bloquinho.findOneAndUpdate(
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

async function updateBloquinhoByTitle(
	title: string,
	data: EditableBloquinhoFields,
): Promise<BloquinhoDocument> {
	const parsedData = editableBloquinhoSchema.parse(data);
	const updatedBloquinho = await mongo.Bloquinho.findOneAndUpdate(
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

export const BloquinhoServices = {
	getOrCreateBloquinhoByTitle,
	updateBloquinhoByTitle,
};
