# Contributing to duck-error

First off, thank you for considering contributing to **duck-error**!
We welcome all kinds of contributions - from bug reports and documentation improvements to feature requests and new framework examples.

This document provides guidelines to help you get started.

---

## Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](./CODE_OF_CONDUCT.md).
Please treat everyone with respect and kindness.

---

## Getting Started

### 1. Fork & Clone

```bash
git clone https://github.com/gentleeduck/duck-error.git
cd duck-error
```

### 2. Install Dependencies

We use **Bun** with workspaces:

```bash
bun install
```

### 3. Build All Packages

```bash
bun run build
```

### 4. Run in Development

```bash
bun run dev
```

---

## Working with Packages

* Core package code lives under `packages/duck-errors`.
* Framework integration examples live under `examples/`.
* Use [Turborepo](https://turbo.build/) commands to build, test, and lint efficiently.

---

## Development Workflow

1. **Branching**

   * Create a new branch from `main`.
   * Use a descriptive name, e.g. `fix/scrub-depth-cap`, `feat/nestjs-example`, `docs/readme-update`.

   ```bash
   git checkout -b feat/new-example
   ```

2. **Coding Standards**

   * Use **TypeScript**.
   * Follow existing **Biome** rules.
   * Write clear, self-documenting code.
   * `packages/duck-errors` stays zero-runtime-dependency - don't add one to make a change easier.

3. **Commit Messages**
   Follow [Conventional Commits](https://www.conventionalcommits.org/):
   Also make sure that you pass the `Husky` checks.

   ```
   feat: add NestJS exception filter example
   fix: cap redaction depth correctly
   docs: update contributing guide
   ```

4. **Testing**

   * Write unit tests for new functionality.
   * Run all tests before pushing:

     ```bash
     bun run test
     ```

---

## Submitting a Pull Request

1. Push your branch:

   ```bash
   git push origin feat/new-example
   ```

2. Open a Pull Request (PR) against the `main` branch.

3. Fill out the PR template with:

   * A clear description of your changes
   * Any related issues (`Closes #123`)
   * Code samples where relevant

---

## Reporting Issues

If you find a bug, please [open an issue](https://github.com/gentleeduck/duck-error/issues) with:

* Steps to reproduce
* Expected behavior
* Actual behavior

---

## Ways to Contribute

* **Code**: Bug fixes, features, optimizations
* **Docs**: Tutorials, guides, API references
* **Examples**: New framework integrations
* **Community**: Helping others in discussions, writing blog posts, or sharing duck-error

---

## Tips

* Start small - even fixing a typo helps!
* Look at the ["good first issue"](https://github.com/gentleeduck/duck-error/labels/good%20first%20issue) label for beginner-friendly contributions.
* Ask questions! We're happy to guide you.

---

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](./LICENSE).
