import { buildJsonSchemas } from 'fastify-zod';

import { getBloquinhoRequestSchema, getBloquinhoResponseSchema } from './dtos/get-bloquinho-dtos';
import { createBloquinhoRequestSchema, createBloquinhoResponseSchema } from './dtos/create-bloquinho-dtos';
import { updateBloquinhoRequestSchema, updateBloquinhoResponseSchema } from './dtos/update-bloquinho-dtos';


export const { schemas: bloquinhoSchemas, $ref: $bloquinho } = buildJsonSchemas({
	getBloquinhoRequestSchema,
	getBloquinhoResponseSchema,
	createBloquinhoRequestSchema,
	createBloquinhoResponseSchema,
	updateBloquinhoRequestSchema,
	updateBloquinhoResponseSchema,
});
