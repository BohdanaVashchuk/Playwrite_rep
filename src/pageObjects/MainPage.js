import BasePage from './basePage';

export default class MainPage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpButton = ".hero-descriptor_btn.btn.btn-primary";
  }

  async clickSignUpButton() {
    await this.click(this.signUpButton);
  }
}
