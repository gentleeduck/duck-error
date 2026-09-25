# Type Alias: Fault

> **Fault** = `number` & \{ `__fault`: `true`; \}

Defined in: [brand.ts:32](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/brand.ts#L32)

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
