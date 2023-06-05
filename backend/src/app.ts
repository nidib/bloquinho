import Fastify from 'fastify';
import cors from '@fastify/cors';

import { routes } from './routes/routes';


const app = Fastify({
	logger: true,
});

app.register(cors);
app.register(routes, { prefix: '/api' });

app.get('/', () => {
	return {
		health: 'ok!',
	};
});

export {
	app,
};
