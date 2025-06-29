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
});
