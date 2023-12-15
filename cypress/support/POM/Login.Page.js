class Login{

    get = {
        endpoint: ()=> cy.visit("/auth/login"),
        usernameInput: () => cy.get('[name = "username"]'),
        passwordInput: () => cy.get('[name = "password"]'),
        submitButton: () => cy.get('[type = "submit"]'),
        forgotLink: () => cy.get('[class*= "login-forgot"] p'),
    }


}
