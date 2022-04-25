
import signupPage from '../support/pages/signup'

describe('cadastro', function () {

  before(function () {
    cy.fixture("signup").then(function(signup){
      this.success = signup.success
      this.email_dup = signup.email_dup
      this.email_inv = signup.email_inv
      this.short_password = signup.short_password
    })
  })

  context('quando cadastrar um novo usuario', function () {
   
    before(function () {
      signupPage.removeDataBase(this.success)
    })
    it('deve cadastrar um novo usuario', function () {
      signupPage.go()
      signupPage.form(this.success)
      signupPage.submit()
      signupPage.toast
        .HaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    });
  })

  context('quando o email já existe', function () {
    
    before(function () {
      cy.postUser(this.email_dup)
    })
    it('não deve cadastrar', function () {
      signupPage.go()
      signupPage.form(this.email_dup)
      signupPage.submit()
      signupPage.toast
        .HaveText('Email já cadastrado para outro usuário.')
    });
  })

  context('quando o email é incorreto', function () {
  
    it('deve exibir mensagem de alerta', function () {
      signupPage.go()
      signupPage.form(this.email_inv)
      signupPage.submit()
      signupPage.alert
        .HaveText('Informe um email válido')
    });
  })

  context('quando a senha tem menos de 6 caracteres', function () {
   
    const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

    
    passwords.forEach(function (p) {
      it('não deve cadastrar com a senha: ' + p, function () {
       this.short_password.password = p
       
       signupPage.go()
       signupPage.form(this.short_password)
        signupPage.submit()
      });
    })
    afterEach(function () {
      signupPage.alert
        .HaveText('Pelo menos 6 caracteres')
    })
  })

  context('quando nao preenche nenhum  dos campos', function () {
    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório',
      'Senha é obrigatória']

    before(function () {
      signupPage.go()
      signupPage.submit()
    })
    alertMessages.forEach(function (alert) {
      it('deve exibir ' + alert.toLowerCase(), () => {
        signupPage.alert.HaveText(alert)
      });
    })
  })
});