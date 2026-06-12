# QA Playwright TypeScript Portfolio

A portfolio project showcasing modern Quality Engineering practices using Playwright, TypeScript, API testing, schema validation, mocking, CI/CD automation, and maintainable test architecture.

## Project Overview

This project demonstrates a layered Quality Engineering approach, combining UI automation, API validation, contract testing, mocking, CI/CD checks, and maintainable test architecture.

The goal is not only to automate test cases, but to show how a test framework can support product quality, release confidence, and engineering standards.

Key areas covered:

- UI test automation with Playwright
- API testing for CRUD operations
- Contract validation using Zod schemas
- API mocking and negative testing
- Storage State authentication
- Page Object Model
- Test fixtures
- Test data management
- Environment-based configuration
- Continuous Integration with GitHub Actions
- Code quality checks with ESLint and Prettier
- Playwright HTML reporting

## Quality Engineering Approach

This repository is structured around a layered quality strategy.

The project validates quality at multiple levels:

- Static checks through ESLint and Prettier
- UI behavior through Playwright browser tests
- API behavior through request-level tests
- API contract validation through Zod schemas
- Negative scenarios through invalid login, 404 responses, mocked server errors, and invalid response shapes
- Authentication coverage through helper-based login, fixture-based login, and Storage State authentication
- CI/CD validation through GitHub Actions on push and pull request events
- Failure evidence through Playwright HTML reports uploaded as CI artifacts

This approach reflects how quality can be built into the development workflow rather than treated as a final manual check before release.

## Tech Stack

- Playwright
- TypeScript
- Zod
- ESLint
- Prettier
- GitHub Actions
- JSONPlaceholder API
- SauceDemo

## Quality Engineering Documentation

This repository includes dedicated Quality Engineering documentation:

- [Test Strategy](docs/test-strategy.md) — describes the testing approach, test layers, risk-based coverage, scope, and quality signals.
- [Quality Gates](docs/quality-gates.md) — defines the checks that must pass before a change is considered healthy.
- [Release Readiness](docs/release-readiness.md) — explains how automated quality signals support release decisions.
- [Architecture Overview](docs/architecture.md) — describes the structure of the Playwright TypeScript test framework.

## Test Architecture

The repository is organized into separate layers to keep the test framework maintainable and easy to extend.

```text
.github/workflows/   GitHub Actions CI configuration
fixtures/            Custom Playwright fixtures
helpers/             Reusable helper functions
pages/               Page Object Model classes
schemas/             Zod schemas for API contract validation
test-data/           Test users, products, and API URL configuration
tests/api/           API and mocking tests
tests/auth/          Authentication setup tests
tests/ui/            UI end-to-end tests
```

This structure separates test logic from selectors, test data, authentication setup, and validation schemas.

## Test Coverage

### UI Testing

The UI layer covers key user flows in SauceDemo:

- Successful login
- Failed login with invalid password
- Adding products to cart
- Verifying cart badge updates
- Verifying added product visibility in cart
- Authenticated user flows
- Storage State authentication

### API Testing

The API layer covers JSONPlaceholder endpoints:

- GET collection resources
- GET single resources
- POST requests
- PATCH requests
- DELETE requests
- Positive API scenarios
- Negative API scenarios
- Response status validation
- Contract validation
- Business validation

Covered operations include:

- `GET /users`
- `GET /users/1`
- `GET /posts`
- `GET /posts/1`
- `GET /posts/999999`
- `POST /posts`
- `PATCH /posts/1`
- `DELETE /posts/1`

## Contract Validation

Zod is used to validate API response contracts.

The API tests do not only check whether an endpoint returns a successful status code. They also validate whether the response body follows the expected structure.

Example validation areas:

- Required fields exist
- Field types are correct
- Post collections match the expected schema
- Individual post responses match the expected schema

This helps separate basic API availability from contract correctness.

## Business Validation

The project also demonstrates the difference between contract validation and business validation.

A response may have a technically valid schema but still contain business-invalid data, such as an empty title or empty body.

The mocking tests include scenarios where:

- The response shape is invalid
- The response shape is valid but values are not meaningful
- The response is valid and business-acceptable

This distinction is important in Quality Engineering because schema correctness alone does not always mean the product behavior is acceptable.

## API Mocking and Negative Testing

The project includes API mocking scenarios using Playwright route interception.

Mocked scenarios include:

- Empty API response
- Server error response
- Delayed server error response
- Invalid response shape
- Valid response shape with invalid business values
- Valid mocked response

These tests show how the framework can validate application behavior and data handling without depending only on live API responses.

