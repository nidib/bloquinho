import z from 'zod';


export const getBloquinhoRequestSchema = z.object({
	title: z.string(),
});

export const getBloquinhoResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string().max(1000),
	lastViewedAt: z.string(),
	updatedAt: z.string(),
});

export type GetBloquinhoRequest = z.infer<typeof getBloquinhoRequestSchema>;
export type GetBloquinhoResponse = z.infer<typeof getBloquinhoRequestSchema>;
