---
'@gentleduck/error': minor
---

Two additions:

- `fail` and `throwError` accept an optional `cause` after meta, in a fixed tuple position that holds for every registry branch including bare codes (`fail(code, undefined, causeError)`). Backward compatible: every existing call already omits it.
- A `@Throws` method decorator that classifies a driver refusal (SQLSTATE by default, via `POSTGRES_REFUSALS`) or a wrapped `cause` chain into one of a kit's own `Bare` codes, then rethrows it. Available both as `@gentleduck/error/throws` (its own build entry, so importing it never pulls in anything else) and re-exported from the package root. Requires `experimentalDecorators: true` in the consumer's own `tsconfig.json`.
