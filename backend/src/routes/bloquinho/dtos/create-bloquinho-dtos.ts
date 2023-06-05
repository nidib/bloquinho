import z from 'zod';


export const createBloquinhoRequestSchema = z.object({
	title: z.string(),
	content: z.string().max(1000),
});

export const createBloquinhoResponseSchema = z.object({
	id: z.string(),
	title: z.string(),
	content: z.string().max(1000),
});

export type CreateBloquinhoRequest = z.infer<typeof createBloquinhoRequestSchema>;
export type CreateBloquinhoResponse = z.infer<typeof createBloquinhoRequestSchema>;
