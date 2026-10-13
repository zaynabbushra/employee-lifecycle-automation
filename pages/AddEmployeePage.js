
import { expect } from '@playwright/test';

export class AddEmployeePage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.middleName = page.getByPlaceholder('Middle Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.employeeId = page.locator('form').locator('input').filter({ visible: true }).nth(3);
    this.profilePicture = page.locator('input[type="file"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  async addEmployee(employee, picturePath) {
    await this.firstName.fill(employee.firstName);
    await this.middleName.fill(employee.middleName || '');
    await this.lastName.fill(employee.lastName);

    if (picturePath) {
      await this.profilePicture.setInputFiles(picturePath);
    }

    // Capture the Employee ID before saving.
    const employeeId = (await this.employeeId.inputValue()).trim();

    await this.saveButton.click();

    // Confirm that the employee profile opened.
    await expect(
      this.page.getByRole('heading', { name: 'Personal Details' })
    ).toBeVisible({ timeout: 15000 });

    return employeeId;
  }
}
