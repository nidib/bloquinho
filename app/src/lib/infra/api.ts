import type { EditableBloquinhoFields } from 'src/lib/types/bloquinho';
import { z } from 'zod';

const responseSchema = z.object({
	title: z.string(),
	content: z.string(),
	extension: z.string(),
});

export const Api = {
	updateBloquinhoByTitle: async (
		title: string,
		data: EditableBloquinhoFields,
	) => {
		const responseBody = await fetch(`/${title}/api`, {
			method: 'PUT',
			body: JSON.stringify(data),
		}).then((res) => res.json());

		return responseSchema.parse(responseBody);
	},
};
