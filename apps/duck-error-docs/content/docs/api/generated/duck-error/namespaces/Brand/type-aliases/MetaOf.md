# Type Alias: MetaOf\<S\>

> **MetaOf**\<`S`\> = `S` *extends* [`Carries`](Carries.md)\<infer M\> ? `M` : `Record`\<`never`, `never`\>

Defined in: [brand.ts:16](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/brand.ts#L16)

What a status says its code hands back. A plain status says nothing, which is a meta with no keys.

## Type Parameters

### S

`S`

The status to read the meta from.
