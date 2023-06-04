import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify({
	logger: true,
});

app.register(cors);

app.get('/', () => {
	return {
		health: 'ok!',
	};
});

export {
	app,
};
