export enum Pages {
    Root = "/",
    SignIn = "/signin",
    SignUp = "/signup",
}

export class utils {
    public static goToPage(page: Pages) {
        cy.visit(page)
    }

    public static locationShouldBe(page: Pages) {
        cy.location("pathname").should("equal", page)
    }

    public static signUp(firstName: string, lastName: string, username: string, password: string, passwordConfirm: string, expectedPage?: Pages) {
        utils.goToPage(Pages.SignUp)
        cy.get("[data-test='signup-first-name']").type(firstName)
        cy.get("[data-test='signup-last-name']").type(lastName)
        cy.get("[data-test='signup-username']").type(username)
        cy.get("[data-test='signup-password']").type(password)
        cy.get("[data-test='signup-confirmPassword']").type(passwordConfirm)
        cy.get("[data-test='signup-submit']").then(($button) => {
            if (!$button.is(":disabled"))
                $button.trigger("click")
        })

        if (expectedPage)
            utils.locationShouldBe(expectedPage)
    }

    public static signIn(username: string, password: string, expectedPage?: Pages) {
        utils.goToPage(Pages.SignIn)
        cy.get("[data-test='signin-username']").type(username)
        cy.get("[data-test='signin-password']").type(password)
        cy.get("[data-test='signin-submit']").click()

        if (expectedPage)
            utils.locationShouldBe(expectedPage)
    }

    public static onboarding(expectedPage?: Pages) {
        cy.get("[data-test='user-onboarding-next']").click()
        cy.get("[data-test='bankaccount-bankName-input']").type("Banco do Brasil")
        cy.get("[data-test='bankaccount-routingNumber-input']").type("123456789")
        cy.get("[data-test='bankaccount-accountNumber-input']").type("987654321")
        cy.get("[data-test='bankaccount-submit']").click()
        cy.get("[data-test='user-onboarding-next']").click()

        if (expectedPage)
            utils.locationShouldBe(expectedPage)
    }
}