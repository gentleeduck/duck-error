# Type Alias: HasRequired\<T\>

> **HasRequired**\<`T`\> = `{ [K in keyof T]-?: undefined extends T[K] ? never : K }`\[keyof `T`\]

Defined in: [kit.ts:19](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/kit.ts#L19)

True when T has at least one non-optional key.

## Type Parameters

### T

`T`
