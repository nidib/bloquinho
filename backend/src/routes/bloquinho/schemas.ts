import { buildJsonSchemas } from 'fastify-zod';

import { createBloquinhoRequestSchema, createBloquinhoResponseSchema } from './dtos/create-bloquinho-dtos';
import { updateBloquinhoRequestSchema, updateBloquinhoResponseSchema } from './dtos/update-bloquinho-dtos';


export const { schemas: bloquinhoSchemas, $ref: $bloquinho } = buildJsonSchemas({
	createBloquinhoRequestSchema,
	createBloquinhoResponseSchema,
	updateBloquinhoRequestSchema,
	updateBloquinhoResponseSchema,
});