## Authentication Strategy

The project demonstrates multiple authentication strategies.

### Helper-based login

A reusable helper logs in as a standard user through the UI.

This approach is useful when the test needs to validate or reuse the real login flow.

### Fixture-based login

A custom Playwright fixture provides a ready-to-use logged-in page.

This keeps tests shorter and avoids repeating login setup in each test.

### Storage State authentication

A setup project authenticates once and saves the browser storage state.

Authenticated tests can then reuse the saved state instead of logging in repeatedly.

This approach improves test execution speed and supports cleaner authenticated user flow tests.

## CI/CD Quality Gates

GitHub Actions runs the validation pipeline on push and pull request events.

The CI pipeline includes:

1. Checking out the repository
2. Installing dependencies with `npm ci`
3. Running Prettier format check
4. Running ESLint
5. Installing Playwright browsers
6. Running Playwright tests
7. Uploading the Playwright HTML report as an artifact

The CI pipeline acts as a basic quality gate.

A change should not be considered ready if:

- Formatting checks fail
- Linting fails
- Playwright tests fail
- The test report shows unresolved failures

## Reporting and Failure Evidence

Playwright HTML reports are generated after test execution.

In GitHub Actions, the report is uploaded as a workflow artifact and retained for review.

The project also uses Playwright trace collection on first retry, which helps investigate failures by providing execution context for failed or flaky scenarios.

This supports faster debugging and better failure analysis.

## Environment Configuration

The project uses environment-based configuration for test execution.

The UI base URL is configured through:

```text
BASE_URL
```

The API base URL is configured through:

```text
API_BASE_URL
```

In CI, these values are provided in the GitHub Actions workflow.

For local execution, they can be provided through a local `.env` file.

Example:

```text
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://jsonplaceholder.typicode.com
```

The `.env` file is ignored by Git and should not be committed.

## Running Tests Locally

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Run all tests:

```bash
npm test
```

Run UI tests:

```bash
npm run test:ui
```

Run API tests:

```bash
npm run test:api
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

Run contract validation tests:

```bash
npm run test:contract
```

Run mocking tests:

```bash
npm run test:mocking
```

Run the full quality check:

```bash
npm run quality:check
```

Run format check:

```bash
npm run format:check
```

Run lint:

```bash
npm run lint
```

Run formatter:

```bash
npm run format
```

Run lint auto-fix:

```bash
npm run lint:fix
```

## CI/CD

Tests and quality checks are automatically executed through GitHub Actions.

The workflow runs on:

- Push to the main branches
- Pull requests to the main branches
- Scheduled weekly regression runs
- Manual workflow dispatch

The CI pipeline runs the project quality gate through:

```bash
npm run quality:check
```

The workflow validates:

- Code formatting
- Linting rules
- Browser test execution
- API test execution
- Contract validation
- Mocking scenarios
- Report generation
- Artifact upload

## Notes About Test Applications

This project uses SauceDemo for UI testing and JSONPlaceholder for API testing.

### SauceDemo

SauceDemo is a public demo application commonly used for UI automation practice.

The test credentials used in this project are public demo credentials provided by SauceDemo.

In a production-grade project, secrets and credentials should be managed through environment variables or CI secrets.

### JSONPlaceholder

JSONPlaceholder simulates create, update, and delete operations without persisting data changes.

Because of this behavior, some API responses differ from what would be expected in a production environment.

Examples:

- DELETE requests return success responses without permanently removing records.
- POST, PATCH, and DELETE operations are simulated and do not modify stored data.

These limitations are documented because they affect how API test assertions should be interpreted.

## Current Quality Gates

The current quality gate requires:

- Prettier format check to pass
- ESLint to pass
- Playwright tests to pass
- GitHub Actions workflow to complete successfully
- Playwright report to be available for review

## Future Improvements

Planned improvements include:

- Adding a dedicated test strategy document
- Adding a quality gates document
- Adding a release readiness checklist
- Adding an architecture overview document
- Splitting smoke and regression test execution
- Adding scheduled regression runs in GitHub Actions
- Expanding API schema coverage
- Improving risk-based test coverage documentation
- Adding clearer reporting and evidence guidelines

## Purpose

The purpose of this project is to demonstrate practical Quality Engineering skills, including:

- Test automation
- API testing
- Contract validation
- Mocking
- Negative testing
- Framework design
- Maintainable test architecture
- CI/CD quality gates
- Reporting and failure evidence

The project is designed as a portfolio example of how automated testing can support broader Quality Engineering practices.
