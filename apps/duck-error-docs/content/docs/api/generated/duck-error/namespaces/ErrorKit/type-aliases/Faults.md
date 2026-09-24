# Type Alias: Faults\<R *extends* [`Registry`](Registry.md)\>

> **Faults**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: R[C] extends Fault ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:14](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L14)

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)
