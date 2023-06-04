import path from 'path';
import Postgrator from 'postgrator';
import postgres from 'postgres';


const connection = postgres(process.env.DB_URL as string);
const migrationConnection = postgres(process.env.DB_URL as string, { max: 1, idle_timeout: 2 * 60 });
const migrator = new Postgrator({
	migrationPattern: path.resolve(__dirname, 'migrations/*'),
	driver: 'pg',
	database: 'bloquinho',
	schemaTable: 'main.migration_schema',
	currentSchema: 'main',
	execQuery: async query => {
		const rows = await migrationConnection.unsafe(query);

		return { rows };
	},
});

export const database = {
	sql: connection,
	closeConnection: connection.end,
	healthCheck: async () => connection`SELECT 1`,
	migrate: async () => {
		try {
			console.log('Running migrations...');
	
			await migrator.migrate();

			console.log('Migrations completed!');
		} catch(e) {
			console.log('Something went wrong while running migrations');
			console.error(e);
		}
	},
};
