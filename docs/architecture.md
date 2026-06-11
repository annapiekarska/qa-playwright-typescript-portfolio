# Architecture Overview

## Purpose

The purpose of this document is to describe the architecture of the `qa-playwright-typescript-portfolio` repository.

The project is structured as a maintainable Playwright and TypeScript test framework, not as a collection of isolated test files.

The architecture separates:

- Test scenarios
- Page interactions
- Test data
- Authentication setup
- API contract schemas
- Reusable helpers
- Custom fixtures
- CI/CD configuration
- Documentation

This separation improves maintainability, readability, and scalability of the test suite.

## High-Level Architecture

The project follows a layered test framework structure.

```text
Test specs
↓
Fixtures and helpers
↓
Page Object Model
↓
Test data and configuration
↓
Application under test / API under test
```

This means test files focus on validating behavior, while implementation details such as selectors, login setup, API URLs, and test users are kept in dedicated layers.

## Repository Structure

```text
.github/workflows/   GitHub Actions workflow configuration
docs/                Quality Engineering documentation
fixtures/            Custom Playwright fixtures
helpers/             Reusable helper functions
pages/               Page Object Model classes
schemas/             Zod schemas for API contract validation
test-data/           Test data and environment-based API URL configuration
tests/api/           API tests and mocked API scenarios
tests/auth/          Authentication setup project
tests/ui/            UI end-to-end tests
```

## Configuration Layer

The configuration layer defines how the project is installed, executed, formatted, linted, and validated.

Relevant files:

```text
package.json
package-lock.json
playwright.config.ts
tsconfig.json
eslint.config.mjs
.prettierrc
.prettierignore
.gitignore
.github/workflows/playwright.yml
```

### Responsibilities

The configuration layer is responsible for:

- Defining npm scripts
- Configuring Playwright test execution
- Configuring browser projects
- Managing environment variables
- Enforcing TypeScript settings
- Enforcing linting rules
- Enforcing formatting rules
- Running CI/CD validation
- Uploading Playwright reports as CI artifacts

## Playwright Configuration

The Playwright configuration defines the main test execution behavior.

Key configuration decisions include:

- Tests are located in the `tests` directory
- Tests can run in parallel locally
- `test.only` is forbidden in CI
- Retries are enabled on CI
- CI uses a single worker for more stable execution
- HTML reports are generated
- Trace is collected on first retry
- The UI base URL is read from `BASE_URL`
- Authentication setup runs before browser projects
- Browser projects use saved Storage State

These settings support both local developer feedback and CI-based quality validation.

## Test Specification Layer

Test specs are stored under:

```text
tests/api/
tests/auth/
tests/ui/
```

The responsibility of test specs is to describe behavior and expected outcomes.

Test specs should avoid containing:

- Repeated selectors
- Hardcoded credentials
- Large setup logic
- Repeated API URL construction
- Complex reusable logic

Those responsibilities belong to other layers such as page objects, helpers, fixtures, schemas, and test data.

## Page Object Model Layer

Page Object Model classes are stored under:

```text
pages/
```

Current page objects include:

```text
CartPage.ts
LoginPage.ts
ProductsPage.ts
```

### Responsibilities

The Page Object Model layer is responsible for:

- Encapsulating page interactions
- Hiding selector details from tests
- Providing readable methods for user actions
- Reducing selector duplication
- Making UI tests easier to maintain

Example responsibilities:

- Opening the login page
- Logging in
- Adding a product to the cart
- Opening the cart
- Reading cart item information

## Helpers Layer

Reusable helper functions are stored under:

```text
helpers/
```

Current helper:

```text
auth.ts
```

### Responsibilities

Helpers are used for reusable workflows that do not belong directly inside a single test.

The current authentication helper logs in as a standard user by combining:

- The `LoginPage` page object
- Valid user test data

This keeps login setup reusable and prevents duplication across UI tests.

## Fixtures Layer

Custom fixtures are stored under:

```text
fixtures/
```

Current fixture file:

```text
authFixtures.ts
```

### Responsibilities

Fixtures provide reusable test setup.

The current custom fixture provides:

```text
loggedInPage
```

This allows tests to start from an authenticated state without repeating login steps inside each test.

Fixtures are useful when a setup pattern is reused across multiple tests and should remain visible at the test level.

## Authentication Architecture

The project demonstrates three authentication approaches.

### Helper-Based Authentication

Used when tests need to perform login through the UI flow.

This approach is useful for:

- Validating real login behavior
- Keeping login steps reusable
- Making login setup explicit

### Fixture-Based Authentication

