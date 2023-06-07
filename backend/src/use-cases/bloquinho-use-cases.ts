import { eq } from 'drizzle-orm';

import { Database } from '../database/connection';
import { BloquinhoModel, bloquinhoModel } from '../database/models/bloquinho-model';
import { removeAccents, replaceWhiteSpacesByDashes } from '../utils/string-normalization-utils';


export async function getBloquinhoByTitleUseCase(title: string, throwIfNotExists = false) {
	const [bloquinho] = await Database.connection
		.select()
		.from(bloquinhoModel)
		.where(eq(bloquinhoModel.title, title))
		.execute();

	if (throwIfNotExists && !bloquinho) {
		throw new Error('This bloquinho does not exist');
	}

	return bloquinho;
}

export async function getBloquinhoByIdUseCase(id: string) {
	const [bloquinho] = await Database.connection
		.select()
		.from(bloquinhoModel)
		.where(eq(bloquinhoModel.id, id))
		.execute();

	return bloquinho;
}

export async function viewBloquinhoUseCase(title: string): Promise<BloquinhoModel> {
	const existingBloquinho = await getBloquinhoByTitleUseCase(title, true);

	const [updatedBloquinho] = await Database.connection
		.update(bloquinhoModel)
		.set({ lastViewedAt: new Date().toISOString() })
		.where(eq(bloquinhoModel.title, existingBloquinho.title))
		.returning();

	return updatedBloquinho;
}

export async function createBloquinhoUseCase(title: string, content: string): Promise<BloquinhoModel> {
	const normalizedTitle = replaceWhiteSpacesByDashes(removeAccents(title));

	if (!normalizedTitle) {
		throw new Error('A bloquinho must have at least one character on its title');
	}

	const existingBloquinho = await getBloquinhoByTitleUseCase(normalizedTitle);

	if (existingBloquinho) {
		throw new Error('A bloquinho with that title already exists');
	}

	const [createdBloquinho] = await Database.connection
		.insert(bloquinhoModel)
		.values({
			content,
			title: normalizedTitle,
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

	const now = new Date().toISOString();
	const [updatedBloquinho] = await Database.connection
		.update(bloquinhoModel)
		.set({
			content,
			isPublic: true,
			lastViewedAt: now,
			updatedAt: now,
		})
		.where(eq(bloquinhoModel.id, existingBloquinho.id))
		.returning();

	return updatedBloquinho;
}
