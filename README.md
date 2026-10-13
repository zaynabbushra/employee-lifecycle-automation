# Employee Lifecycle Automation

## Project Overview

This project automates the employee lifecycle in the OrangeHRM demo application using Playwright Test and JavaScript. It follows the Page Object Model (POM) design pattern and includes UI automation, API validation, and CI/CD integration.

## Tech Stack

- JavaScript
- Playwright Test
- Node.js and npm
- Page Object Model (POM)
- REST API validation
- GitHub Actions

## Automated Scenarios

1. Log in to OrangeHRM.
2. Add an employee using test data from a JSON file.
3. Upload an employee profile picture.
4. Search for the employee using the employee ID.
5. Update the employee's job title and employment status.
6. Validate employee details through the API.
7. Delete the employee and verify deletion through the UI and API.
8. Validate the logout and session behavior.

## Project Structure

```text
.
├── .github/workflows/       # GitHub Actions workflow
├── assets/                  # Test assets and profile picture
├── pages/                   # Page Object Model classes
├── test-data/               # Employee test data
├── tests/                   # Playwright test specifications
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Prerequisites

- Node.js and npm
- Git
- Access to the internet

## Installation

Clone the repository:

```bash
git clone https://github.com/zaynabbushra/employee-lifecycle-automation.git
cd employee-lifecycle-automation
```

Install dependencies:

```bash
npm ci
```

Install the Playwright browser:

```bash
npx playwright install chromium
```

## Run Tests

Run the Playwright test suite:

```bash
npx playwright test
```

Run tests with the browser visible:

```bash
npx playwright test --headed
```

View the HTML report:

```bash
npx playwright show-report
```

## Test Reporting

The Playwright configuration uses the HTML reporter, captures video, enables tracing, and captures screenshots on test failure. Generated reports and test results are excluded from Git using `.gitignore`.

## CI/CD

A GitHub Actions workflow is included under `.github/workflows/playwright.yml` to support automated test execution in GitHub Actions.

## Application Under Test

OrangeHRM Demo: https://opensource-demo.orangehrmlive.com/

Demo credentials used by the assessment:

- Username: `Admin`
- Password: `admin123`

The demo environment is shared and may change, so test results can vary.

## Notes

- Employee test data is maintained in `test-data/employee.json`.
- The tests create and delete employee records in the demo application.
- API validation depends on the availability and behavior of the public demo environment.
