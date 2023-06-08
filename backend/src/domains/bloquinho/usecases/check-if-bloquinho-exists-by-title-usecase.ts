import { BloquinhoRepository } from '../bloquinho-repository';

export class CheckIfBloquinhoExistsByTitleUsecase {

	public static async execute(title: string): Promise<boolean> {
		const existingBloquinho = await BloquinhoRepository.getBloquinhoByTitle(title);

		return Boolean(existingBloquinho);
	}

}
