import { FastifyReply, FastifyRequest } from 'fastify';
import { CREATED, NOT_FOUND, OK } from 'http-status';

import {
	CreateOrUpdateBloquinhoRequest,
	CreateOrUpdateBloquinhoResponse,
} from './dtos/create-or-update-bloquinho-dtos';
import { CreateOrUpdateBloquinhoUsecase } from '../../domains/bloquinho/usecases/create-or-update-bloquinho-usecase';
import { CheckIfBloquinhoExistsByTitleUsecase } from '../../domains/bloquinho/usecases/check-if-bloquinho-exists-by-title-usecase';
import { GetBloquinhoRequest, GetBloquinhoResponse } from './dtos/get-bloquinho-dtos';
import { RetrieveBloquinhoByTitle } from '../../domains/bloquinho/usecases/retrieve-bloquinho-by-title-usecase';

/**
 * Path: api/bloquinho
 */
export class BloquinhoRoutes {
	public static async retrieve(
		request: FastifyRequest<{ Params: GetBloquinhoRequest; Reply: GetBloquinhoResponse }>,
		reply: FastifyReply
	) {
		const { title } = request.params;

		const bloquinho = await RetrieveBloquinhoByTitle.execute(title);
		const status = bloquinho ? OK : NOT_FOUND;

		return reply.status(status).send(bloquinho);
	}

	public static async createOrUpdate(
		request: FastifyRequest<{ Body: CreateOrUpdateBloquinhoRequest; Reply: CreateOrUpdateBloquinhoResponse }>,
		reply: FastifyReply
	) {
		const { title, content, extension } = request.body;

		const isUpdating = await CheckIfBloquinhoExistsByTitleUsecase.execute(title);
		const bloquinho = await CreateOrUpdateBloquinhoUsecase.execute(title, content, extension);
		const statusCode = isUpdating ? OK : CREATED;

		return reply.code(statusCode).send(bloquinho);
	}
}
