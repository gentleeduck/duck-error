<p align="center">
  <img src="./public/logo-dark.svg" alt="@gentleduck/error" width="120"/>
</p>

<h1 align="center">@gentleduck/error</h1>

<p align="center">
  Typed, registry-driven error classes: branded codes, secret-safe <code>toJSON</code>, and a
  construct-or-throw kit. Framework-agnostic, zero runtime dependencies, ESM + CJS.
</p>

<p align="center">
  <a href="./LICENSE">MIT</a> -
  <a href="./CHANGELOG.md">Changelog</a> -
  <a href="https://gentleduck.org/duck-error">Docs</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@gentleduck/error"><img src="https://img.shields.io/npm/v/@gentleduck/error.svg" alt="npm"/></a>
  <a href="https://www.npmjs.com/package/@gentleduck/error"><img src="https://img.shields.io/npm/dm/@gentleduck/error.svg" alt="downloads"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/npm/l/@gentleduck/error.svg" alt="MIT"/></a>
</p>

---

## Install

```bash
npm install @gentleduck/error
# or
bun add @gentleduck/error
```

## Quick start

```typescript
import { createErrorKit, detail, fault } from '@gentleduck/error'

// A registry: each code maps to a status. `detail<M>(status)` says the code also
// carries a `meta` of shape M; `fault(status)` marks a code a store/adapter can
// raise itself (vs. one only flow/validation logic raises). A plain `number` is
// a bare code with no required meta.
const USER_ERRORS = {
  USER_NOT_FOUND: detail<{ id: string }>(404),
  USER_EMAIL_TAKEN: detail<{ email: string }>(409),
  VALIDATION_FAILED: 400,
  STORE_UNAVAILABLE: fault(503),
}

const { fail, throwError, asError, hasErrorCode, metaOf } = createErrorKit('UserError', USER_ERRORS)

// Construct without throwing.
const err = fail('USER_NOT_FOUND', { id: 'u_123' })

// Throw directly. A code's declared shape is enforced at the call site: USER_NOT_FOUND's
// `id` can't be omitted, while a bare code like VALIDATION_FAILED takes no meta argument at all.
throwError('USER_EMAIL_TAKEN', { email: 'a@b.com' })

// Wrap an unknown catch value. Already-typed instances pass through unchanged;
// anything else is wrapped under the given code with the original on `.cause`.
try {
  await store.get(id)
} catch (e) {
  throw asError(e, 'STORE_UNAVAILABLE')
}

// Narrow by code rather than `instanceof` — this also matches an instance built
// by a duplicated copy of the package (hoisting, or a dependency installed
// separately from its consumer).
if (hasErrorCode(err, 'USER_NOT_FOUND')) {
  metaOf(err, 'USER_NOT_FOUND').id // typed as string
}
```

## What you get

- **`createErrorKit(name, registry)`** builds a fresh error class plus its helpers. Each call
  declares its own class, never a shared one, so two kits' instances never satisfy each other's
  `instanceof` — the same way two hand-written classes wouldn't.
- **`fail` / `throwError`** construct or throw a typed instance; **`asError` / `rethrowError`** wrap
  an `unknown` catch value, passing already-typed instances through unchanged.
- **`hasErrorCode`** narrows by a `code` property instead of `instanceof`, so it still recognizes an
  instance from a duplicated copy of the package.
- **`.toJSON()`** returns `{ ok: false, error: { code, status, ...meta } }` with every key matching
  `/secret|password|passphrase|plaintext|token|hash|salt|signature|credential|private|otp|recovery|apikey|api_key/i`
  dropped at any depth — safe to send straight over the wire. `isSecretKey` and `scrubMeta` are
  exported standalone if you need the same redaction elsewhere.
- **`.status`** and **`.statusCode`** (an alias, under the name Nest's base exception filter reads)
  come straight from the registry.
- **A bare code takes no meta shape at all** — `fail('SOME_BARE_CODE', { anything })` is a compile
  error rather than a silently-accepted value that never reaches `.meta`. Its meta slot only ever
  accepts `undefined`, which exists so the always-optional `cause` after it has a fixed position to
  live in: `fail('SOME_BARE_CODE', undefined, causeError)`.
- **A `detail(status)` that forgot its `<M>` fails the same way** — not `object`, nothing — so a
  registry entry declared without the type argument can't be given meta either, rather than
  silently accepting any shape at all.
- **`fail` / `throwError` take an optional `cause` after meta** — `fail('USER_NOT_FOUND', { id },
  driverError)` — set on the instance only when given, so an omitted cause never shows up as
  `'cause' in err`.

## `@Throws`: classify driver refusals

An opt-in method decorator that turns a rejected async method's driver error (or wrapped `cause`
chain) into one of this kit's own codes. Import it from the dedicated subpath so it's the only
thing to pull in if that's all you use, or straight from the package root — both resolve to the
same code:

