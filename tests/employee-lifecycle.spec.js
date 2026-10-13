import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeePage } from '../pages/EmployeePage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import employee from '../test-data/employee.json';
import path from 'path';
import { UpdateEmployeePage } from '../pages/UpdateEmployeePage';

test('Add a new employee', async ({ page }) => {
  test.setTimeout(90000);
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const employeePage = new EmployeePage(page);
  const addEmployee = new AddEmployeePage(page);

  await page.goto('/');
  await login.login('Admin', 'admin123');
  await dashboard.navigateToPIM();
  await employeePage.openAddEmployee();

  const picturePath = path.resolve('assets/profile.jpg');
 const createdEmployeeId = await addEmployee.addEmployee(employee, picturePath);
 await employeePage.searchByEmployeeId(createdEmployeeId);

 const updateEmployee = new UpdateEmployeePage(page);

 await employeePage.openEmployeeForEditing(createdEmployeeId);
 
 await updateEmployee.updateJobAndStatus(
  'QA Engineer',
  'Full-Time Permanent'
);




  
  
  
  // Retry the API search in case the new employee is not visible yet.
  let matchingEmployee;

  for (let attempt = 1; attempt <= 5; attempt++) {
    let pageNumber = 1;

    while (!matchingEmployee && pageNumber <= 20) {
      const apiResponse = await page.request.get(
        `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=${(pageNumber - 1) * 50}`,
        { timeout: 15000 }
      );

      expect(apiResponse.status()).toBe(200);

      const apiBody = await apiResponse.json();

      matchingEmployee = apiBody.data.find(
        (item) => item.employeeId === createdEmployeeId
      );

      if (matchingEmployee || apiBody.data.length < 50) {
        break;
      }

      pageNumber++;
    }

    if (matchingEmployee) break;

    // Wait 2 seconds before retrying the API search.
    await page.waitForTimeout(2000);
  }

  // Verify the employee details returned by the API.
  expect(matchingEmployee).toBeTruthy();
  expect(matchingEmployee.firstName).toBe(employee.firstName);
  expect(matchingEmployee.lastName).toBe(employee.lastName);

  console.log('API validation passed:', createdEmployeeId);


  
  // Return to the employee list and delete the employee.
  await employeePage.searchByEmployeeId(createdEmployeeId);
  await employeePage.deleteEmployee(createdEmployeeId);

  // Verify the employee no longer appears in search results.

  await employeePage.verifyEmployeeDeleted(createdEmployeeId);

  
 
  // Verify the deleted employee is absent from all API pages.
  let deletedEmployee;
  let offset = 0;
  let totalEmployees = Infinity;

  while (offset < totalEmployees) {
    const finalResponse = await page.request.get(
      `https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=${offset}`
    );

    expect(finalResponse.status()).toBe(200);

    const finalBody = await finalResponse.json();

    deletedEmployee = finalBody.data.find(
      (item) => item.employeeId === createdEmployeeId
    );

    if (deletedEmployee) break;

    totalEmployees = finalBody.meta.total;
    offset += 50;
  }

  expect(deletedEmployee).toBeUndefined();

  console.log('API deletion validation passed:', createdEmployeeId);



  
  
  

  

  
 
  // Open the profile dropdown.
  await page.locator('.oxd-userdropdown-tab').click();

  // Click the exact Logout menu item using its HTML class.
  const logoutLink = page.locator(
    'a.oxd-userdropdown-link[href="/web/index.php/auth/logout"]'
  );

  await expect(logoutLink).toBeVisible({ timeout: 5000 });
  await logoutLink.click();

  // Confirm logout returned to the login page.
  await expect(
    page.getByRole('button', { name: /login|ingresar/i })
  ).toBeVisible({ timeout: 10000 });

  // Verify a protected page cannot be accessed after logout.
  await page.goto('/web/index.php/pim/viewEmployeeList');

  await expect(
    page.getByRole('button', { name: /login|ingresar/i })
  ).toBeVisible({ timeout: 10000 });









});