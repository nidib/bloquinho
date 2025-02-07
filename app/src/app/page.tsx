import { MaintenancePage } from 'src/components/maintenance';

export default function Home() {
	if (process.env.MAINTENANCE === 'true') {
		return <MaintenancePage />;
	}

	return <h1>Bloquinho</h1>;
}
