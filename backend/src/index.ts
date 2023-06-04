import prexit from 'prexit';

import { app } from './app';


const SERVER_PORT = Number(process.env.PORT ?? 8080);

async function main() {
	await app.listen({
		port: SERVER_PORT,
		host: '0.0.0.0',
	});

	console.log(`App running on port ${SERVER_PORT}`);
	
}

main();

prexit(async () => {
	console.log('');
	console.log('Save exiting...');

	try {
		await app.close();
	} catch (e) {
		console.log('Something went wrong while exiting');
		console.error(e);
	}

	console.log('Safely exited!');
	console.log('');
});
