# Risk Coverage Mapping

## Purpose

The purpose of this document is to map product and framework risks to automated test coverage.

This helps show how the test suite supports risk-based Quality Engineering instead of only increasing the number of automated test cases.

The goal is to make test coverage easier to understand from a quality, release readiness, and risk management perspective.

## Risk Coverage Overview

| Risk                                                       | Covered by                                                                                | Test layer              | Coverage status |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------- | --------------- |
| User cannot log in with valid credentials                  | `tests/ui/login.spec.ts`                                                                  | UI                      | Covered         |
| User does not see an error for invalid credentials         | `tests/ui/login.spec.ts`                                                                  | UI                      | Covered         |
| Product cannot be added to cart                            | `tests/ui/cart.spec.ts`                                                                   | UI                      | Covered         |
| Cart badge does not update after adding product            | `tests/ui/cart.spec.ts`, `tests/ui/cart-fixture.spec.ts`, `tests/ui/cart-storage.spec.ts` | UI                      | Covered         |
| Added product is not visible in cart                       | `tests/ui/cart.spec.ts`                                                                   | UI                      | Covered         |
| Authenticated user flows are not reusable                  | `fixtures/authFixtures.ts`, `helpers/auth.ts`, `tests/auth/auth.setup.spec.ts`            | Framework/Auth          | Covered         |
| Storage State authentication does not work                 | `tests/auth/auth.setup.spec.ts`, `tests/ui/cart-storage.spec.ts`                          | Auth/UI                 | Covered         |
| API users endpoint returns invalid data                    | `tests/api/api.spec.ts`                                                                   | API                     | Covered         |
| API posts endpoint returns invalid data                    | `tests/api/api.spec.ts`, `schemas/postSchema.ts`                                          | API/Contract            | Covered         |
| API response has invalid contract                          | `tests/api/api.spec.ts`, `tests/api/mocking.spec.ts`, `schemas/postSchema.ts`             | Contract                | Covered         |
| API returns successful status with invalid business values | `tests/api/mocking.spec.ts`                                                               | API/Business validation | Covered         |
| Non-existing API resource does not return 404              | `tests/api/api.spec.ts`                                                                   | API/Negative            | Covered         |
| API server error handling is not validated                 | `tests/api/mocking.spec.ts`                                                               | API/Mocking/Negative    | Covered         |
| Delayed server error response is not validated             | `tests/api/mocking.spec.ts`                                                               | API/Mocking/Negative    | Covered         |
| CI does not catch formatting issues                        | `.github/workflows/playwright.yml`, `package.json`                                        | CI/CD                   | Covered         |
| CI does not catch linting issues                           | `.github/workflows/playwright.yml`, `package.json`, `eslint.config.mjs`                   | CI/CD                   | Covered         |
| CI does not run automated tests                            | `.github/workflows/playwright.yml`, `package.json`                                        | CI/CD                   | Covered         |
| Playwright report is not available for review              | `.github/workflows/playwright.yml`                                                        | Reporting               | Covered         |
| Local/generated files are committed accidentally           | `.gitignore`, `.prettierignore`                                                           | Repo hygiene            | Covered         |
| API environment configuration is duplicated or hardcoded   | `test-data/apiUrls.ts`                                                                    | Configuration           | Covered         |
| Test suite cannot be executed selectively                  | Test tags, `package.json` scripts                                                         | Test execution          | Covered         |
| Regression is only run manually                            | `.github/workflows/playwright.yml` scheduled trigger                                      | CI/CD                   | Covered         |

## Coverage by Test Layer

### UI Layer

The UI layer covers critical browser-based user flows:

- Login
- Invalid login
- Add to cart
- Cart badge update
- Cart item visibility
- Authenticated user flows

Primary files:

- `tests/ui/login.spec.ts`
- `tests/ui/cart.spec.ts`
- `tests/ui/cart-fixture.spec.ts`
- `tests/ui/cart-storage.spec.ts`

### API Layer

