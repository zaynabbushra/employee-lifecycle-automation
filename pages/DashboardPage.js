import { expect } from '@playwright/test';

export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', {
      name: 'Dashboard',
    });
    this.pimMenu = page.getByRole('link', { name: 'PIM' });
  }

  async navigateToPIM() {
    await this.pimMenu.click();
    await expect(
      this.page.getByText('Employee Information')
    ).toBeVisible();
  }
}