import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

import { config } from '../settings/env';
import { migrator } from './migrator';

const client = postgres(config.databaseUrl);
const ormConnection = drizzle(client, { logger: true });

export class Database {
	public static connection = ormConnection;

	public static async closeConnection() {
		return client.end();
	}

	public static async healthCheck() {
		console.info('Health check:', '🔄 Running...');

		await client`
			SELECT 1
		`;

		console.info('Health check:', '✅ Completed!');
	}

	public static async migrate() {
		console.info('Migrations:', '🔄 Running...');

		await migrator.migrate();

		console.info('Migrations:', '✅ Completed!');
	}
}
