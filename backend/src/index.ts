import prexit from 'prexit';

import { app } from './app';
import { database } from './database/connection';


const SERVER_PORT = Number(process.env.PORT ?? 8080);

async function main() {
	try {
		await database.healthCheck();
		await database.migrate();
		await app.listen({
			port: SERVER_PORT,
			host: '0.0.0.0',
		});

		console.log(`App running on port ${SERVER_PORT}`);
	} catch (e) {
		console.log('Something went wrong while starting the app');
		console.error(e);
	}
}

main();

prexit(async () => {
	console.log('');
	console.log('Save exiting...');

	try {
		await app.close();
		await database.closeConnection();
	} catch (e) {
		console.log('Something went wrong while exiting');
		console.error(e);
	}

	console.log('Safely exited!');
	console.log('');
});
