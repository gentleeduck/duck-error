# Type Alias: Fault

> **Fault** = `number` & \{ `__fault`: `true`; \}

Defined in: [brand.ts:31](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/brand.ts#L31)

A status whose code a store/adapter can answer with, rather than one only flow or validation logic raises.

## Type Declaration

### \_\_fault

> `readonly` **\_\_fault**: `true`

## Example

```ts
const REGISTRY = {
  RATE_LIMITED: detail<{ retryAfter: number }>(429), // flow-raised only
  STORAGE_FAILED: fault<{ cause?: string }>(500), // an adapter can raise this one itself
} as const satisfies Record<string, number>

type StoreRaisable = ErrorKit.Faults<typeof REGISTRY> // 'STORAGE_FAILED'
```
