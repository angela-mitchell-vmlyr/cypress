/// <reference types="cypress" />

describe('Create a New Item', () => {
    beforeEach(() => {
        cy.visit('/jetsetter');
    });

    it('should have a form', () => {
        // checks if a form element exists
        cy.get('form').should('exist');
    });

    it('should have the words "Add Item"', () => {
        // check if 'Add Item' appears on the page
        cy.contains('Add Item');
    })
});
