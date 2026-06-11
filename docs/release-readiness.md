# Release Readiness

## Purpose

The purpose of this document is to define how release readiness is assessed in this project.

Release readiness is not based only on whether automated tests pass. It also considers quality signals, known risks, test coverage relevance, CI stability, and available failure evidence.

This document demonstrates how automated testing can support release decisions in a Quality Engineering process.

## Release Readiness Summary

A change can be considered release-ready when:

- Required CI checks pass
- Automated tests pass
- Code formatting passes
- Linting passes
- API contract validation passes
- Authentication setup works correctly
- Playwright report is available
- No unresolved critical failures are present
- Known limitations are understood
- The tested scope matches the change risk

## Required Quality Signals

The following quality signals should be reviewed before considering a change ready.

### CI Status

GitHub Actions should complete successfully.

The CI workflow validates:

- Dependency installation
- Prettier format check
- ESLint validation
- Playwright test execution
- Report generation
- Artifact upload

### Automated Test Results

All Playwright tests should pass.

This includes:

- UI tests
- API tests
- Mocking tests
- Authentication setup tests
- Contract validation tests

### Code Quality

Code quality checks should pass.

This includes:

- Prettier formatting
- ESLint rules
- Playwright-specific linting rules

### Test Report

The Playwright HTML report should be available as a GitHub Actions artifact.

The report should be reviewed if:

- Any test failed
- Any test was retried
- There is suspected flakiness
- The change affects critical flows

### Failure Evidence

If a test fails, the failure should be investigated using available evidence.

Evidence may include:

- Playwright HTML report
- Trace on first retry
- Error messages
- Screenshots, if available
- CI logs

A failure should not be ignored without understanding the root cause.

## Release Readiness Checklist

Before treating a change as ready, confirm the following:

- [ ] GitHub Actions completed successfully
- [ ] `npm run format:check` passed
- [ ] `npm run lint` passed
- [ ] Playwright tests passed
- [ ] API contract validation passed
- [ ] Authentication setup completed successfully
- [ ] Playwright report was generated
- [ ] Report artifact was uploaded
- [ ] No unresolved critical failures are present
- [ ] Known limitations are documented
- [ ] The test coverage is relevant to the changed area
- [ ] Any failed or flaky test was investigated
- [ ] No `test.only` was committed
- [ ] No local secrets or generated artifacts were committed

## Blocking Conditions

A change should not be considered release-ready if any of the following conditions are true:

- CI workflow fails
- Formatting check fails
- Linting fails
- Playwright tests fail without an accepted explanation
- Authentication setup fails
- API contract validation fails
- A critical user flow is broken
- Failure evidence is missing and the issue cannot be assessed
- Test results are unstable or inconsistent
- The change introduces an undocumented high-risk area
- Local secrets, auth state, or generated reports are committed

## Risk-Based Release Assessment

Release readiness should consider the risk of the change.

### Low-Risk Change

Examples:

- Documentation update
- README update
- Minor formatting change
- Test naming improvement

Expected validation:

- Format check
- Lint check
- CI workflow pass

### Medium-Risk Change

Examples:

- Test data update
- Page Object Model update
- API URL configuration change
- Fixture or helper update

Expected validation:

- Format check
- Lint check
- Relevant Playwright tests
- Full CI workflow pass
- Report review if failures occur

### High-Risk Change

Examples:

- Authentication setup change
- Playwright configuration change
- CI workflow change
- Test architecture refactor
- API contract schema change

Expected validation:

- Full CI workflow pass
- UI tests pass
- API tests pass
- Authentication setup passes
- Contract validation passes
- Report review
- Risk and impact assessment

## Interpretation of Passed Tests

Passing tests are a positive quality signal, but they do not guarantee that the product has no defects.

Passing tests mean that the current automated checks did not detect a blocking issue within the tested scope.

Release decisions should still consider:

- What changed
- Which risks are covered
- Which risks are not covered
- Whether manual exploratory testing is needed
- Whether there are known limitations
- Whether the test environment is stable

## Known Limitations

The current release readiness process does not yet include:

- Manual exploratory testing checklist
- Accessibility testing
- Visual regression testing
- Performance testing
- Security testing
- Flaky test tracking
- Historical pass rate analysis
- Formal release approval workflow
- Automated release notes
- Production monitoring feedback

These limitations are intentional for the current portfolio stage and will be addressed in future improvements.

## Current Release Decision Model

The current release decision model is:

```text
CI passed
+ Automated tests passed
+ Code quality checks passed
+ Report available
+ No unresolved critical failures
+ Known limitations understood
= Release candidate can be considered technically ready
```

This does not replace business approval or broader production readiness review.

It provides a structured technical quality signal for release decision-making.

## Future Improvements

Planned improvements include:

- Adding a formal release readiness score
- Adding smoke and regression test separation
- Adding scheduled regression runs
- Adding flaky test monitoring
- Adding pass rate thresholds
- Adding test coverage mapping by risk area
- Adding CI summary output
- Adding manual exploratory testing checklist
- Adding production monitoring feedback loop
