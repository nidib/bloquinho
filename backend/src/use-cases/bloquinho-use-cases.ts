import { eq } from 'drizzle-orm';

import { database } from '../database/connection';
import { BloquinhoModel, bloquinhoModel } from '../database/models/bloquinho-model';


export async function getBloquinhoByTitleUseCase(title: string) {
	const [bloquinho] = await database
		.connection
		.select({ id: bloquinhoModel.id })
		.from(bloquinhoModel)
		.where(eq(bloquinhoModel.title, title))
		.execute();

	return bloquinho;
}

export async function getBloquinhoByIdUseCase(id: string) {
	const [bloquinho] = await database
		.connection
		.select()
		.from(bloquinhoModel)
		.where(eq(bloquinhoModel.id, id))
		.execute();

	return bloquinho;
}

export async function createBloquinhoUseCase(title: string, content: string): Promise<BloquinhoModel> {
	const existingBloquinho = await getBloquinhoByTitleUseCase(title);

	if (existingBloquinho) {
		throw new Error('A bloquinho with that title already exists');
	}

	const [createdBloquinho] = await database
		.connection
		.insert(bloquinhoModel)
		.values({
			title,
			content,
			isPublic: true,
		})
		.returning();

	return createdBloquinho;
}

export async function updateBloquinhoUseCase(id: string, content: string): Promise<BloquinhoModel> {
	const existingBloquinho = await getBloquinhoByIdUseCase(id);

	if (!existingBloquinho) {
		throw new Error('This bloquinho does not exist');
	}

	const [updatedBloquinho] = await database
		.connection
		.update(bloquinhoModel)
		.set({
			content,
			isPublic: true,
			updatedAt: new Date().toISOString(),
		})
		.where(eq(bloquinhoModel.id, existingBloquinho.id))
		.returning();

	return updatedBloquinho;
}
