import { el } from "./elements";


class DashPage {
  userLoggedIn(userName) {
    cy.get(el.header, { timeout: 7000 })
      .should('be.visible')
      .should('have.text', userName);
  }
}

export default new DashPage()