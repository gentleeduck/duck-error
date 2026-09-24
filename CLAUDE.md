# CLAUDE.md

## Monorepo Structure

- `packages/duck-errors` - Core `@gentleduck/errors` package
- `apps/duck-error-docs` - Docs content (MDX), consumed by the shared gentleduck.org docs site
- `examples/` - Framework integration examples (NestJS, Express, Fastify, Hono, Next.js)
- `tooling/` - Shared tooling configs

## Build Commands

This project uses **bun** as the package manager and **turbo** for task orchestration.

```sh
bun install          # Install dependencies
bun run dev          # Start dev servers (turbo)
bun run build        # Build all packages (turbo)
bun run test         # Run tests (turbo)
bun run check        # Biome check
bun run lint         # Biome lint
bun run format       # Biome format (write)
bun run fix          # Biome check + auto-fix
bun run check-types  # TypeScript type checking (turbo)
```

## Coding Conventions

- **Formatting/Linting**: Biome is used for formatting and linting (not ESLint/Prettier). Run `bun run fix` to auto-fix.
- **TypeScript**: Strict TypeScript throughout. Use explicit types for function signatures and exports.
- **Imports**: Use package names (`@gentleduck/...`) for cross-package imports.
- **Dependencies**: `packages/duck-errors` stays zero-runtime-dependency. Anything framework-specific belongs in `examples/`, never as a dependency of the core package.
- **Commits**: Use conventional commits (`feat:`, `fix:`, `chore:`, etc.).
