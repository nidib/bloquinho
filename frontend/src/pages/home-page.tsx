import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextInput } from '../components/core/text-input';
import { Button } from '../components/core/button';
import { normalizeBloquinhoTitle } from '../utils/text-utils';

export function HomePage() {
	const [bloquinhoTitle, setBloquinhoTitle] = useState('');
	const navigate = useNavigate();
	const trimmedTitle = bloquinhoTitle.trim();
	const normalizedBloquinhoTitle = normalizeBloquinhoTitle(bloquinhoTitle);

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		normalizedBloquinhoTitle && navigate(normalizedBloquinhoTitle);
	};

	return (
		<div className="flex flex-col items-center h-full">
			<div className="mt-0 mx-auto flex flex-col items-center text-center pt-[140px] px-[20px] pb-[80px]">
				<h1 className="text-zinc-700 text-7xl font-black">Bloquinho</h1>
				<h2 className="text-zinc-600 text-4xl font-bold">Compartilhando suas notas de forma fácil.</h2>
			</div>
			<div className="flex flex-col items-start gap-3">
				<form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
					<TextInput
						value={bloquinhoTitle}
						info="Alguma info"
						placeholder="nome-do-seu-bloquinho"
						onChange={setBloquinhoTitle}
						autoFocus
					/>
					<Button type={'submit'}>Criar bloquinho</Button>
				</form>
				{trimmedTitle !== normalizedBloquinhoTitle && (
					<span className="text-amber-500">
						{'Será criado como: '}
						<strong>{normalizedBloquinhoTitle}</strong>
					</span>
				)}
			</div>
		</div>
	);
}
