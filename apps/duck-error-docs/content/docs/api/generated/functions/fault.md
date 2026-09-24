# Function: fault()

## Call Signature

> **fault**(`status`: `number`): [`Fault`](../duck-error/namespaces/Brand/type-aliases/Fault.md)

Defined in: [brand.ts:73](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/brand.ts#L73)

The same declaration as [detail](detail.md), for a code an adapter can answer with itself.

### Parameters

#### status

`number`

### Returns

[`Fault`](../duck-error/namespaces/Brand/type-aliases/Fault.md)

### Example

```ts
const REGISTRY = {
  INTERNAL: fault(500), // adapter-raisable, no meta
  STORAGE_FAILED: fault<{ cause?: string }>(500), // adapter-raisable, with meta
} as const satisfies Record<string, number>
```

## Call Signature

> **fault**\<`M` *extends* `object`\>(`status`: `number`): `number` & \{ `__carries`: `M`; \} & \{ `__fault`: `true`; \}

Defined in: [brand.ts:74](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/brand.ts#L74)

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

### Example

```ts
const REGISTRY = {
  INTERNAL: fault(500), // adapter-raisable, no meta
  STORAGE_FAILED: fault<{ cause?: string }>(500), // adapter-raisable, with meta
} as const satisfies Record<string, number>
```
