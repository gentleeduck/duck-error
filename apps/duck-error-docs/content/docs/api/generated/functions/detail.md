# Function: detail()

> **detail**\<`M` *extends* `object` = `never`\>(`status`: `number`): [`Carries`](../duck-error/namespaces/Brand/type-aliases/Carries.md)\<`M`\>

Defined in: [brand.ts:23](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/brand.ts#L23)

M can't be inferred (no parameter uses it), so it defaults to never, not object — object would silently accept any meta shape.

## Type Parameters

### M

`M` *extends* `object` = `never`

The meta shape the code carries.

## Parameters

### status

`number`

## Returns

[`Carries`](../duck-error/namespaces/Brand/type-aliases/Carries.md)\<`M`\>
