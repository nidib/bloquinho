import { BloquinhoRepository } from '../bloquinho-repository';

export class CheckIfBloquinhoExistsByTitleUsecase {
	public static async execute(title: string): Promise<boolean> {
		return Boolean(await BloquinhoRepository.getBloquinhoByTitle(title));
	}
}
