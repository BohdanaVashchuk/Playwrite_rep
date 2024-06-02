import { expect } from '@playwright/test';
import BaseComponent from './baseComponent';

export default class RegistrationModal extends BaseComponent {
  constructor(page) {
    super(page);
    this.modal = page.locator('.modal-body');
    this.nameInput = '#signupName';
    this.lastNameInput = '#signupLastName';
    this.emailInput = '#signupEmail';
    this.passwordInput = '#signupPassword';
    this.repeatPasswordInput = '#signupRepeatPassword';
    this.registerButton = '.modal-footer .btn.btn-primary';
  }

  async fillForm({ name, lastName, email, password, repeatPassword }) {
    await this.fill(this.nameInput, name);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.fill(this.repeatPasswordInput, repeatPassword);
  }

  async clickRegisterButton() {
    await this.click(this.registerButton);
  }

  async expectRegisterButtonDisabled() {
    await this.expectDisabled(this.registerButton);
  }

  async expectErrorMessage(message) {
    const errorElement = this.modal.locator(`.invalid-feedback p:has-text("${message}")`).first();
    await expect(errorElement).toBeVisible();
  }
}
