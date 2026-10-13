
import { expect } from '@playwright/test';

export class EmployeePage {
  constructor(page) {
    this.page = page;
    this.addEmployeeButton = page.getByRole('link', {
      name: 'Add Employee',
    });
  }

  async openAddEmployee() {
    await this.addEmployeeButton.click();

    await expect(
      this.page.getByRole('heading', { name: 'Add Employee' })
    ).toBeVisible();
  }

  

async searchByEmployeeId(employeeId) {
  await this.page.getByRole('link', { name: 'PIM' }).click();

  await expect(
    this.page.getByText('Employee Information')
  ).toBeVisible();

  // Search form fields: Employee Name, Employee Id, Employment Status...
  const searchFields = this.page.locator('form input');
  const employeeIdField = searchFields.nth(1);

  await employeeIdField.fill(employeeId);
  await this.page.getByRole('button', {name: /search|buscar/i,}).click();

  await expect(
    this.page.getByRole('table').getByText(employeeId, { exact: true })
  ).toBeVisible({ timeout: 15000 });
}



async verifyEmployeeDeleted(employeeId) {
  // Find the Employee ID search field.
  const searchFields = this.page.locator('form input');
  await searchFields.nth(1).fill(employeeId);

  // Search for the deleted employee.
  await this.page.getByRole('button', {
    name: /search|buscar/i,
  }).click();

  // Verify that the employee is no longer listed.
  await expect(
    this.page.getByRole('table').getByText(employeeId, { exact: true })
  ).toHaveCount(0, { timeout: 10000 });
}




async openEmployeeForEditing(employeeId) {
  const employeeRow = this.page
    .getByRole('row')
    .filter({ hasText: employeeId });

  await expect(employeeRow).toBeVisible();

  await employeeRow
    .locator('button')
    .filter({ has: this.page.locator('.bi-pencil-fill') })
    .click();
}



async deleteEmployee(employeeId) {
  // Find the employee's row.
  const employeeRow = this.page
    .getByRole('row')
    .filter({ hasText: employeeId });

  await expect(employeeRow).toBeVisible();

  // Click the Delete button in that row.
  await employeeRow
    .locator('button')
    .filter({ has: this.page.locator('.bi-trash') })
    .click();

  // Confirm deletion in the popup.
  await this.page
    .getByRole('button', { name: 'Yes, Delete' })
    .click();

  // Verify the success notification.
  await expect(
    this.page.getByText('Successfully Deleted', { exact: false })
  ).toBeVisible({ timeout: 10000 });
}



}
