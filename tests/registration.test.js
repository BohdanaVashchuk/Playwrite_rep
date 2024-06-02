require('dotenv').config();
import { test, expect } from '@playwright/test';
import MainPage from '../src/pageObjects/MainPage';
import RegistrationModal from '../src/pageObjects/RegistrationModal';

test.describe('Validation of Registration form', () => {

  test('Valid Registration', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton(); // Використовуємо метод clickSignUpButton
    await registrationModal.fillForm({
      name: "Bohdana",
      lastName: "Vashchuk",
      email: `test_${Math.random().toString(36).substring(2, 7)}@example.com`,
      password: "DanaTest2!",
      repeatPassword: "DanaTest2!"
    });
    await registrationModal.clickRegisterButton();
    await registrationModal.expectVisible('h1:has-text("Garage")');
  });

  test('Registration is not valid if any name field invalid', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fillForm({
      name: "123",
      lastName: "Vashchuk",
      email: `test_${Math.random().toString(36).substring(2, 7)}@example.com`,
      password: "DanaTest2!",
      repeatPassword: "DanaTest2!"
    });
    await registrationModal.expectRegisterButtonDisabled();
  });

  test('Registration is not valid - User exist', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fillForm({
      name: "Bswfedwef",
      lastName: "dwefdewf",
      email: "erwedwed@gmail.com",
      password: "DanaTest2!",
      repeatPassword: "DanaTest2!"
    });
    await registrationModal.clickRegisterButton();
    await registrationModal.expectVisible(".alert.alert-danger:has-text('User already exists')");
  });

  test('Validation of Empty fields', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fillForm({
      name: "",
      lastName: "",
      email: "",
      password: "",
      repeatPassword: ""
    });
    await page.evaluate(() => document.activeElement.blur());
    await registrationModal.expectRegisterButtonDisabled();
    await registrationModal.expectErrorMessage("Name required");
    await registrationModal.expectErrorMessage("Last name required");
    await registrationModal.expectErrorMessage("Email required");
    await registrationModal.expectErrorMessage("Password required");
    await registrationModal.expectErrorMessage("Re-enter password required");
  });

  test('Validation of invalid data in name fields', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fill(registrationModal.nameInput, "2");
    await page.evaluate(() => document.activeElement.blur());
    await registrationModal.expectRegisterButtonDisabled();
    await registrationModal.expectErrorMessage("Name has to be from 2 to 20 characters long");
  });

  test('Validation of space ignore Name field', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fillForm({
      name: "Bohdana Boa ana",
      lastName: "Vashchuk",
      email: `test_${Math.random().toString(36).substring(2, 7)}@example.com`,
      password: "DanaTest2!",
      repeatPassword: "DanaTest2!"
    });
    await registrationModal.clickRegisterButton();
    await registrationModal.expectVisible('h1:has-text("Garage")');
  });

  test('Validation of space ignore Last name field', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fillForm({
      name: "Bohdana",
      lastName: "Vashc huk",
      email: `test_${Math.random().toString(36).substring(2, 7)}@example.com`,
      password: "DanaTest2!",
      repeatPassword: "DanaTest2!"
    });
    await registrationModal.clickRegisterButton();
    await registrationModal.expectVisible('h1:has-text("Garage")');
  });

  test('Validation of invalid data in last name fields', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fill(registrationModal.lastNameInput, "2");
    await page.evaluate(() => document.activeElement.blur());
    await registrationModal.expectRegisterButtonDisabled();
    await registrationModal.expectErrorMessage("Name has to be from 2 to 20 characters long");
  });

  test('Validation of invalid data in email fields', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fill(registrationModal.emailInput, "2");
    await page.evaluate(() => document.activeElement.blur());
    await registrationModal.expectRegisterButtonDisabled();
    await registrationModal.expectErrorMessage("Email is incorrect");
  });

  test('Validation of invalid data in password fields', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fill(registrationModal.passwordInput, "2");
    await page.evaluate(() => document.activeElement.blur());
    await registrationModal.expectRegisterButtonDisabled();
    await registrationModal.expectErrorMessage("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter");
  });

  test('Validation of invalid data in re-password fields - Passwords do not match', async ({ page }) => {
    const mainPage = new MainPage(page);
    const registrationModal = new RegistrationModal(page);

    await mainPage.goto();
    await mainPage.expectTitle(/Hillel Qauto/);
    await mainPage.clickSignUpButton();
    await registrationModal.fill(registrationModal.passwordInput, "DanaT124!");
    await registrationModal.fill(registrationModal.repeatPasswordInput, "DanaTest2!");
    await registrationModal.expectRegisterButtonDisabled();
    await registrationModal.expectErrorMessage("Passwords do not match");
  });

});
