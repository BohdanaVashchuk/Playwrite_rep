import { expect } from '@playwright/test';
import BaseComponent from './baseComponent';

export default class BasePage extends BaseComponent {
  constructor(page) {
    super(page);
  }

  async goto(url = '/') {
    await this.page.goto(url);
  }

  async expectTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }
}
