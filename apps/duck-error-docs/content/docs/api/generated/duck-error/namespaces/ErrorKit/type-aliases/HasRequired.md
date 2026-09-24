# Type Alias: HasRequired\<T\>

> **HasRequired**\<`T`\> = `{ [K in keyof T]-?: undefined extends T[K] ? never : K }`\[keyof `T`\]

Defined in: [kit.ts:12](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L12)

True when T has at least one non-optional key.

## Type Parameters

### T

`T`
