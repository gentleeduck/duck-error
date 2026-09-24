# Function: fault()

## Call Signature

> **fault**(`status`: `number`): [`Fault`](../duck-error/namespaces/Brand/type-aliases/Fault.md)

Defined in: [brand.ts:31](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/brand.ts#L31)

The same declaration as [detail](detail.md), for a code an adapter can answer with itself.

### Parameters

#### status

`number`

### Returns

[`Fault`](../duck-error/namespaces/Brand/type-aliases/Fault.md)

## Call Signature

> **fault**\<`M` *extends* `object`\>(`status`: `number`): `number` & \{ `__carries`: `M`; \} & \{ `__fault`: `true`; \}

Defined in: [brand.ts:32](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/brand.ts#L32)

The same declaration as [detail](detail.md), for a code an adapter can answer with itself.

### Type Parameters

#### M

`M` *extends* `object`

The meta shape the code carries, when given.

### Parameters

#### status

`number`

### Returns

`number` & \{ `__carries`: `M`; \} & \{ `__fault`: `true`; \}
