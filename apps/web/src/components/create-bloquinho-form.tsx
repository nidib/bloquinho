'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FormEventHandler } from 'react';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { useI18n } from 'src/providers/i18n-provider';
import { normalizeBloquinhoTitle } from 'src/utils/text';

export function CreateBloquinhoForm() {
	const router = useRouter();
	const { t } = useI18n();
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
				<div className="w-[300px] h-full">
					<Input
						id="bloquinho-title"
						value={bloquinhoTitle}
						placeholder={t('CreateBloquinhoInputPlaceholder')}
						onChange={setBloquinhoTitle}
						size="lg"
						autoFocus
					/>
				</div>
				<Button size="lg" type="submit" disabled={cannotCreate}>
					{t('CreateBloquinho')}
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
