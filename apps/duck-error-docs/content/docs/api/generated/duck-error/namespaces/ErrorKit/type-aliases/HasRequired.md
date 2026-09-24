# Type Alias: HasRequired\<T\>

> **HasRequired**\<`T`\> = `{ [K in keyof T]-?: undefined extends T[K] ? never : K }`\[keyof `T`\]

Defined in: [kit.ts:12](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L12)

True when T has at least one non-optional key.

## Type Parameters

### T

`T`
