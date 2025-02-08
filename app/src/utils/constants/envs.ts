import { z } from 'zod';

const envSchema = z.object({
	MONGO_DB_URL: z
		.string({
			required_error: 'Missing required env: MONGO_DB_URL',
		})
		.nonempty('Missing required env: MONGO_DB_URL'),
	MAINTENANCE: z.preprocess((val) => val === 'true', z.boolean()),
});

export const Envs = envSchema.parse(process.env);
