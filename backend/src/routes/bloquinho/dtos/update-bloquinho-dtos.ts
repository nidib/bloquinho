import z from 'zod';


export const updateBloquinhoRequestSchema = z.object({
	id: z.string(),
	content: z.string().max(1000),
});

export const updateBloquinhoResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string().max(1000),
	lastViewedAt: z.string(),
	updatedAt: z.string(),
});

export type UpdateBloquinhoRequest = z.infer<typeof updateBloquinhoRequestSchema>;
export type UpdateBloquinhoResponse = z.infer<typeof updateBloquinhoRequestSchema>;
