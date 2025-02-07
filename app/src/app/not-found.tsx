import { MaintenancePage } from 'src/components/maintenance';

export default function NotFound() {
	if (process.env.MAINTENANCE === 'true') {
		return <MaintenancePage />;
	}

	return (
		<div className="h-[100dvh] w-[100dvw] flex items-center justify-center">
			<h1 className="text-zinc-600 text-xl lg:text-2xl font-bold">
				Essa página não existe
			</h1>
		</div>
	);
}
