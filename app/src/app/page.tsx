import { CreateBloquinhoForm } from 'src/components/create-bloquinho-form';
import { MaintenancePage } from 'src/components/maintenance';
import { App } from 'src/utils/constants/app-constants';

export default function Home() {
	if (process.env.MAINTENANCE === 'true') {
		return <MaintenancePage />;
	}

	return (
		<div className="flex flex-col items-center h-full">
			<div className="mt-0 mx-auto flex flex-col items-center text-center pt-[140px] px-[20px] pb-[80px]">
				<h1 className="text-zinc-700 text-7xl font-black">{App.TITLE}</h1>
				<h2 className="text-zinc-600 text-4xl font-bold">{App.DESCRIPTION}</h2>
			</div>
			<CreateBloquinhoForm />
		</div>
	);
}
