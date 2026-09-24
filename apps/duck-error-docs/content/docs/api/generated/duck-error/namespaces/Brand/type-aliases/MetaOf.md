# Type Alias: MetaOf\<S\>

> **MetaOf**\<`S`\> = `S` *extends* [`Carries`](Carries.md)\<infer M\> ? `M` : `Record`\<`never`, `never`\>

Defined in: [brand.ts:16](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/brand.ts#L16)

What a status says its code hands back. A plain status says nothing, which is a meta with no keys.

## Type Parameters

### S

`S`

The status to read the meta from.
