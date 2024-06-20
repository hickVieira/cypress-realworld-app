import { Pages, utils } from "./utils";

describe("Transaction tests", function () {
    beforeEach(function () {
        cy.task("db:seed")

        // login
        utils.signIn("Heath93", "s3cret", Pages.Root)
    })

    it("should send money successfully", function () {
        utils.performTransaction("Kristian Bradtke", 1000, "here free some money buddy", "be.visible")
    });

    it("should display error message when insufficient funds to complete transaction", function () {
        utils.performTransaction("Kristian Bradtke", 2000, "here free some money buddy", "not.be.visible")
    });

    it("should display error message when send amount is negative", function () {
        utils.performTransaction("Kristian Bradtke", -2000, "here free some money buddy", "not.be.visible")
    });
})