describe('Badges', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid=game-select]').click();
    cy.contains('Sword and Shield').click();
  });

  it('Select badge', () => {
    cy.get('[title="Fire Badge"]')
      .click()
      .should('have.css', 'background-color', 'rgb(212, 106, 106)');
  });

  it('Edit badges', () => {
    cy.get('[title="Grass Badge"]').should('have.text', '20');
    cy.get('[data-testid=edit-badges]').click();
    cy.get('.content > :nth-child(1) > input').type('99');
    cy.contains('Close').click();
    cy.get('[title="Grass Badge"]').should('have.text', '2099');
    cy.get('[data-testid=edit-badges]').click();
    cy.contains('Reset').click();
    cy.contains('Close').click();
    cy.get('[title="Grass Badge"]').should('have.text', '20');
  });
});
