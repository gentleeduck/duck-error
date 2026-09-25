# @gentleduck/error

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
