/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/no-unsafe-assignment */
import { z } from 'zod';

import { BloquinhoServices } from 'src/lib/infra/mongo/services/bloquinho-services';
import { extensions } from 'src/lib/types/bloquinho';

const responseSchema = z.object({
	title: z.string(),
	content: z.string(),
	extension: z.enum(extensions),
});

type Options = {
	params: Promise<{ title: string }>;
};

export async function PUT(request: Request, options: Options) {
	const params = await options.params;
	const body = await request.json();

	const updatedBloquinho = await BloquinhoServices.updateBloquinhoByTitle(
		params.title,
		body,
	);
	const responseBody = responseSchema.parse(updatedBloquinho);

	return Response.json(responseBody, {
		status: 200,
	});
}