```typescript
import { createThrows, POSTGRES_REFUSALS } from '@gentleduck/error/throws'
// or: import { createThrows, POSTGRES_REFUSALS } from '@gentleduck/error'
```

Requires `experimentalDecorators: true` in your own `tsconfig.json` — `@Throws` uses the legacy
decorator signature `(target, key, descriptor)`, the same one NestJS and TypeORM build on, so it
composes with the app frameworks it's most likely to sit alongside.

```typescript
import { createErrorKit, detail } from '@gentleduck/error'
import { createThrows, POSTGRES_REFUSALS } from '@gentleduck/error/throws'

const USERS_ERRORS = {
  USERS_QUERY_FAILED: 500,
  USERS_EMAIL_TAKEN: 409,
  USERS_NOT_FOUND: 404,
  USERS_ORG_NOT_FOUND: detail<{ orgId: string }>(404), // has required meta - see below
} as const satisfies Record<string, number>

const kit = createErrorKit('UsersError', USERS_ERRORS)

// Module-wide rules: every method below inherits this unless it declares its own for the same kind.
const { Throws } = createThrows(kit, POSTGRES_REFUSALS, { duplicate: 'USERS_EMAIL_TAKEN' })

class Users {
  @Throws('USERS_QUERY_FAILED', { missing: 'USERS_NOT_FOUND' })
  async create(email: string) {
    // Whatever this throws:
    //  - already one of this kit's errors, or any other kit's - passes through unchanged
    //  - a driver error whose SQLSTATE classifies as 'duplicate' or 'missing' - becomes
    //    USERS_EMAIL_TAKEN / USERS_NOT_FOUND, original error on `.cause`
    //  - anything else - becomes USERS_QUERY_FAILED, original error on `.cause`
  }
}
```

### Why `Throws`'s codes are `Bare`, not any code in the registry

The decorator only ever has a `cause` to offer a code it raises — never meta a caller supplied,
because there is no caller at the point a driver rejects a query. `USERS_ORG_NOT_FOUND` above
requires `{ orgId: string }`; nothing in this flow can produce that, so passing it to `Throws` or a
`Rules` entry is a compile error, not a code that would construct with an empty meta at runtime.
Give a `Throws`-reachable code a plain status or an optional-only `detail<M>()` instead.

### Rules

```typescript
type Rules<C> = {
  conflict?: C | Record<string, C>
  duplicate?: C | Record<string, C>
  invalid?: C | Record<string, C>
  missing?: C | Record<string, C>
  timeout?: C | Record<string, C>
  rename?: Record<string, C>
}
```

- Each of the five refusal kinds maps to one code, or to a table keyed by the driver's constraint
  name with `'*'` as the catchall — `{ duplicate: { users_email_key: 'USERS_EMAIL_TAKEN', '*':
  'USERS_QUERY_FAILED' } }`.
- `rename` matches a thrown error's bare `.message` — for a shared helper that throws a plain
  `Error` with a recognizable message instead of a driver error.
- Method rules passed to `Throws(code, rules)` override the module rules from `createThrows` per
  refusal kind; a kind neither declares falls through to the decorator's own `code`.
- Classification walks `.cause` chains, since an ORM commonly wraps the driver error in one that
  carries only the query, its params, and the original on `cause`.

### Other drivers

`POSTGRES_REFUSALS` maps Postgres SQLSTATEs to the five refusal kinds. `createThrows`'s second
argument is just `Record<string, Refusal>` — pass your own table (MySQL/SQLite errno, a JS
driver's own code strings) to classify a different source the same way.

## Design notes

- Zero runtime dependencies, `sideEffects: false`, built with `platform: 'neutral'` — nothing here
  assumes Node, a browser, or any other host.
- Ships both ESM and CommonJS (`exports` map with `import`/`require` conditions, each carrying its
  own `.d.ts`/`.d.cts`), verified against node10, node16, and bundler module resolution.
- Brand types (`Carries`, `Fault`) are plain, string-keyed property brands rather than
  `unique symbol` — safe to reference from a consuming package's own declaration output.
- `./throws` is its own `tsdown` entry, not just a re-exported name — importing only the subpath
  never pulls in anything a bundler wouldn't already tree-shake from the package root.

## License

[MIT](./LICENSE)
