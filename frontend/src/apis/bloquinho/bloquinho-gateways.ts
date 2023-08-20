import { AxiosError } from 'axios';
import { Optional } from '../../utils/types';
import { PersistedBloquinho, bloquinhoApi } from './bloquinho-api';
import { Extension } from '../../utils/constants/extensions';

export async function retrieveBloquinho(title: string): Promise<Optional<PersistedBloquinho>> {
	const response = await bloquinhoApi.get<Optional<PersistedBloquinho>>(`/bloquinho/${title}`);

	return response.data;
}

export async function retrieveBloquinhoIgnoringNotFound(title: string): Promise<Optional<PersistedBloquinho>> {
	try {
		const bloquinhoExistente = await retrieveBloquinho(title);

		return bloquinhoExistente;
	} catch (e) {
		if (e instanceof AxiosError && e.response?.status === 404) {
			return null;
		}

		throw e;
	}
}

export async function createOrUpdateBloquinho(
	title: string,
	content: string,
	extension: Extension
): Promise<PersistedBloquinho> {
	const response = await bloquinhoApi.post<PersistedBloquinho>('/bloquinho', {
		title,
		content,
		extension,
	});

	return response.data;
}
