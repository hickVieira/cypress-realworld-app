import { Pages, utils } from "./utils"

describe("Login and Register tests", function () {
    beforeEach(function () {
        cy.task("db:seed")
    })

    it("should login successfully", function () {
        utils.signIn("Arvilla_Hegmann", "s3cret", Pages.Root)
    })

    it("should display error message when invalid username", function () {
        utils.signIn("invalidUserName", "s3cret", Pages.SignIn)
        cy.contains("Username or password is invalid").should("be.visible")
    })

    it("should display error message when invalid password", function () {
        utils.signIn("Arvilla_Hegmann", "invalidPassword", Pages.SignIn)
        cy.contains("Username or password is invalid").should("be.visible")
    })

    it("should register successfully", function () {
        utils.signUp("Fulano", "Ciclano", "TestUser", "s3cret", "s3cret", Pages.SignIn)
    })

    it("should display error message when missing first name", function () {
        utils.signUp("{selectall}{backspace}", "Ciclano", "TestUser", "s3cret", "s3cret", Pages.SignUp)
        cy.contains("First Name is required").should("be.visible") // error message
        cy.get("[data-test='signup-submit']").should("be.disabled") // locked submit button
    })

    it("should display error message when missing last name", function () {
        utils.signUp("Fulano", "{selectall}{backspace}", "TestUser", "s3cret", "s3cret", Pages.SignUp)
        cy.contains("Last Name is required").should("be.visible") // error message
        cy.get("[data-test='signup-submit']").should("be.disabled") // locked submit button
    })

    it("should display error message when missing username", function () {
        utils.signUp("Fulano", "Ciclano", "{selectall}{backspace}", "s3cret", "s3cret", Pages.SignUp)
        cy.contains("Username is required").should("be.visible") // error message
        cy.get("[data-test='signup-submit']").should("be.disabled") // locked submit button
    })

    it("should display error message when missing password", function () {
        utils.signUp("Fulano", "Ciclano", "TestUser", "{selectall}{backspace}", "s3cret", Pages.SignUp)
        cy.contains("Enter your password").should("be.visible") // error message
        cy.get("[data-test='signup-submit']").should("be.disabled") // locked submit button
    })

    it("should display error message when passwords not matching", function () {
        utils.signUp("Fulano", "Ciclano", "TestUser", "s3cret", "DIFFERENT PASSWORD", Pages.SignUp)
        cy.contains("Password does not match").should("be.visible") // error message
        cy.get("[data-test='signup-submit']").should("be.disabled") // locked submit button
    })

    it("should display error message when password having wrong length", function () {
        utils.signUp("Fulano", "Ciclano", "TestUser", "123", "123", Pages.SignUp)
        cy.contains("Password must contain at least 4 characters").should("be.visible") // error message
        cy.get("[data-test='signup-submit']").should("be.disabled") // locked submit button
    })
})