# Type Alias: Faults\<R *extends* [`Registry`](Registry.md)\>

> **Faults**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: R[C] extends Fault ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:28](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L28)

Every code in the registry branded [fault](../../../../functions/fault.md) — the ones a store or adapter can raise itself, as opposed to only flow/validation logic.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

## Example

```ts
type StoreRaisable = ErrorKit.Faults<typeof REGISTRY> // 'STORAGE_FAILED' | 'INTERNAL'
```
