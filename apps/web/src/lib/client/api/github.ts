/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-assignment */
import { z } from 'zod';

const releaseSchema = z.object({
	name: z.string(),
	publishedAt: z.string().transform(str => new Date(str)),
	body: z.string(),
});

export type Release = z.infer<typeof releaseSchema>;

export async function getLatestRelease() {
	const responseData = await fetch(
		'https://api.github.com/repos/nidib/bloquinho/releases/latest',
	).then(res => res.json());

	return releaseSchema.parse({
		name: responseData.name,
		publishedAt: responseData.published_at,
		body: responseData.body,
	});
}
