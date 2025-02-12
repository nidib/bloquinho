export async function register() {
	console.log('\n');

	// Environment variables
	const { Envs } = await import('src/utils/constants/envs');
	console.group('Envs:');
	console.table(Envs);
	console.groupEnd();

	if (process.env.NEXT_RUNTIME === 'nodejs') {
		// MongoDB initialization
		const { FeatureFlagsService } = await import(
			'src/lib/infra/mongo/services/feature-flag-services'
		);
		const featureFlags = await FeatureFlagsService.MIGRATION_ONLY.initialize();

		console.group('Feature flags:');
		console.table(
			featureFlags.map((flag) => ({
				key: flag.key,
				value: flag.value,
			})),
		);
		console.groupEnd();
	}

	console.log('\n');
}
