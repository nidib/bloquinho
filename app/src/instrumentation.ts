export async function register() {
	const { Envs } = await import('src/utils/constants/envs');
	console.info('Envs:', Envs);
}
