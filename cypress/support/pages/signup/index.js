import { el } from './elements'
import toast from '../../components/toast';
class SignupPage {

  constructor() {
    this.toast = toast
  }

  go() {
    cy.visit('/signup');
  }

  form(user) {
    cy.get(el.name).type(user.name);
    cy.get(el.email).type(user.email);
    cy.get(el.password).type(user.password);
  }

  submit() {
    // cy.intercept('POST', '/users', { statusCode: 200 })
    //   .as(`postUser`)
    cy.contains(el.signupButton).click();
    //cy.wait('@postUser');
  }

  removeDataBase(user) {
    cy.task('removeUser', user.email).then(function (result) {
      console.log(result)
    })
  }

  request(user) {
    cy.request('POST', 'http://localhost:3333/users', user).then(function (response) {
      expect(response.status).to.eq(200)
    })
  }

  alertHaveText(expectText) {
    cy.contains('.alert-error', expectText)
      .should('be.visible')
  }

}

export default new SignupPage()