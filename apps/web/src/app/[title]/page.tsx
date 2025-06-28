import { redirect } from 'next/navigation';

import { BloquinhoEditor } from 'src/components/bloquinho-editor/bloquinho-editor';
import { BloquinhoServices } from 'src/lib/infra/mongo/services/bloquinho-services';
import { normalizeBloquinhoTitle } from 'src/utils/text';

type Props = {
	params: Promise<{
		title: string;
	}>;
};

export default async function BloquinhoPage({ params }: Props) {
	const title = (await params).title;
	const decodedTitle = normalizeBloquinhoTitle(decodeURIComponent(title));

	if (title !== decodedTitle) {
		redirect(`/${decodedTitle}`);
	}

	const bloquinho = await BloquinhoServices.getOrCreateBloquinhoByTitle(decodedTitle);

	return (
		<BloquinhoEditor
			title={bloquinho.title}
			content={bloquinho.content}
			extension={bloquinho.extension}
		/>
	);
}