Used when tests need a ready-to-use authenticated page.

This approach is useful for:

- Reducing repeated setup
- Keeping test scenarios shorter
- Reusing login setup across multiple tests

### Storage State Authentication

Used when tests should reuse an authenticated browser state.

The setup project creates the Storage State file:

```text
playwright/.auth/standard-user.json
```

Browser projects then reuse that state.

This approach is useful for:

- Faster authenticated tests
- Avoiding repeated login in every test
- Keeping tests focused on post-login behavior

The generated auth state is ignored by Git and should not be committed.

## Test Data Layer

Test data is stored under:

```text
test-data/
```

Current files include:

```text
apiUrls.ts
products.ts
users.ts
```

### Responsibilities

The test data layer is responsible for:

- Keeping test users outside test specs
- Keeping product identifiers outside test specs
- Keeping API URL construction outside test specs
- Supporting environment-based configuration

The API base URL is read from:

```text
API_BASE_URL
```

This allows the same tests to run against different environments without changing test code.

## Schema Validation Layer

API schemas are stored under:

```text
schemas/
```

Current schema file:

```text
postSchema.ts
```

### Responsibilities

The schema validation layer is responsible for:

- Defining expected API response contracts
- Validating response body structure
- Validating required fields
- Validating expected field types
- Separating contract validation from test scenario logic

Zod is used for runtime schema validation.

This helps ensure that API responses are not considered valid only because the HTTP status code is successful.

## API Testing Architecture

API tests are stored under:

```text
tests/api/
```

Current API test files include:

```text
api.spec.ts
mocking.spec.ts
```

### Responsibilities

The API testing layer validates:

- HTTP status codes
- Response body data
- CRUD-like operations
- Negative API scenarios
- Contract validation
- Mocked API behavior
- Error responses
- Invalid response shapes
- Business-invalid values

This layer provides fast feedback on API behavior without relying on full UI workflows.

## UI Testing Architecture

UI tests are stored under:

```text
tests/ui/
```

Current UI test files include:

```text
cart-fixture.spec.ts
cart-storage.spec.ts
cart.spec.ts
login.spec.ts
```

### Responsibilities

The UI testing layer validates key browser-based user flows.

Current flows include:

- Login with valid credentials
- Login with invalid credentials
- Adding a product to cart
- Verifying cart badge update
- Verifying product visibility in cart
- Authenticated user flows using fixture and Storage State approaches

UI tests use Page Object Model classes to keep test scenarios readable and maintainable.

## CI/CD Architecture

GitHub Actions workflow is stored under:

```text
.github/workflows/playwright.yml
```

The CI pipeline runs on:

- Push to main branches
- Pull requests to main branches

The pipeline validates:

1. Dependency installation
2. Code formatting
3. Linting
4. Playwright browser installation
5. Automated test execution
6. Playwright report upload

This pipeline acts as a basic quality gate for the repository.

## Reporting Architecture

The project uses Playwright HTML reports.

Reports are generated after test execution and uploaded as GitHub Actions artifacts.

The reporting layer supports:

- Test result review
- Failure analysis
- CI evidence
- Debugging support

Trace collection on first retry provides additional context for failed or flaky tests.

## Design Principles

The project follows these design principles:

### Separation of Concerns

Test specs should focus on behavior.

Selectors, test data, authentication setup, API schemas, and reusable workflows should live in dedicated layers.

### Maintainability

Changes to selectors, credentials, URLs, or schemas should require updates in as few places as possible.

### Readability

Tests should be easy to understand from a product behavior perspective.

### Environment Awareness

Environment-specific values should be configurable through environment variables.

### Evidence-Based Quality

CI should produce reports and artifacts that support test result review and failure investigation.

### Quality Gates

Automated checks should help prevent low-quality changes from being merged.

## Current Limitations

The current architecture does not yet include:

- Dedicated smoke and regression tagging
- Separate test execution profiles
- Visual regression testing
- Accessibility testing
- Performance testing
- Security testing
- Flaky test tracking
- Historical trend reporting
- Centralized test result dashboard
- Formal release approval workflow

These limitations are acceptable for the current portfolio stage and are planned as future improvements.

## Future Improvements

Planned architecture improvements include:

- Adding test tags for smoke, regression, UI, and API suites
- Adding separate npm scripts for UI and API test execution
- Adding a dedicated `quality:check` script
- Adding scheduled regression runs
- Expanding schema coverage
- Improving product test data structure
- Adding risk-based coverage mapping
- Adding CI summary output
- Adding reporting and evidence guidelines
- Adding a lightweight release governance layer
