
import { expect } from '@playwright/test';

export class UpdateEmployeePage {
  constructor(page) {
    this.page = page;
  }

  async updateJobAndStatus(jobTitle, employmentStatus) {
    // Open the employee's Job section.
    await this.page.getByText('Job', { exact: true }).click();

    await expect(
      this.page.getByText('Job Details', { exact: true })
    ).toBeVisible();

    // Find the dropdown associated with its label.
    const jobTitleField = this.page
      .locator('.oxd-input-group')
      .filter({ has: this.page.getByText('Job Title', { exact: true }) });

    await jobTitleField.locator('.oxd-select-wrapper').click();
    await this.page.getByRole('option', { name: jobTitle }).click();

    const employmentStatusField = this.page
      .locator('.oxd-input-group')
      .filter({
        has: this.page.getByText('Employment Status', { exact: true }),
      });

    await employmentStatusField.locator('.oxd-select-wrapper').click();
    await this.page.getByRole('option', {
      name: employmentStatus,
    }).click();

    // Save the Job Details form.
    await this.page.getByRole('button', { name: 'Save' }).first().click();

    await expect(
      this.page.getByText('Successfully Updated', { exact: false })
    ).toBeVisible({ timeout: 10000 });

    // Verify the saved Job Title.
await expect(
  this.page.locator('.oxd-input-group')
    .filter({ has: this.page.getByText('Job Title', { exact: true }) })
    .locator('.oxd-select-text-input')
).toHaveText(jobTitle);

// Verify the saved Employment Status.
await expect(
  this.page.locator('.oxd-input-group')
    .filter({ has: this.page.getByText('Employment Status', { exact: true }) })
    .locator('.oxd-select-text-input')
).toHaveText(employmentStatus);


  }
}
