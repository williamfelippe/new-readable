import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps'

Given('I visit initial page', () => {
  cy.visit('/')
})

When('I click the first post', () => {
  cy.findAllByTestId('post-item-link')
    .should('be.visible')
    .first()
    .click()
})

Then('the url should include /post', () => {
  cy.url().should('include', '/post')
})
