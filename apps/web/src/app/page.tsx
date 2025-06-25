import { CreateBloquinhoForm } from 'src/components/create-bloquinho-form';
import { HomePageHeader } from 'src/components/home-page-header/home-page-header';

export default function Home() {
	return (
		<div className="flex flex-col items-center h-full">
			<div className="mt-0 mx-auto flex flex-col items-center text-center pt-[140px] px-[20px] pb-[80px]">
				<HomePageHeader />
			</div>
			<CreateBloquinhoForm />
		</div>
	);
}
