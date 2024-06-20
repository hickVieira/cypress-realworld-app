import { Pages, utils } from "./utils"

describe("Transaction feed tests", function () {
    beforeEach(function () {
        cy.task("db:seed")
    })

    it("should display personal transaction feed", function () {
        utils.signIn("Heath93", "s3cret")

        cy.get("[data-test='nav-personal-tab']").click()
        cy.location("pathname").should("equal", "/personal")
    })

    it("should display empty personal transaction feed", function () {
        utils.signUp("Fulano", "Ciclano", "tester", "1234", "1234", Pages.SignIn)
        utils.signIn("tester", "1234", Pages.Root)
        utils.onboarding(Pages.Root)

        cy.get("[data-test='nav-personal-tab']").click()
        cy.contains("No Transactions").should("be.visible") // no transactions message
        cy.location("pathname").should("equal", "/personal") // make sure we are in personal page
    })
})