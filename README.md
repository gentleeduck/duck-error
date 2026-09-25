<p align="center">
  <img src="./public/logo-dark.svg" alt="@gentleduck/duck-error" width="120"/>
</p>

<h1 align="center">@gentleduck/duck-error</h1>

<p align="center">
  Typed, registry-driven error classes for TypeScript. Branded codes, secret-safe serialization, framework-agnostic, zero dependencies.
</p>

<p align="center">
  <a href="./LICENSE">MIT</a> -
  <a href="./CHANGELOG.md">Changelog</a> -
  <a href="./CONTRIBUTING.md">Contributing</a> -
  <a href="https://gentleduck.org/duck-error">Docs</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@gentleduck/duck-error"><img src="https://img.shields.io/npm/v/@gentleduck/duck-error.svg?label=duck-error" alt="duck-error"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/@gentleduck/duck-error.svg" alt="MIT"/></a>
</p>

---

## Install

```sh
bun add @gentleduck/duck-error
```

## Quick start

```ts
import { createErrorKit, fault, detail } from '@gentleduck/duck-error'

const REGISTRY = {
  NOT_FOUND: 404,
  RATE_LIMITED: detail<{ retryAfter: number }>(429),
  STORAGE_FAILED: fault<{ cause?: string }>(500),
} as const satisfies Record<string, number>

const kit = createErrorKit('AppError', REGISTRY)

export const AppError = kit.ErrorClass
export const throwAppError = kit.throwError

throw new AppError('RATE_LIMITED', { retryAfter: 60 })
// err.status === 429, err.code === 'RATE_LIMITED', err.toJSON() strips secrets automatically
```

## Workspace

| Path | Package | Role |
| --- | --- | --- |
| [`packages/duck-error`](packages/duck-error) | [`@gentleduck/duck-error`](https://www.npmjs.com/package/@gentleduck/duck-error) | Registry-driven error classes: branded codes, secret-safe `toJSON`, construct-or-throw kit |

## Apps

| Path | Role |
| --- | --- |
| [`apps/duck-error-docs`](apps/duck-error-docs) | Docs content, published at [gentleduck.org/duck-error](https://gentleduck.org/duck-error) |

## Examples

| Path | Stack |
| --- | --- |
| [`examples/express`](examples/express) | Express error-handling middleware built on `@gentleduck/duck-error` |
| [`examples/fastify`](examples/fastify) | Fastify `setErrorHandler` integration |
| [`examples/hono`](examples/hono) | Hono `onError` integration |
| [`examples/nestjs`](examples/nestjs) | NestJS `ExceptionFilter` integration |
| [`examples/nextjs`](examples/nextjs) | Next.js route handler + server action integration |

## Build

```sh
bun install
bunx turbo run build --filter='./packages/*'
bunx turbo run test --filter='./packages/*'
bunx turbo run check-types --filter='./packages/*'
```

## Docs

- Site: [gentleduck.org/duck-error](https://gentleduck.org/duck-error)
- Sibling repos: [`@gentleduck/iam`](https://github.com/gentleeduck/duck-iam), [`@gentleduck/ui`](https://github.com/gentleeduck/duck-ui), [`@gentleduck/upload`](https://github.com/gentleeduck/duck-upload), [`@gentleduck/md`](https://github.com/gentleeduck/duck-md)

## Contributing

PR checklist + style notes in [`CONTRIBUTING.md`](CONTRIBUTING.md).
Security: [`SECURITY.md`](SECURITY.md). Behaviour: [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## License

MIT. See [`LICENSE`](LICENSE).
