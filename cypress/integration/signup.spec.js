
import signupPage from '../support/pages/signup'

describe('cadastro', () => {

  context('quando cadastrar um novo usuario', () => {
    const user = {
      name: 'Francisco', email: 'francisco@samuraibs.com', password: 'pwd123'
    }
    before(() => {
      signupPage.removeDataBase(user)
    })
    it('deve cadastrar um novo usuario', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
    });
  })

  context('quando o email já existe', () => {
    const user = {
      name: 'Carlos',
      email: 'carlos@samuraibs.com',
      password: 'pwd123',
      is_provider: true
    }
    before(() => {
      signupPage.removeDataBase(user)
      signupPage.request(user)
    })
    it('não deve cadastrar', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
    });
  })

  context('quando o email é incorreto', () => {
    const user = {
      name: 'Elizabeth Olsen', email: 'liza.samuraibs.com', password: 'pwd123'
    }
    it('deve exibir mensagem de alerta', () => {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alertHaveText('Informe um email válido')
    });
  })

  context('quando a senha tem menos de 6 caracteres', () => {
    const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

    beforeEach(() => {
      signupPage.go()
    })
    passwords.forEach(function (p) {
      it('não deve cadastrar com a senha: ' + p, () => {
        const user = {
          name: 'Jason', email: 'jason@samuraibs.com', password: p
        }
        signupPage.form(user)
        signupPage.submit()
      });
    })
    afterEach(function () {
      signupPage.alertHaveText('Pelo menos 6 caracteres')
    })
  })
 
  context('quando nao preenche nenhum  dos campos', () => {
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
        signupPage.alertHaveText(alert)
      });
    })
  })
});