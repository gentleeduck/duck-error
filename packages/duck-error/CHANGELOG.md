# @gentleduck/error

## 1.1.0

### Minor Changes

- cd43985: Two additions:
  
  - `fail` and `throwError` accept an optional `cause` after meta, in a fixed tuple position that holds for every registry branch including bare codes (`fail(code, undefined, causeError)`). Backward compatible: every existing call already omits it.
  - A `@Throws` method decorator that classifies a driver refusal (SQLSTATE by default, via `POSTGRES_REFUSALS`) or a wrapped `cause` chain into one of a kit's own `Bare` codes, then rethrows it. Available both as `@gentleduck/error/throws` (its own build entry, so importing it never pulls in anything else) and re-exported from the package root. Requires `experimentalDecorators: true` in the consumer's own `tsconfig.json`.

## 1.0.0

### Major Changes

- 8347f3f: First stable release.
  
  `@gentleduck/error` is a zero-dependency, registry-driven error kit for TypeScript: one
  `createErrorKit(name, registry)` call gives you a branded error class, exhaustive code-level
  type narrowing, and secret-safe JSON serialization, with no framework or runtime tie-in.
  
  - `createErrorKit(name, registry)` — builds an isolated kit (`instanceof` never matches across
    two kits, even two copies of the same registry) exposing `ErrorClass`, `fail`, `throwError`,
    `asError`, `rethrowError`, `hasErrorCode`, and `metaOf`.
  - `detail<Meta>(status)` / `fault<Meta>(status)` — brand a registry entry's HTTP status as
    client-caused or server-caused, and drive `ErrorKit.Args<R, C>` so a code's metadata is
    required, optional, or absent at the call site, not just at runtime.
  - `scrubMeta` / `isSecretKey` — recursive, cycle- and depth-safe (`DEPTH_CAP = 8`) redaction of
    any key matching `secret|password|passphrase|plaintext|token|hash|salt|signature|credential|
    private|otp|recovery|apikey|api_key`, fails closed on depth overflow, applied automatically by
    every kit instance's `toJSON()`.
  - Dual ESM/CJS build, no dependencies, no `process`/DOM assumptions — usable from browser, edge,
    React Native, or any Node-compatible runtime.
  
  Ships with runnable, type-checked examples for NestJS, Express, Fastify, Hono, and Next.js, and
  a full docs set covering the branded-type system, secret redaction, testing patterns, and a
  per-framework integration guide for each of the five examples above.
