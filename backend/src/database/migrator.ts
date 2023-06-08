import path from 'path';
import postgres from 'postgres';
import Postgrator from 'postgrator';

import { config } from '../settings/env';

const MIGRATION_MAX_CONNECTIONS = 1;
const MIGRATION_IDLE_TIMEOUT_IN_SECONDS = 60;

const migrationConnection = postgres(config.databaseUrl, {
	max: MIGRATION_MAX_CONNECTIONS,
	idle_timeout: MIGRATION_IDLE_TIMEOUT_IN_SECONDS,
});

export const migrator = new Postgrator({
	migrationPattern: path.resolve(__dirname, 'migrations/*'),
	driver: 'pg',
	database: 'bloquinho',
	schemaTable: 'main.migration_schema',
	currentSchema: 'main',
	async execQuery(query) {
		const rows = await migrationConnection.unsafe(query);

		return { rows };
	},
});
