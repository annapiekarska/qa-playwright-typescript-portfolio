# QA Playwright TypeScript Portfolio

A portfolio project showcasing modern Quality Engineering practices using Playwright, TypeScript, API testing, schema validation, mocking, and CI/CD automation.

## Project Overview

This repository demonstrates end-to-end and API test automation using industry-standard tools and practices. The project focuses on building a maintainable test framework rather than simply automating test cases.

Key areas covered:

- UI test automation with Playwright
- API testing (GET, POST, PATCH, DELETE)
- Contract validation using Zod schemas
- API mocking and negative testing
- Storage State authentication
- Page Object Model (POM)
- Test fixtures
- Environment variable management
- Continuous Integration with GitHub Actions
- Code quality checks with ESLint and Prettier

## Tech Stack

- Playwright
- TypeScript
- Zod
- ESLint
- Prettier
- GitHub Actions
- JSONPlaceholder API

## Test Coverage

### UI Testing

- Login scenarios
- Shopping cart functionality
- Authenticated user flows
- Storage State authentication

### API Testing

- CRUD operations
- Positive and negative scenarios
- Contract validation
- Business validation
- Mocked responses
- Error handling

## CI/CD

Tests are automatically executed through GitHub Actions on every push and pull request.

## Notes

This project uses JSONPlaceholder as a testing API.

JSONPlaceholder simulates create, update, and delete operations without persisting data changes. Because of this behavior, some API responses differ from what would be expected in a production environment.

Example:

- DELETE requests return success responses without permanently removing records.
- POST, PATCH, and DELETE operations are simulated and do not modify stored data.

## Purpose

The goal of this project is to demonstrate practical Quality Engineering skills, including test automation, contract testing, mocking, framework design, and maintainable test architecture.
