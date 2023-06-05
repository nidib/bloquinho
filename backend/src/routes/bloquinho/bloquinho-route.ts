import { FastifyReply, FastifyRequest } from 'fastify';
import { CREATED, OK } from 'http-status';

import { CreateBloquinhoRequest, CreateBloquinhoResponse } from './dtos/create-bloquinho-dtos';
import { UpdateBloquinhoRequest, UpdateBloquinhoResponse } from './dtos/update-bloquinho-dtos';
import { createBloquinhoUseCase, updateBloquinhoUseCase } from '../../use-cases/bloquinho-use-cases';


/**
 * Path: api/bloquinho
 */
export class BloquinhoRoutes {

	static async create(request: FastifyRequest<{ Body: CreateBloquinhoRequest, Reply: CreateBloquinhoResponse }>, reply: FastifyReply) {
		const { title, content } = request.body;

		const createdBloquinho = await createBloquinhoUseCase(title, content);

		return reply
			.code(CREATED)
			.send(createdBloquinho);
	}

	static async update(request: FastifyRequest<{ Body: UpdateBloquinhoRequest, Reply: UpdateBloquinhoResponse }>, reply: FastifyReply) {
		const { id, content } = request.body;

		const updatedBloquinho = await updateBloquinhoUseCase(id, content);

		return reply
			.code(OK)
			.send(updatedBloquinho);
	}

}
