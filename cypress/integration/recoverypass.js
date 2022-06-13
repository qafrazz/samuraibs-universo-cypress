import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'

describe('Recuperar a senha', function () {

  before(function () {
    cy.fixture('recovery').then(function (recovery) {
      this.recovery = recovery
    })
  })
  context('quando o usuario esquece a senha', function () {
    before(function () {
      cy.postUser(this.recovery)
    })
    it('deve poder resgatar por email', function () {
      fpPage.go()
      fpPage.form(this.recovery.email)
      fpPage.submit()

      const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
      fpPage.toast.HaveText(message)

    })

  })

  context('quando o usuario solicita o resgate', function () {
    before(function () {
      cy.postUser(this.recovery)
      cy.recoveryPass(this.recovery.email)
    });
    
    it('deve poder cadastrar uma nova senha', function () {
      const token = Cypress.env('recoveryToken')

      rpPage.go(token)
      rpPage.form('abc123', 'abc123')
      rpPage.submit()
      const message = 'Agora você já pode logar com a sua nova senha secreta.'
      rpPage.toast.HaveText(message)
    })
  })

})