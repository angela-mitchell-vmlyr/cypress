/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      const item = 'My self-esteem';
      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('[data-test="add-item"]').click();
      cy.contains(item);
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Crocs');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"]').children().contains('Crocs');
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Chocolate bar');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"]').children().last().contains('Chocolate bar');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('tooth');
      cy.get('[data-test="items-unpacked"]').children().contains('label', 'Tooth Brush');
      cy.get('[data-test="items-unpacked"]').children().contains('label', 'Tooth Paste');
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('tooth');
      cy.get('[data-test="items-unpacked"]').children().should('not.contain', 'Deoderant');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items-empty-state"]').should('contain', 'No items to show.');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items-packed"] ul li:first [data-test="remove"]').should('exist');
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items-packed"] ul li:first [data-test="remove"]').click();
        cy.get('[data-test="items-packed"]').children().should('not.contain', 'Hoodie');
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] ul li').should('not.exist');
      cy.get('[data-test="items-empty-state"]').last().should('contain', 'No items to show.');
    });

    it('should have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-unpacked"] ul').find('li').should('have.length', 5);
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[id="item-4"]').check();
      cy.get('[data-test="items-unpacked"]').children().should('not.contain', 'iPhone Charger');
      cy.get('[data-test="items-packed"]').children().should('contain', 'iPhone Charger');
    });
  });
});
