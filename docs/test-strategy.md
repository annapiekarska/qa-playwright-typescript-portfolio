# Test Strategy

## Purpose

The purpose of this test strategy is to define how this project validates product quality through a layered Quality Engineering approach.

The project is not focused only on writing automated test cases. It demonstrates how UI tests, API tests, contract validation, mocking, authentication setup, CI/CD checks, and reporting can work together to support release confidence.

This strategy is designed for a portfolio project, but it reflects practices that can be applied in production-grade test automation frameworks.

## Scope

This strategy covers the testing approach for the `qa-playwright-typescript-portfolio` repository.

The project includes:

- UI testing for key SauceDemo user flows
- API testing for JSONPlaceholder endpoints
- Contract validation using Zod schemas
- Mocked API response scenarios
- Positive and negative test scenarios
- Authentication setup using helpers, fixtures, and Storage State
- CI/CD validation through GitHub Actions
- Code quality checks using ESLint and Prettier
- Playwright HTML reporting and CI artifacts

## Test Layers

The project uses multiple test layers instead of relying on a single type of automated test.

The main test layers are:

- Static quality checks
- UI end-to-end tests
- API tests
- Contract validation tests
- Mocking and negative scenario tests
- Authentication setup tests
- CI/CD quality gates

This layered approach helps validate different types of risk at the right level.

## UI Testing Strategy

UI tests focus on critical user flows in SauceDemo.

The UI layer validates that users can:

- Log in with valid credentials
- See an error when using invalid credentials
- Add a product to the cart
- See the cart badge update
- Open the cart
- Verify that an added product is visible in the cart

The UI tests use Page Object Model classes to keep selectors and page interactions separate from test scenarios.

This improves maintainability because changes to selectors or page structure can be handled inside page objects instead of being repeated across multiple tests.

## API Testing Strategy

API tests focus on validating JSONPlaceholder endpoints through request-level checks.

The API layer covers:

- GET collection resources
- GET single resources
- POST requests
- PATCH requests
- DELETE requests
- Positive scenarios
- Negative scenarios
- Response status validation
- Response body validation

The API tests are designed to confirm not only that endpoints respond, but also that responses contain expected data and structure.

## Contract Validation Strategy

Contract validation is implemented using Zod schemas.

The purpose of contract validation is to verify that API responses match the expected structure and data types.

The project validates:

- Individual post responses
- Collections of post responses
- Required fields
- Expected field types

This ensures that API responses are not treated as valid only because they return a successful HTTP status code.

A response can return `200 OK` and still be incorrect if the response body does not follow the expected contract.

## Business Validation Strategy

Business validation is treated separately from contract validation.

Contract validation checks whether the response has the correct structure.

Business validation checks whether the values are meaningful and acceptable from a product perspective.

For example, a response may have a valid schema but still contain empty values for important fields such as `title` or `body`.

The project includes mocked scenarios that demonstrate this difference.

## Mocking Strategy

Mocking is used to validate how the test framework handles controlled API responses without depending only on live API behavior.

The project includes mocked scenarios for:

- Empty API responses
- Server error responses
- Delayed server error responses
- Invalid response shapes
- Valid response shapes with invalid business values
- Valid mocked responses

This helps demonstrate negative testing, resilience testing, and contract validation under controlled conditions.

## Authentication Strategy

The project demonstrates three authentication approaches.

### Helper-based login

A reusable helper performs login through the UI.

This approach is useful when a test needs to use the real login flow.

### Fixture-based login

A custom Playwright fixture provides a logged-in page.

This reduces duplication and keeps tests shorter.

### Storage State authentication

A setup project logs in once and saves the authenticated browser state.

Authenticated tests can reuse this state instead of repeating login steps in every test.

This improves test speed and keeps authenticated test scenarios focused on the actual behavior being validated.

## Risk-Based Coverage

The current test coverage focuses on core product and framework risks.

Covered risks include:

- Users cannot log in successfully
- Invalid login does not show the correct error
- Products cannot be added to the cart
- Cart badge does not update correctly
- Added products are not visible in the cart
- API endpoints return unexpected status codes
- API responses have invalid contracts
- API responses have valid structure but invalid business values
- Mocked server errors are not handled as expected
- Authentication setup is not reusable across tests
- CI does not catch formatting, linting, or test failures

This risk-based approach keeps the test suite focused on meaningful quality signals instead of only increasing the number of test cases.

## Out of Scope

The following areas are currently out of scope for this project:

- Full regression coverage for all SauceDemo features
- Visual regression testing
- Accessibility testing
- Performance testing
- Cross-device mobile test coverage
- Security testing
- Real production API validation
- Persistent backend data validation
- Full user management flows
- Payment or checkout completion flows

These areas are intentionally out of scope to keep the portfolio focused on Quality Engineering foundations rather than broad product coverage.

## Execution Strategy

Tests can be executed locally and in CI.

Local execution is used for development feedback.

CI execution is used as a quality gate for push and pull request validation.

The CI pipeline validates:

- Dependency installation
- Code formatting
- Linting
- Playwright browser test execution
- API test execution
- Report generation

This ensures that every change is checked against both code quality and functional quality signals before it is considered ready.

## Quality Signals

The project uses several quality signals to assess whether a change is healthy.

Current quality signals include:

- Prettier format check passes
- ESLint passes
- Playwright tests pass
- API contract validation passes
- Negative scenarios behave as expected
- Mocked error scenarios behave as expected
- Authentication setup works correctly
- Playwright HTML report is generated
- CI workflow completes successfully

These signals help evaluate whether the project remains stable, maintainable, and release-ready.

## Future Improvements

Planned improvements include:

- Adding a dedicated quality gates document
- Adding a release readiness checklist
- Adding an architecture overview document
- Splitting smoke and regression execution
- Adding scheduled regression runs in GitHub Actions
- Expanding API schema coverage
- Adding risk-based test coverage mapping
- Adding clearer reporting and evidence guidelines
- Adding test tagging for smoke, regression, API, and UI suites
- Adding more explicit quality metrics for CI results
