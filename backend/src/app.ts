import Fastify from 'fastify';
import cors from '@fastify/cors';

import { routes } from './routes/routes';
import { config } from './settings/env';

const app = Fastify({
	logger: true,
});

void app.register(cors);
void app.register(routes, { prefix: '/api' });

app.get('/', () => {
	return {
		healthy: true,
		version: config.commitHash?.slice(0, 8),
	};
});

export { app };
