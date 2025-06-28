describe('Home page', () => {
	it('should load', () => {
		cy.visit('http://localhost:3000');

		cy.get('h1').should('have.text', 'Bloquinho');
	});

	it('should render a text input with a button', () => {
		cy.visit('http://localhost:3000');

		cy.get('input[type="text"]').should('exist');
		cy.get('button[type="submit"]').should('exist');
	});
});
