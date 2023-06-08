import { buildJsonSchemas } from 'fastify-zod';

import { getBloquinhoRequestSchema, getBloquinhoResponseSchema } from './dtos/get-bloquinho-dtos';
import { createOrUpdateBloquinhoRequestSchema, createOrUpdateBloquinhoResponseSchema } from './dtos/create-or-update-bloquinho-dtos';


export const { schemas: bloquinhoSchemas, $ref: $bloquinho } = buildJsonSchemas({
	getBloquinhoRequestSchema,
	getBloquinhoResponseSchema,
	createOrUpdateBloquinhoRequestSchema,
	createOrUpdateBloquinhoResponseSchema,
});
