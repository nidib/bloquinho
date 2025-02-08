import { redirect } from 'next/navigation';
import { getOrCreateBloquinhoByTitle } from 'src/lib/infra/mongo/services';
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

	const bloquinho = await getOrCreateBloquinhoByTitle(decodedTitle);

	return (
		<ul>
			<li>Title: {bloquinho.title}</li>
			<li>Content: {bloquinho.content}</li>
		</ul>
	);
}
