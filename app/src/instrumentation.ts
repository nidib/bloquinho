export async function register() {
	// Environment variables
	const { Envs } = await import('src/utils/constants/envs');
	console.info('Envs:', Envs);

	if (process.env.NEXT_RUNTIME === 'nodejs') {
		// MongoDB initialization
		const { FeatureFlagsService } = await import(
			'src/lib/infra/mongo/services/feature-flag-services'
		);
		await FeatureFlagsService.MIGRATION_ONLY.initialize();
	}
}
