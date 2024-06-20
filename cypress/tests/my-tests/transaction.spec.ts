describe("Transaction tests", function () {
    beforeEach(function () {
        cy.task("db:seed")

        // login
        cy.visit("/signin")
        cy.get("[data-test='signin-username']").type("Heath93")
        cy.get("[data-test='signin-password']").type("s3cret")
        cy.get("[data-test='signin-submit']").click()
        cy.location("pathname").should("equal", "/")
    })

    it("should send money successfully", function () {
        cy.get("[data-test='nav-top-new-transaction']").click()
        cy.get("[data-test='user-list-search-input']").type("Kristian Bradtke")
        cy.contains("Kristian Bradtke").click()

        let value: number = 1509
        let valueString: string = (value).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
        let message: string = `sending ${valueString} to Kristian Bradtke`
        cy.get("[data-test='transaction-create-amount-input']").type(valueString)
        cy.get("[data-test='transaction-create-description-input']").type(message)
        cy.get("[data-test='transaction-create-submit-payment']").click()

        cy.contains(`Paid ${valueString} for ${message}`).should("be.visible")
    });

    it.only("should display error message when insufficient funds to complete transaction", function () {
        cy.get("[data-test='nav-top-new-transaction']").click()
        cy.get("[data-test='user-list-search-input']").type("Kristian Bradtke")
        cy.contains("Kristian Bradtke").click()

        let value: number = 2000
        let valueString: string = (value).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
        let message: string = `sending ${valueString} to Kristian Bradtke`
        cy.get("[data-test='transaction-create-amount-input']").type(valueString)
        cy.get("[data-test='transaction-create-description-input']").type(message)
        cy.get("[data-test='transaction-create-submit-payment']").click()

        cy.contains(`Paid ${valueString} for ${message}`).should("not.be.visible")
    });

    it.only("should display error message when send amount is negative", function () {
        cy.get("[data-test='nav-top-new-transaction']").click()
        cy.get("[data-test='user-list-search-input']").type("Kristian Bradtke")
        cy.contains("Kristian Bradtke").click()

        let value: number = -2000
        let valueString: string = (value).toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2})
        let message: string = `sending ${valueString} to Kristian Bradtke`
        cy.get("[data-test='transaction-create-amount-input']").type(valueString)
        cy.get("[data-test='transaction-create-description-input']").type(message)
        cy.get("[data-test='transaction-create-submit-payment']").click()

        cy.contains(`Paid ${valueString} for ${message}`).should("not.be.visible")
    });
})