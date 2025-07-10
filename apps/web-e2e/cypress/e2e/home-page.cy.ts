describe('Home page', () => {
	it('should load', () => {
		cy.visit('/');

		cy.get('h1').should('have.text', 'Bloquinho');
	});

	it('should render a text input with a button', () => {
		cy.visit('/');

		cy.get('input[type="text"]').should('exist');
		cy.get('button[type="submit"]').should('exist');
	});

	it('should autofocus the text input', () => {
		cy.visit('/');

		cy.get('input[type="text"]').should('be.focused');
	});

	it('should allow typing in the text input', () => {
		cy.visit('/');
		const text = 'foo';

		cy.get('input[type="text"]').type(text);

		cy.get('input[type="text"]').should('have.value', text);
	});

	it('should navigate to the bloquinho page when the form is submitted by clicking the button', () => {
		cy.visit('/');
		const text = 'foo';
		cy.get('input[type="text"]').type(text);

		cy.get('button[type="submit"]').click();

		cy.url({ timeout: 10_000 }).should('include', `/${text}`);
	});

	it('should navigate to the bloquinho page when the form is submitted by pressing enter', () => {
		cy.visit('/');
		const text = 'foo';
		cy.get('input[type="text"]').type(text);

		cy.get('input[type="text"]').type('{enter}');

		cy.url({ timeout: 10_000 }).should('include', `/${text}`);
	});

	describe('i18n', () => {
		it('should render the page in the default language (en-US)', () => {
			cy.visit('/', {
				onBeforeLoad(win) {
					Object.defineProperty(win.navigator, 'language', {
						value: 'en-US',
					});
				},
			});

			cy.get('h2').should('have.text', 'Sharing your snippets easily');
		});

		it('should render the page in the default language (en-US) when the language is not supported', () => {
			cy.visit('/', {
				onBeforeLoad(win) {
					Object.defineProperty(win.navigator, 'language', {
						value: 'BlackSpeech',
					});
				},
			});

			cy.get('h2').should('have.text', 'Sharing your snippets easily');
		});

		it('should render the page in the default language (es-ES)', () => {
			cy.visit('/', {
				onBeforeLoad(win) {
					Object.defineProperty(win.navigator, 'language', {
						value: 'es-ES',
					});
				},
			});

			cy.get('h2').should('have.text', 'Comparte tus fragmentos fácilmente');
		});

		it('should render the page in the selected language (pt-BR)', () => {
			cy.visit('/', {
				onBeforeLoad(win) {
					Object.defineProperty(win.navigator, 'language', {
						value: 'pt-BR',
					});
				},
			});

			cy.get('h2').should('have.text', 'Compartilhando seus snippets facilmente');
		});
	});
});
