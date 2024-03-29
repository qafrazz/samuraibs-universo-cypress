/// <reference types="cypress" />
import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {
  context('quando o usuario é muito bom', () => {
    const user = {
      name: 'Robson Jassa',
      email: 'jassa@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }

    before(function () {
      cy.postUser(user)
    });

    it('deve logar com sucesso', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      dashPage.header.userLoggedIn(user.name)

    });

  })

  context('quando o usuario é bom mas a senha esta incorreta', function () {
    let user = {
      name: 'Celso Kamura',
      email: 'kamura@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }
    before(() => {
      cy.postUser(user).then(function () {
        user.password = 'abc123'
      })
    })
    it('deve notificar erro de credenciais', function () {
      loginPage.go()
      loginPage.form(user)
      loginPage.submit()
      const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
      loginPage.toast.HaveText(message)

    });

  })

  context('quando o formato do email é invalido', function () {
    const emails = [
      'papito.com.br',
      'yahoo.com',
      '@',
      '@gmail.com',
      '111111',
      '@##$@$'
    ]

    before(function () {
      loginPage.go()
    })


    emails.forEach(function (email) {
      it('nao deve logar com o email: ' + email, () => {
        const user = { email: email, password: 'pwd123' }

        loginPage.form(user)
        loginPage.submit()
        loginPage.alert.HaveText('Informe um email válido')

      });
    })

  })

  context('quando nao preencho nenhum  dos campos', function () {
    const alertMessages = [
      'E-mail é obrigatório',
      'Senha é obrigatória']

    before(function () {
      loginPage.go()
      loginPage.submit()
    })
    alertMessages.forEach(function (alert) {
      it('deve exibir ' + alert.toLowerCase(), () => {
        loginPage.alert.HaveText(alert)
      });
    })
  })
});