import { FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { styled } from '../themes/theme';
import { TextInput } from '../components/core/text-input';
import { Button } from '../components/core/button';
import { normalizeBloquinhoTitle } from '../utils/text-utils';

const Page = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	height: '100%',
});

const HeadingGroup = styled('div', {
	width: '700px',
	maxWidth: '100%',
	margin: '0 auto',
	display: 'flex',
	alignItems: 'flex-start',
	flexDirection: 'column',
	padding: '80px 0px 140px 0px',
});

const Heading1 = styled('h1', {
	color: '$textRegular',
	fontSize: '$5',
	lineHeight: '64px',
	fontWeight: 1000,
});

const Heading2 = styled('h2', {
	color: '$textRegular',
	fontSize: '$4',
	fontWeight: 700,
});

const Form = styled('form', {
	display: 'flex',
	gap: '$1',
});

const FormWithInfoSpan = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
	gap: '$1',
});

const InfoSpan = styled('span', {
	fontSize: '$0',
	marginLeft: '$1',
	color: '$warning',
});

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
		<Page>
			<HeadingGroup>
				<Heading1>Bloquinho</Heading1>
				<Heading2>Compartilhando suas notas de forma fácil.</Heading2>
			</HeadingGroup>
			<FormWithInfoSpan>
				<Form onSubmit={handleSubmit}>
					<TextInput
						value={bloquinhoTitle}
						info={'Alguma info'}
						placeholder={'nome-do-seu-bloquinho'}
						onChange={setBloquinhoTitle}
						autoFocus
					/>
					<Button type={'submit'}>Criar bloquinho</Button>
				</Form>
				{trimmedTitle !== normalizedBloquinhoTitle && (
					<InfoSpan>
						{'Será criado como: '}
						<strong>{normalizedBloquinhoTitle}</strong>
					</InfoSpan>
				)}
			</FormWithInfoSpan>
		</Page>
	);
}
