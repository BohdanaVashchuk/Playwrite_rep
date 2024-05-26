const { test, expect } = require('@playwright/test');
const faker = require('faker');

function generateRandomEmail(prefix) {
    return `${prefix}_${faker.random.alphaNumeric(7)}@example.com`;
}

test.describe('Validation of Registration form', () => {
    let page, signUpButton, registrationModal, nameInput, lastNameInput, emailInput, passwordInput, repeatPasswordInput, registrationModalFooter, registerButton;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        await signUpButton.click();
        registrationModal = page.locator('.modal-body');
        nameInput = registrationModal.locator('#signupName');
        lastNameInput = registrationModal.locator('#signupLastName');
        emailInput = registrationModal.locator('#signupEmail');
        passwordInput = registrationModal.locator('#signupPassword');
        repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
        registrationModalFooter = page.locator('.modal-footer');
        registerButton = registrationModalFooter.locator('.btn.btn-primary');
        garageH1ToValidateLogIn = page.locator('h1:has-text("Garage")');
    });

    test('Valid Registration', async () => {
        await nameInput.fill("Bohdana");
        await lastNameInput.fill("Vashchuk");
        await emailInput.fill(generateRandomEmail('Dan'));
        await passwordInput.fill("DanaTest2!");
        await repeatPasswordInput.fill("DanaTest2!");
        await registerButton.click();
        await expect(garageH1ToValidateLogIn).toBeVisible();
    });

    test('Validation of Empty fields', async () => {
        await nameInput.fill("");
        await lastNameInput.fill("");
        await emailInput.fill("");
        await passwordInput.fill("");
        await repeatPasswordInput.fill("");
        // await page.evaluate(() => document.activeElement.blur());
        await expect(registerButton).toBeDisabled();
        const formErrorElement = page.locator('.ng-pristine.ng-invalid.ng-touched');
        const nameErrorElement = formErrorElement.locator('.invalid-feedback:has-text("Name required")');
        const lastNameErrorElement = formErrorElement.locator('.invalid-feedback:has-text("Last name required")');
        const emailErrorElement = formErrorElement.locator('.invalid-feedback:has-text("Email required")');
        const passwordErrorElement = formErrorElement.locator('.invalid-feedback:has-text("Password required")');
        const rePasswordErrorElement = formErrorElement.locator('.invalid-feedback:has-text("Re-enter password required")');
        await expect(nameErrorElement.first()).toBeVisible();
        await expect(lastNameErrorElement.first()).toBeVisible();
        await expect(emailErrorElement.first()).toBeVisible();
        await expect(passwordErrorElement.first()).toBeVisible();
        await expect(rePasswordErrorElement.first()).toBeVisible();
    });
});
