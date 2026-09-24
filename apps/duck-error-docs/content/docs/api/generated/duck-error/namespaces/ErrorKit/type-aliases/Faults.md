# Type Alias: Faults\<R *extends* [`Registry`](Registry.md)\>

> **Faults**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: R[C] extends Fault ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:14](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L14)

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)
