# Function: fault()

## Call Signature

> **fault**(`status`: `number`): [`Fault`](../duck-error/namespaces/Brand/type-aliases/Fault.md)

Defined in: [brand.ts:31](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/brand.ts#L31)

The same declaration as [detail](detail.md), for a code an adapter can answer with itself.

### Parameters

#### status

`number`

### Returns

[`Fault`](../duck-error/namespaces/Brand/type-aliases/Fault.md)

## Call Signature

> **fault**\<`M` *extends* `object`\>(`status`: `number`): `number` & \{ `__carries`: `M`; \} & \{ `__fault`: `true`; \}

Defined in: [brand.ts:32](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/brand.ts#L32)

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
