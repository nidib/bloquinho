import { eq } from 'drizzle-orm';

import { BloquinhoModel, bloquinhoModel } from './bloquinho-model';
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

	public static async upsertByTitle(title: string, content: string): Promise<BloquinhoModel> {
		const now = new Date().toISOString();
		const bloquinhos = await Database.connection
			.insert(bloquinhoModel)
			.values({
				title,
				content,
			})
			.onConflictDoUpdate({
				target: bloquinhoModel.title,
				set: {
					content,
					lastViewedAt: now,
					updatedAt: now,
				},
				where: eq(bloquinhoModel.title, title),
			})
			.returning();

		return bloquinhos[0];
	}
}
