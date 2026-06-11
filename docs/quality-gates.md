# Quality Gates

## Purpose

The purpose of this document is to define the quality gates used in this project.

Quality gates are checkpoints that help decide whether a change is healthy enough to move forward.

In this portfolio project, quality gates are implemented through a combination of code quality checks, automated tests, CI/CD validation, and test reporting.

The goal is to show that quality is not only validated at the end of testing, but also built into the development workflow.

## Current Quality Gate

The current quality gate is executed through GitHub Actions on every push and pull request to the main branches.

A change is considered healthy when all required checks pass.

The current quality gate includes:

1. Dependency installation
2. Format validation
3. Lint validation
4. Playwright test execution
5. Report generation
6. Artifact upload

## Gate 1: Dependency Installation

The pipeline installs dependencies using:

```bash
npm ci
```

This ensures that dependencies are installed from `package-lock.json` and that CI uses a clean, reproducible dependency setup.

### Failure Meaning

If this gate fails, the project may have:

- Broken dependency resolution
- Invalid or outdated lockfile
- Missing packages
- Incompatible dependency versions

### Expected Action

The dependency issue should be fixed before any test result is trusted.

## Gate 2: Format Validation

The pipeline checks formatting using:

```bash
npm run format:check
```

This validates whether files follow the Prettier configuration used by the project.

### Failure Meaning

If this gate fails, the code does not follow the expected formatting standard.

### Expected Action

Run:

```bash
npm run format
```

Then review and commit the formatting changes.

## Gate 3: Lint Validation

The pipeline checks linting using:

```bash
npm run lint
```

This validates the code against ESLint and Playwright-specific linting rules.

### Failure Meaning

If this gate fails, the code may contain:

- TypeScript quality issues
- Test anti-patterns
- Playwright-specific issues
- Maintainability problems

### Expected Action

Fix the reported lint issues before merging the change.

If a rule needs to be disabled, the reason should be intentional and documented.

## Gate 4: Automated Test Execution

The pipeline runs Playwright tests using:

```bash
npx playwright test
```

This executes UI tests, API tests, authentication setup, mocking tests, and contract validation tests.

### Failure Meaning

If this gate fails, the change may have introduced:

- Broken UI behavior
- Broken API behavior
- Contract validation failure
- Mocking scenario failure
- Authentication setup failure
- Test instability
- Environment configuration issue

### Expected Action

Review the failing test, inspect the Playwright report, and determine whether the failure is caused by:

- Product behavior
- Test data
- Test implementation
- Environment issue
- External dependency issue

The change should not be considered ready until the failure is understood and resolved.

## Gate 5: Report Generation

The pipeline generates a Playwright HTML report after test execution.

The report provides evidence of test execution and supports failure analysis.

### Failure Meaning

If the report is missing, the team may lose important execution evidence.

### Expected Action

Check the workflow artifact configuration and confirm that the report path is correct.

## Gate 6: Artifact Upload

The pipeline uploads the Playwright HTML report as a GitHub Actions artifact.

This allows the report to be reviewed after CI execution.

### Failure Meaning

If artifact upload fails, test execution may still be valid, but failure evidence may not be available for review.

### Expected Action

Fix artifact configuration or retention settings.

## Pass Criteria

A change passes the current quality gate when:

- Dependencies install successfully
- Prettier format check passes
- ESLint passes
- Playwright tests pass
- The Playwright HTML report is generated
- The report artifact is uploaded in GitHub Actions
- No unresolved critical failures are present

## Fail Criteria

A change should be blocked when:

- Dependency installation fails
- Formatting check fails
- Linting fails
- Any Playwright test fails without a documented reason
- Authentication setup fails
- API contract validation fails
- Mocked error scenarios do not behave as expected
- The CI workflow fails
- Failure evidence is unavailable and the issue cannot be assessed

## Release Readiness Interpretation

Passing the quality gate does not guarantee that the product is fully release-ready.

It means that the current automated quality checks did not detect a blocking issue.

A release decision should also consider:

- Manual exploratory testing, if needed
- Known limitations
- Business risk
- Severity of open defects
- Scope of the change
- Test coverage relevance
- Stability of recent CI runs

## Current Limitations

The current quality gate is intentionally lightweight.

It does not yet include:

- Separate smoke and regression pipelines
- Scheduled regression runs
- Flaky test tracking
- Test pass rate thresholds
- Visual regression checks
- Accessibility checks
- Performance checks
- Security checks
- Release approval workflow

These areas are planned as future improvements.

## Future Improvements

Planned quality gate improvements include:

- Adding a dedicated `quality:check` npm script
- Splitting smoke and regression test execution
- Adding scheduled regression runs
- Adding test tags for UI, API, smoke, and regression suites
- Adding pass rate or stability thresholds
- Adding release readiness checklist
- Adding CI summary output
- Adding clearer failure triage guidelines
- Adding risk-based coverage mapping
