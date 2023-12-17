//import { login} from "../../support/POM/Login.Page"; // ES6 module

const { login} = require("../../support/POM/Login.Page");

const {authLogin, dashboardIndex} = Cypress.env('endpoint');
// Desestructurar el objeto del usuario
const {username, password} = Cypress.env('AdminUser');
describe("user logs in", () => {
    beforeEach(() => {
       cy.visit('/')
       cy.url().should('contain',authLogin)
    });

    it('validate login succesfully', () => {
        login.enterUsername(username);
        login.enterPassword(password);
        login.submitLogin();

        cy.url().should('contain',dashboardIndex)
    })
})