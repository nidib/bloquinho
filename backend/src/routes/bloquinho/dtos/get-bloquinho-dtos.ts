import z from 'zod';

export const getBloquinhoRequestSchema = z.object({
	title: z.string().max(50, 'A bloquinho title can have up to 50 characters'),
});

export const getBloquinhoResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string(),
	lastViewedAt: z.string(),
	updatedAt: z.string(),
});

export type GetBloquinhoRequest = z.infer<typeof getBloquinhoRequestSchema>;
export type GetBloquinhoResponse = z.infer<typeof getBloquinhoRequestSchema>;
