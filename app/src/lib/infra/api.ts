import {
	type EditableBloquinhoFields,
	extensions,
} from 'src/lib/types/bloquinho';
import type { FeedbackType } from 'src/lib/types/feedback';
import { z } from 'zod';

const responseSchema = z.object({
	title: z.string(),
	content: z.string(),
	extension: z.enum(extensions),
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
	Mail: {
		sendFeedbackEmail: async (type: FeedbackType, message: string) => {
			const response = await fetch('/api/feedback', {
				method: 'POST',
				body: JSON.stringify({ type, message }),
			});

			return response.ok;
		},
	},
};
