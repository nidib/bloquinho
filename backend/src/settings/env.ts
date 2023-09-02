function getEnv(env: string, fallback?: string) {
	return process.env[env] ?? fallback;
}

function getEnvOrThrow(env: string) {
	const value = getEnv(env);

	if (value === undefined) {
		throw new Error(`Required environment variable "${env}" not found`);
	}

	return value;
}

export const config = {
	databaseUrl: getEnvOrThrow('DB_URL'),
	serverPort: 8080,
	serverHost: '0.0.0.0',
	commitHash: getEnv('COMMIT_HASH', ''),
};
