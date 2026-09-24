# Type Alias: Bare\<R *extends* [`Registry`](Registry.md)\>

> **Bare**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: [HasRequired<Meta<R, C>>] extends [never] ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:17](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L17)

A code that needs nothing beyond itself.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)
