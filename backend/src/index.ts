import prexit from 'prexit';

import { app } from './app';
import { Database } from './database/connection';
import { config } from './settings/env';

async function main() {
	try {
		await Database.healthCheck();
		await Database.migrate();
		await app.listen({
			port: config.serverPort,
			host: config.serverHost,
		});

		console.info(`App: ✅ Running at ${config.serverHost}:${config.serverPort}`);
	} catch (e) {
		console.error('🛑 Stopping application due to error');
		console.error(e);
		process.exit();
	}
}

async function safeExit() {
	console.log('\n');
	console.info('Exiting:', '🔄 Running...');

	try {
		await app.close();
		await Database.closeConnection();

		console.info('Exiting:', '✅ Completed!');
	} catch (e) {
		console.error('🛑 Something went wrong while shutting down the app');
		console.error(e);
	}
}

void main();
prexit(safeExit);
