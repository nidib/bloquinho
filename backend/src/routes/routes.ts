import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { BloquinhoRoutes } from './bloquinho/bloquinho-route';
import { $bloquinho, bloquinhoSchemas } from './bloquinho/schemas';


export function routes(fastify: FastifyInstance, _opts: FastifyPluginOptions, done: () => void) {
	for (const schema of bloquinhoSchemas) {
		fastify.addSchema(schema);
	}
	fastify.post('/bloquinho', {
		schema: {
			body: $bloquinho('createBloquinhoRequestSchema'),
			response: {
				201: $bloquinho('createBloquinhoResponseSchema'),
			},
		},
	}, BloquinhoRoutes.create);
	fastify.put('/bloquinho', {
		schema: {
			body: $bloquinho('updateBloquinhoRequestSchema'),
			response: {
				200: $bloquinho('updateBloquinhoResponseSchema'),
			},
		},
	}, BloquinhoRoutes.update);

	done();
}