The API layer covers request-level behavior and CRUD-like operations.

Primary files:

- `tests/api/api.spec.ts`

Covered risks include:

- Unexpected status codes
- Invalid response data
- Missing or incorrect resource data
- Negative API responses

### Contract Validation Layer

The contract validation layer verifies response schemas using Zod.

Primary files:

- `schemas/postSchema.ts`
- `tests/api/api.spec.ts`
- `tests/api/mocking.spec.ts`

Covered risks include:

- Missing required fields
- Incorrect field types
- Invalid response shape

### Business Validation Layer

Business validation checks whether response values are meaningful, not only structurally valid.

Primary file:

- `tests/api/mocking.spec.ts`

Covered risks include:

- Empty but schema-valid values
- Technically valid responses with poor business value

### Mocking and Negative Testing Layer

Mocking allows controlled validation of API scenarios that may be difficult or unstable to reproduce with live APIs.

Primary file:

- `tests/api/mocking.spec.ts`

Covered risks include:

- Server errors
- Delayed responses
- Invalid data shapes
- Empty responses
- Business-invalid values

### Authentication Layer

Authentication coverage validates reusable authenticated test setup.

Primary files:

- `helpers/auth.ts`
- `fixtures/authFixtures.ts`
- `tests/auth/auth.setup.spec.ts`
- `tests/ui/cart-fixture.spec.ts`
- `tests/ui/cart-storage.spec.ts`

Covered risks include:

- Login setup duplication
- Storage State failure
- Authenticated tests depending on repeated UI login
- Fixture setup not working correctly

### CI/CD Layer

The CI/CD layer validates that quality checks are executed consistently.

Primary files:

- `.github/workflows/playwright.yml`
- `package.json`

Covered risks include:

- Formatting issues
- Linting issues
- Test failures
- Missing report artifacts
- Lack of scheduled regression execution

## Gaps and Intentional Limitations

The following risks are not currently covered.

| Risk                                | Status      | Reason                                                     |
| ----------------------------------- | ----------- | ---------------------------------------------------------- |
| Visual regressions                  | Not covered | Out of scope for current portfolio stage                   |
| Accessibility defects               | Not covered | Planned future improvement                                 |
| Performance degradation             | Not covered | Planned future improvement                                 |
| Security vulnerabilities            | Not covered | Out of scope for this Playwright portfolio                 |
| Cross-device mobile behavior        | Not covered | Out of scope for current scope                             |
| Full checkout completion            | Not covered | SauceDemo demo scope is limited                            |
| Real backend persistence validation | Not covered | JSONPlaceholder does not persist POST/PATCH/DELETE changes |
| Flaky test trend analysis           | Not covered | Planned future improvement                                 |
| Historical pass rate monitoring     | Not covered | Planned future improvement                                 |
| Production monitoring feedback loop | Not covered | Out of scope for this repository                           |

## Risk-Based Execution

The project supports selective execution using test tags and npm scripts.

Examples:

```bash
npm run test:smoke
```

```bash
npm run test:regression
```

```bash
npm run test:api
```

```bash
npm run test:ui
```

```bash
npm run test:contract
```

```bash
npm run test:mocking
```

This allows different levels of validation depending on the risk and context of the change.

## Release Readiness Usage

This risk coverage mapping can support release readiness decisions.

A change should be reviewed against:

- Which risk areas are affected
- Which automated tests cover those risks
- Whether relevant tests passed
- Whether any uncovered risks require manual review
- Whether known limitations affect the release decision

Passing all automated tests does not guarantee that there are no defects.

It means that the currently mapped automated quality risks did not reveal a blocking issue.

## Future Improvements

Planned improvements include:

- Expanding risk coverage for more SauceDemo user flows
- Adding accessibility checks
- Adding visual regression checks
- Adding flaky test tracking
- Adding historical pass rate tracking
- Adding coverage mapping by test tag
- Adding release risk scoring
- Adding links from each risk to specific test names
- Adding CI summary for risk-based quality signals
