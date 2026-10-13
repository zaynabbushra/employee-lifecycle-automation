
import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', {
      name: /username|nombre de usuario/i,
    });
    this.passwordInput = page.getByRole('textbox', {
      name: /password|contraseña/i,
    });
    this.loginButton = page.getByRole('button', {
      name: /login|ingresar/i,
    });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Dashboard may appear in English or Spanish.
    await expect(
      this.page.getByRole('heading', {
        name: /dashboard|tablero/i,
      })
    ).toBeVisible();
  }
}
