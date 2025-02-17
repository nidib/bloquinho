import { z } from 'zod';

const envSchema = z.object({
	MONGO_DB_URL: z
		.string({
			required_error: 'Missing required env: MONGO_DB_URL',
		})
		.nonempty('Missing required env: MONGO_DB_URL'),
	VERCEL_GIT_COMMIT_SHA: z
		.string()
		.transform((sha) => sha.substring(0, 8))
		.optional(),
	RESEND_API_KEY: z.string().optional(),
});

export const Envs = envSchema.parse(process.env);
