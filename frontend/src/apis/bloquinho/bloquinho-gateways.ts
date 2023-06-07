import { AxiosError } from 'axios';
import { Optional } from '../../utils/types';
import { CreatedBloquinho, bloquinhoApi } from './bloquinho-api';


export async function getBloquinho(title: string): Promise<Optional<CreatedBloquinho>> {
	try {
		const response = await bloquinhoApi.get<CreatedBloquinho>(`/bloquinho/${title}`);

		return response.data;
	} catch (e) {
		if (e instanceof AxiosError) {
			if (e?.response?.data?.message === 'This bloquinho does not exist') {
				return null;
			}
		}
	}

	return null;
}

export async function createBloquinho(title: string, content: string): Promise<CreatedBloquinho> {
	const response = await bloquinhoApi.post<CreatedBloquinho>('/bloquinho', {
		title,
		content,
	});

	return response.data;
}

export async function updateBloquinho(id: string, content: string): Promise<CreatedBloquinho> {
	const response = await bloquinhoApi.put<CreatedBloquinho>('/bloquinho', {
		id,
		content,
	});

	return response.data;
}
