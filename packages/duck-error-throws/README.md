<h1 align="center">@gentleduck/error-throws</h1>

<p align="center">
  A <code>@Throws</code> method decorator: classifies a driver refusal (SQLSTATE by default) and
  cause-chain into one of a <a href="../duck-error">@gentleduck/error</a> kit's own codes. Opt-in
  adapter, not part of core - core stays framework- and driver-agnostic.
</p>

<p align="center">
  <a href="./LICENSE">MIT</a> -
  <a href="./CHANGELOG.md">Changelog</a>
</p>

---

## Install

```bash
npm install @gentleduck/error-throws @gentleduck/error
# or
bun add @gentleduck/error-throws @gentleduck/error
```

Requires `experimentalDecorators: true` in your own `tsconfig.json` — `@Throws` uses the legacy
decorator signature `(target, key, descriptor)`, the same one NestJS and TypeORM build on, so it
composes with the app frameworks it's most likely to sit alongside.

## Quick start

```typescript
import { createErrorKit, detail } from '@gentleduck/error'
import { createThrows, POSTGRES_REFUSALS } from '@gentleduck/error-throws'

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

## Why `Throws`'s codes are `Bare`, not any code in the registry

The decorator only ever has a `cause` to offer a code it raises — never meta a caller supplied,
because there is no caller at the point a driver rejects a query. `USERS_ORG_NOT_FOUND` above
requires `{ orgId: string }`; nothing in this flow can produce that, so passing it to `Throws` or a
`Rules` entry is a compile error, not a code that would construct with an empty meta at runtime.
Give a `Throws`-reachable code a plain status or an optional-only `detail<M>()` instead.

## Rules

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

## Other drivers

`POSTGRES_REFUSALS` maps Postgres SQLSTATEs to the five refusal kinds. `createThrows`'s second
argument is just `Record<string, Refusal>` — pass your own table (MySQL/SQLite errno, a JS
driver's own code strings) to classify a different source the same way.

## License

[MIT](./LICENSE)
