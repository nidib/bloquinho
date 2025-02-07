type Props = {
	params: Promise<{
		title: string;
	}>;
};

export default async function BloquinhoPage({ params }: Props) {
	const title = (await params).title;

	return <h1>Título: {title}</h1>;
}
