# Type Alias: Faults\<R *extends* [`Registry`](Registry.md)\>

> **Faults**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: R[C] extends Fault ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:28](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/kit.ts#L28)

Every code in the registry branded [fault](../../../../functions/fault.md) — the ones a store or adapter can raise itself, as opposed to only flow/validation logic.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

## Example

```ts
type StoreRaisable = ErrorKit.Faults<typeof REGISTRY> // 'STORAGE_FAILED' | 'INTERNAL'
```
