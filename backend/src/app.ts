import Fastify from 'fastify';
import cors from '@fastify/cors';

import { routes } from './routes/routes';

const app = Fastify({
	logger: true,
});

void app.register(cors);
void app.register(routes, { prefix: '/api' });

app.get('/', () => {
	return {
		health: 'ok!',
	};
});

export { app };
