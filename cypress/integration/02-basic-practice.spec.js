/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });
  
  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      // TIP: you can store values in variables in spec files
      const item = 'My self-esteem';

      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('[data-test="add-item"]').click();

      cy.contains(item);
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      const item = 'Crocs';

      cy.get('[data-test="new-item-input"]').type(item);

      // Submits Add Item form; equivalent of click() event on add-item button
      // cy.get('[data-test="add-item"]').click();
      cy.get('form').submit();

      // You can be as specific or generic as needed
      // cy.get('[data-test="items-unpacked"]').children().contains(item);
      cy.get('[data-test="items-unpacked"]').contains(item);
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      const item = 'Chocolate bar';

      cy.get('[data-test="new-item-input"]').type(item);
      cy.get('form').submit();

      // Get the last li item; equivalent of using children() and getting last li item
      // cy.get('[data-test="items-unpacked"]').children().last().contains('Chocolate bar');
      cy.get('[data-test="items-unpacked"] li').last().contains('Chocolate bar');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      // You can make it looser with cy.contains() only; you don't always have to scope it more narrowly
      // cy.get('[data-test="items-unpacked"]').children().contains('label', 'Tooth Brush');
      // cy.get('[data-test="items-unpacked"]').children().contains('label', 'Tooth Paste');
      cy.contains('Tooth Brush');
      cy.contains('Tooth Paste');

      // To go deeper, you could also iterate through the items and utilize jQuery to find content; you can chain methods to it as well
      // cy.get('[data-test="items"] li').each(($item) => {
      //   expect($item.text()).to.include('Tooth');
      // });
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      // You can use .should() to check that an item doesn't exist
      // cy.get('[data-test="items-unpacked"]').children().should('not.contain', 'Hoodie');
      cy.contains('Hoodie').should('not.exist');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();

        // cy.get('[data-test="items-empty-state"]').should('contain', 'No items to show.');
        cy.get('[data-test="items"] li').should('not.exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        // cy.get('[data-test="items-packed"] ul li:first [data-test="remove"]').should('exist');
        cy.get('[data-test="items"] li').each(($li) => {
          cy.wrap($li).find('[data-test="remove"]');
        });
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items"] li').each(($li) => {
          // cy.wrap() takes somehing that's not a Cypress chainable object and makes it a Cypress chainable object
          // Clicks each item's remove buttona and checks if they are no longer on the page
          cy.wrap($li).find('[data-test="remove"]').click();
          cy.wrap($li).should('not.exist');
        });
        // cy.get('[data-test="items-packed"] ul li:first [data-test="remove"]').click();
        // cy.get('[data-test="items-packed"]').children().should('not.contain', 'Hoodie');
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
      // cy.get('[id="item-4"]').check();
      // cy.get('[data-test="items-unpacked"]').children().should('not.contain', 'iPhone Charger');
      // cy.get('[data-test="items-packed"]').children().should('contain', 'iPhone Charger');

      cy.get('[data-test="items-unpacked"] li').each(($li) => {
        cy.wrap($li).find('input[type="checkbox"]').check();
        cy.get('[data-test="items-packed"]').should('contain.text', $li.text());
        cy.get('[data-test="items-unpacked"]').should('not.contain.text', $li.text());
      });
    });
  });
});
