const { test, expect } = require('@playwright/test');
const faker = require('faker');

function generateRandomEmail(prefix) {
    return `${prefix}_${faker.random.alphaNumeric(7)}@example.com`;
}



test.describe('Validation of Registration form', () => {
  
    test('Valid Registration', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Hillel Qauto/);
      const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
      await signUpButton.click();
      const registrationModal = page.locator('.modal-body');
      const nameInput = registrationModal.locator('#signupName');
      const lastNameInput = registrationModal.locator('#signupLastName');
      const emailInput = registrationModal.locator('#signupEmail');
      const passwordInput = registrationModal.locator('#signupPassword');
      const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
      const registrationModalFooter = page.locator('.modal-footer');
      const registerButton = registrationModalFooter.locator('.btn.btn-primary');
      await nameInput.fill("Bohdana");
      await lastNameInput.fill("Vashchuk");
      await emailInput.fill(generateRandomEmail('Dan'));
      await passwordInput.fill("DanaTest2!");
      await repeatPasswordInput.fill("DanaTest2!");
      await registerButton.click();
      const garageH1ToValidateLogIn = page.locator('h1:has-text("Garage")');
      await expect(garageH1ToValidateLogIn).toBeVisible();
    });

    test('Registration is not valid if any name field invalid', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const nameInput = registrationModal.locator('#signupName');
        const lastNameInput = registrationModal.locator('#signupLastName');
        const emailInput = registrationModal.locator('#signupEmail');
        const passwordInput = registrationModal.locator('#signupPassword');
        const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await nameInput.fill("123");
        await lastNameInput.fill("Vashchuk");
        await emailInput.fill(generateRandomEmail('Dan'));
        await passwordInput.fill("DanaTest2!");
        await repeatPasswordInput.fill("DanaTest2!");
        await expect(registerButton).toBeDisabled();
        
      });

      test('Registration is not valid - User exist', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const nameInput = registrationModal.locator('#signupName');
        const lastNameInput = registrationModal.locator('#signupLastName');
        const emailInput = registrationModal.locator('#signupEmail');
        const passwordInput = registrationModal.locator('#signupPassword');
        const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await nameInput.fill("Bswfedwef");
        await lastNameInput.fill("dwefdewf");
        await emailInput.fill("erwedwed@gmail.com");
        await passwordInput.fill("DanaTest2!");
        await repeatPasswordInput.fill("DanaTest2!");
        await registerButton.click();
        await expect(page.locator(".alert.alert-danger")).toHaveText("User already exists");
    
        
      });
  
    test('Validation of Empty fields', async ({ page }) => {
      await page.goto('/');
      await expect(page).toHaveTitle(/Hillel Qauto/);
      const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
      await signUpButton.click();
      const registrationModal = page.locator('.modal-body');
      const nameInput = registrationModal.locator('#signupName');
      const lastNameInput = registrationModal.locator('#signupLastName');
      const emailInput = registrationModal.locator('#signupEmail');
      const passwordInput = registrationModal.locator('#signupPassword');
      const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
      const registrationModalFooter = page.locator('.modal-footer');
      const registerButton = registrationModalFooter.locator('.btn.btn-primary');
      await nameInput.fill("");
      await lastNameInput.fill("");
      await emailInput.fill("");
      await passwordInput.fill("");
      await repeatPasswordInput.fill("");
      await page.evaluate(() => document.activeElement.blur());
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

    test('Validation of invalid data in name fields', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const nameInput = registrationModal.locator('#signupName');
        await nameInput.fill("2");
        await page.evaluate(() => document.activeElement.blur());
        await expect(registerButton).toBeDisabled();
        const nameErrorElement = page.locator('.invalid-feedback p:has-text("Name has to be from 2 to 20 characters long")');
        await expect(nameErrorElement).toBeVisible();
        const nameErrorElement1 = page.locator('.invalid-feedback p:has-text("Name required")');
        await expect(nameErrorElement1.first()).toBeHidden();
      });

      test('Validation of space ignore Name field', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const nameInput = registrationModal.locator('#signupName');
        const lastNameInput = registrationModal.locator('#signupLastName');
        const emailInput = registrationModal.locator('#signupEmail');
        const passwordInput = registrationModal.locator('#signupPassword');
        const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await nameInput.fill("Bohdana Boa ana");
        await lastNameInput.fill("Vashchuk");
        await emailInput.fill(generateRandomEmail('Dan'));
        await passwordInput.fill("DanaTest2!");
        await repeatPasswordInput.fill("DanaTest2!");
        await registerButton.click();
        const garageH1ToValidateLogIn = page.locator('h1:has-text("Garage")');
        await expect(garageH1ToValidateLogIn).toBeVisible();
      });

      test('Validation of space ignore Last name field', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const nameInput = registrationModal.locator('#signupName');
        const lastNameInput = registrationModal.locator('#signupLastName');
        const emailInput = registrationModal.locator('#signupEmail');
        const passwordInput = registrationModal.locator('#signupPassword');
        const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await nameInput.fill("Bohdana");
        await lastNameInput.fill("Vashc huk");
        await emailInput.fill(generateRandomEmail('Dan'));
        await passwordInput.fill("DanaTest2!");
        await repeatPasswordInput.fill("DanaTest2!");
        await registerButton.click();
        const garageH1ToValidateLogIn = page.locator('h1:has-text("Garage")');
        await expect(garageH1ToValidateLogIn).toBeVisible();
      });

      test('Validation of invalid data in last name fields', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const lastNameInput = registrationModal.locator('#signupLastName');
        await lastNameInput.fill("2");
        await page.evaluate(() => document.activeElement.blur());
        await expect(registerButton).toBeDisabled();
        const lastNameErrorElement = page.locator('.invalid-feedback p:has-text("Name has to be from 2 to 20 characters long")');
        await expect(lastNameErrorElement).toBeVisible();
        const nameErrorElement1 = page.locator('.invalid-feedback p:has-text("Name required")');
        await expect(nameErrorElement1.first()).toBeHidden();
      });


      test('Validation of invalid data in email fields', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const emailInput = registrationModal.locator('#signupEmail');
        await emailInput.fill("2");
        await page.evaluate(() => document.activeElement.blur());
        await expect(registerButton).toBeDisabled();
        const errorElement = page.locator('.invalid-feedback p:has-text("Email is incorrect")');
        await expect(errorElement).toBeVisible();
      });

      test('Validation of invalid data in password fields', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const passwordInput = registrationModal.locator('#signupPassword');
        await passwordInput.fill("2");
        await page.evaluate(() => document.activeElement.blur());
        await expect(registerButton).toBeDisabled();
        const errorElement = page.locator('.invalid-feedback p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")');
        await expect(errorElement).toBeVisible();
      });


      test('Validation of invalid data in re-password fields - Passwords do not match', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Hillel Qauto/);
        const signUpButton = page.locator('.hero-descriptor_btn.btn.btn-primary');
        const registrationModalFooter = page.locator('.modal-footer');
        const registerButton = registrationModalFooter.locator('.btn.btn-primary');
        await signUpButton.click();
        const registrationModal = page.locator('.modal-body');
        const passwordInput = registrationModal.locator('#signupPassword');
        await passwordInput.fill("DanaT124!");
        const repeatPasswordInput = registrationModal.locator('#signupRepeatPassword');
        await repeatPasswordInput.fill("DanaT124!1");
        await page.evaluate(() => document.activeElement.blur());
        await expect(registerButton).toBeDisabled();
        const errorElement = page.locator('.invalid-feedback p:has-text("Passwords do not match")');
        await expect(errorElement).toBeVisible();
      });
  
  });

