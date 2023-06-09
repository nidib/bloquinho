import z from 'zod';

import { supportedExtensions } from '../../../domains/bloquinho/bloquinho-model';

export const createOrUpdateBloquinhoRequestSchema = z.object({
	title: z.string().max(50, 'A bloquinho title can have up to 50 characters'),
	content: z.string().max(1000, 'A bloquinho can have up to 1000 characters'),
	extension: z.enum(supportedExtensions),
});

export const createOrUpdateBloquinhoResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string(),
	extension: z.string(),
	lastViewedAt: z.string(),
	updatedAt: z.string(),
});

export type CreateOrUpdateBloquinhoRequest = z.infer<typeof createOrUpdateBloquinhoRequestSchema>;
export type CreateOrUpdateBloquinhoResponse = z.infer<typeof createOrUpdateBloquinhoRequestSchema>;
