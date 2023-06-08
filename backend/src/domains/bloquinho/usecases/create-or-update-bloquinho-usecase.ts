import { removeAccents, replaceWhiteSpacesByDashes } from '../../../utils/string-normalization-utils';
import { BloquinhoModel } from '../bloquinho-model';
import { BloquinhoRepository } from '../bloquinho-repository';

export class CreateOrUpdateBloquinhoUsecase {
	public static async execute(title: string, content: string): Promise<BloquinhoModel> {
		const normalizedTitle = replaceWhiteSpacesByDashes(removeAccents(title)).toLowerCase();

		if (!normalizedTitle) {
			throw new Error('A bloquinho must have at least one character in its title');
		}

		return BloquinhoRepository.upsertByTitle(title, content);
	}
}
