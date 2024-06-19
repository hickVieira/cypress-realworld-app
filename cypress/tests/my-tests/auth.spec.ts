describe("Login and Register tests", function () {
    beforeEach(function () {
        cy.task("db:seed")
    })
    
    it("should login successfully", function () {
        cy.visit("/signin")
        cy.get("[data-test='signin-username']").type("Arvilla_Hegmann")
        cy.get("[data-test='signin-password']").type("s3cret")
        cy.get("[data-test='signin-submit']").click()
        cy.location("pathname").should("equal", "/")
    })

    it("should display error message due to invalid username", function () {
        cy.visit("/signin")
        cy.get("[data-test='signin-username']").type("sdasdsadsad")
        cy.get("[data-test='signin-password']").type("s3cret")
        cy.get("[data-test='signin-submit']").click()
        cy.location("pathname").should("equal", "/signin")
        cy.contains("Username or password is invalid").should("be.visible")
    })

    it("should display error message due to invalid password", function () {
        cy.visit("/signin")
        cy.get("[data-test='signin-username']").type("Arvilla_Hegmann")
        cy.get("[data-test='signin-password']").type("12345")
        cy.get("[data-test='signin-submit']").click()
        cy.location("pathname").should("equal", "/signin")
        cy.contains("Username or password is invalid").should("be.visible")
    })

    it("should register successfully", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type("Fulano")
        cy.get("[data-test='signup-last-name']").type("Ciclano")
        cy.get("[data-test='signup-username']").type("TestUser")
        cy.get("[data-test='signup-password']").type("s3cret")
        cy.get("[data-test='signup-confirmPassword']").type("s3cret")
        cy.get("[data-test='signup-submit']").click()
        cy.location("pathname").should("equal", "/signin")
    })

    it("should display error message due to missing first name", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type('{selectall}{backspace}')
        cy.get("[data-test='signup-last-name']").type("Ciclano")
        cy.get("[data-test='signup-username']").type("TestUser")
        cy.get("[data-test='signup-password']").type("s3cret")
        cy.get("[data-test='signup-confirmPassword']").type("s3cret")
        cy.contains("First Name is required").should("be.visible")
        cy.get("[data-test='signup-submit']").should("be.disabled")
        cy.location("pathname").should("equal", "/signup")
    })

    it("should display error message due to missing last name", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type("Fulano")
        cy.get("[data-test='signup-last-name']").type('{selectall}{backspace}')
        cy.get("[data-test='signup-username']").type("TestUser")
        cy.get("[data-test='signup-password']").type("s3cret")
        cy.get("[data-test='signup-confirmPassword']").type("s3cret")
        cy.contains("Last Name is required").should("be.visible")
        cy.get("[data-test='signup-submit']").should("be.disabled")
        cy.location("pathname").should("equal", "/signup")
    })

    it("should display error message due to missing username", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type("Fulano")
        cy.get("[data-test='signup-last-name']").type("Ciclano")
        cy.get("[data-test='signup-username']").type('{selectall}{backspace}')
        cy.get("[data-test='signup-password']").type("s3cret")
        cy.get("[data-test='signup-confirmPassword']").type("s3cret")
        cy.contains("Username is required").should("be.visible")
        cy.get("[data-test='signup-submit']").should("be.disabled")
        cy.location("pathname").should("equal", "/signup")
    })

    it("should display error message due to missing password", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type("Fulano")
        cy.get("[data-test='signup-last-name']").type("Ciclano")
        cy.get("[data-test='signup-username']").type('TestUser')
        cy.get("[data-test='signup-password']").type('{selectall}{backspace}')
        cy.get("[data-test='signup-confirmPassword']").type("s3cret")
        cy.contains("Enter your password").should("be.visible")
        cy.get("[data-test='signup-submit']").should("be.disabled")
        cy.location("pathname").should("equal", "/signup")
    })

    it("should display error message due to passwords not matching", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type("Fulano")
        cy.get("[data-test='signup-last-name']").type("Ciclano")
        cy.get("[data-test='signup-username']").type("TestUser")
        cy.get("[data-test='signup-password']").type("12345")
        cy.get("[data-test='signup-confirmPassword']").type("54321")
        cy.contains("Password does not match").should("be.visible")
        cy.get("[data-test='signup-submit']").should("be.disabled")
        cy.location("pathname").should("equal", "/signup")
    })

    it("should display error message due to password having wrong length", function () {
        cy.visit("/signup")
        cy.get("[data-test='signup-first-name']").type("Fulano")
        cy.get("[data-test='signup-last-name']").type("Ciclano")
        cy.get("[data-test='signup-username']").type("TestUser")
        cy.get("[data-test='signup-password']").type("123")
        cy.get("[data-test='signup-confirmPassword']").type("123")
        cy.contains("Password must contain at least 4 characters").should("be.visible")
        cy.get("[data-test='signup-submit']").should("be.disabled")
        cy.location("pathname").should("equal", "/signup")
    })
})