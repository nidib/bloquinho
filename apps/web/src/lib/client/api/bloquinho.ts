import { z } from 'zod';

import { extensions } from 'src/lib/types/bloquinho';
import type { EditableBloquinhoFields } from 'src/lib/types/bloquinho';

const responseSchema = z.object({
	title: z.string(),
	content: z.string(),
	extension: z.enum(extensions),
});

export async function updateBloquinhoByTitle(
	title: string,
	data: EditableBloquinhoFields,
) {
	// eslint-disable-next-line ts/no-unsafe-assignment
	const responseBody = await fetch(`/${title}/api`, {
		method: 'PUT',
		body: JSON.stringify(data),
	}).then(res => res.json());

	return responseSchema.parse(responseBody);
}
