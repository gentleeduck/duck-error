# Type Alias: Bare\<R *extends* [`Registry`](Registry.md)\>

> **Bare**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: [HasRequired<Meta<R, C>>] extends [never] ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:17](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L17)

A code that needs nothing beyond itself.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)
