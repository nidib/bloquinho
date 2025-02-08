import { mongoCollections } from 'src/lib/infra/mongo';

type Props = {
	params: Promise<{
		title: string;
	}>;
};

export default async function BloquinhoPage({ params }: Props) {
	const title = (await params).title;
	const bloquinho = await mongoCollections.bloquinho.findOne({ title });

	if (!bloquinho) {
		return null;
	}

	return (
		<ul>
			<li>Title: {bloquinho.title}</li>
			<li>Content: {bloquinho.content}</li>
		</ul>
	);
}
