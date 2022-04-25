import fpPage from '../support/pages/forgotpass'


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

})