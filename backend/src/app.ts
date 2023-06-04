import Fastify from 'fastify';


const app = Fastify({
	logger: true,
});

app.get('/', () => {
	return {
		health: 'ok!',
	};
});

export {
	app,
};
