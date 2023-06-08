import { AxiosError } from 'axios';
import { Optional } from '../../utils/types';
import { CreatedBloquinho, bloquinhoApi } from './bloquinho-api';

export async function retrieveBloquinho(title: string): Promise<Optional<CreatedBloquinho>> {
	const response = await bloquinhoApi.get<Optional<CreatedBloquinho>>(`/bloquinho/${title}`);

	return response.data;
}

export async function retrieveBloquinhoIgnoringNotFound(title: string): Promise<Optional<CreatedBloquinho>> {
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

export async function createOrUpdateBloquinho(title: string, content: string): Promise<CreatedBloquinho> {
	const response = await bloquinhoApi.post<CreatedBloquinho>('/bloquinho', {
		title,
		content,
	});

	return response.data;
}
