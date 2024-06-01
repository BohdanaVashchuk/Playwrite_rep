import { expect } from '@playwright/test';

export default class BaseComponent {
  constructor(page) {
    this.page = page;
  }

  async fill(locator, value) {
    await this.page.fill(locator, value);
  }

  async click(locator) {
    await this.page.click(locator);
  }

  async expectVisible(locator) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async expectDisabled(locator) {
    await expect(this.page.locator(locator)).toBeDisabled();
  }
}
