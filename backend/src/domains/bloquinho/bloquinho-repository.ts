import { eq } from 'drizzle-orm';

import { BloquinhoModel, SupportedExtensions, bloquinhoModel } from './bloquinho-model';
import { Database } from '../../database/connection';
import { Optional } from '../../utils/types';

export class BloquinhoRepository {
	public static async getBloquinhoById(id: string): Promise<Optional<BloquinhoModel>> {
		const bloquinhos = await Database.connection
			.select()
			.from(bloquinhoModel)
			.where(eq(bloquinhoModel.id, id))
			.execute();

		return bloquinhos[0];
	}

	public static async getBloquinhoByTitle(title: string): Promise<Optional<BloquinhoModel>> {
		const bloquinhos = await Database.connection
			.select()
			.from(bloquinhoModel)
			.where(eq(bloquinhoModel.title, title))
			.execute();

		return bloquinhos[0];
	}

	public static async upsertByTitle(
		title: string,
		content: string,
		extension: SupportedExtensions
	): Promise<BloquinhoModel> {
		const now = new Date().toISOString();
		const bloquinhos = await Database.connection
			.insert(bloquinhoModel)
			.values({
				title,
				content,
				extension,
			})
			.onConflictDoUpdate({
				target: bloquinhoModel.title,
				set: {
					content,
					extension,
					lastViewedAt: now,
					updatedAt: now,
				},
				where: eq(bloquinhoModel.title, title),
			})
			.returning();

		return bloquinhos[0];
	}
}
