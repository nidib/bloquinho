import { z } from 'zod';

import {
	type EditableBloquinhoFields,
	extensions,
} from 'src/lib/types/bloquinho';

const responseSchema = z.object({
	title: z.string(),
	content: z.string(),
	extension: z.enum(extensions),
});

export async function updateBloquinhoByTitle(
	title: string,
	data: EditableBloquinhoFields,
) {
	const responseBody = await fetch(`/${title}/api`, {
		method: 'PUT',
		body: JSON.stringify(data),
	}).then((res) => res.json());

	return responseSchema.parse(responseBody);
}
