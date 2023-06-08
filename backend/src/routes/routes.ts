import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { BloquinhoRoutes } from './bloquinho/bloquinho-route';
import { $bloquinho, bloquinhoSchemas } from './bloquinho/schemas';


export function routes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: () => void) {
	for (const schema of bloquinhoSchemas) {
		fastify.addSchema(schema);
	}

	fastify.get('/bloquinho/:title', {
		schema: {
			params: $bloquinho('getBloquinhoRequestSchema'),
			response: {
				200: $bloquinho('getBloquinhoResponseSchema'),
			},
		},
	}, BloquinhoRoutes.retrieve);

	fastify.post('/bloquinho', {
		schema: {
			body: $bloquinho('createOrUpdateBloquinhoRequestSchema'),
			response: {
				201: $bloquinho('createOrUpdateBloquinhoResponseSchema'),
				200: $bloquinho('createOrUpdateBloquinhoResponseSchema'),
			},
		},
	}, BloquinhoRoutes.createOrUpdate);

	done();
}
