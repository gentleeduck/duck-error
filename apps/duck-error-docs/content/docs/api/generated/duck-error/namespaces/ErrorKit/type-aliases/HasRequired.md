# Type Alias: HasRequired\<T\>

> **HasRequired**\<`T`\> = `{ [K in keyof T]-?: undefined extends T[K] ? never : K }`\[keyof `T`\]

Defined in: [kit.ts:19](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L19)

True when T has at least one non-optional key.

## Type Parameters

### T

`T`
