import { Optional } from '../../../utils/types';
import { BloquinhoModel } from '../bloquinho-model';
import { BloquinhoRepository } from '../bloquinho-repository';

export class RetrieveBloquinhoByTitle {

	public static async execute(title: string): Promise<Optional<BloquinhoModel>> {
		return BloquinhoRepository.getBloquinhoByTitle(title);
	}

}
