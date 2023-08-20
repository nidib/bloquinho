import { AxiosError } from 'axios';
import { Optional } from '../../utils/types';
import { PersistedBloquinho, bloquinhoApi } from './bloquinho-api';
import { Extension } from '../../utils/constants/extensions';

export async function retrieveBloquinho(title: string): Promise<Optional<PersistedBloquinho>> {
	const response = await bloquinhoApi.get<Optional<PersistedBloquinho>>(`/bloquinho/${title}`);

	return response.data;
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

export async function retrieveOrCreateBloquinho(title: string): Promise<Optional<PersistedBloquinho>> {
	try {
		const existingBloquinho = await retrieveBloquinho(title);

		return existingBloquinho;
	} catch (e) {
		if (e instanceof AxiosError && e.response?.status === 404) {
			return createOrUpdateBloquinho(title, '', 'txt');
		}

		throw e;
	}
}
