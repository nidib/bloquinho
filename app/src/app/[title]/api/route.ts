import { updateBloquinhoByTitle } from 'src/lib/infra/mongo/services';
import { extensions } from 'src/lib/types/bloquinho';
import { z } from 'zod';

const bodySchema = z.object({
	content: z.string(),
	extension: z.enum(extensions),
});

type Options = {
	params: Promise<{ title: string }>;
};

export async function PUT(request: Request, options: Options) {
	const params = await options.params;
	const body = bodySchema.parse(await request.json());

	const updatedBloquinho = await updateBloquinhoByTitle(params.title, body);

	return Response.json(updatedBloquinho, {
		status: 200,
	});
}
