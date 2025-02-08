'use client';

import { useRouter } from 'next/navigation';
import { type FormEventHandler, useState } from 'react';
import { Button } from 'src/components/form/button';
import { TextInput } from 'src/components/form/text-input';
import { normalizeBloquinhoTitle } from 'src/utils/text';

export function CreateBloquinhoForm() {
	const router = useRouter();
	const [bloquinhoTitle, setBloquinhoTitle] = useState('');
	const trimmedTitle = bloquinhoTitle.trim();
	const normalizedBloquinhoTitle = normalizeBloquinhoTitle(trimmedTitle);
	const cannotCreate = !normalizedBloquinhoTitle;

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		if (!normalizedBloquinhoTitle) {
			return;
		}

		router.push(`/${normalizedBloquinhoTitle}`);
	};

	return (
		<div className="flex flex-col items-start gap-3">
			<form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
				<TextInput
					value={bloquinhoTitle}
					placeholder="nome-do-seu-bloquinho"
					onChange={setBloquinhoTitle}
					autoFocus
				/>
				<Button type="submit" disabled={cannotCreate}>
					Criar bloquinho
				</Button>
			</form>
			{trimmedTitle !== normalizedBloquinhoTitle && (
				<span className="text-amber-500">
					{'Será criado como: '}
					<strong>{normalizedBloquinhoTitle}</strong>
				</span>
			)}
		</div>
	);
}
