# Type Alias: Carries\<M *extends* `object`\>

> **Carries**\<`M` *extends* `object`\> = `number` & \{ `__carries`: `M`; \}

Defined in: [brand.ts:17](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/brand.ts#L17)

Required, not optional — optional is satisfied by any plain number; plain key, not unique symbol, to avoid TS4023 in a consumer's own build.

## Type Declaration

### \_\_carries

> `readonly` **\_\_carries**: `M`

## Type Parameters

### M

`M` *extends* `object`

The meta shape the code carries.

## Example

```ts
const REGISTRY = {
  WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404),
} as const satisfies Record<string, number>

// @ts-expect-error meta is required, not optional
throwAppError('WIDGET_NOT_FOUND')
throwAppError('WIDGET_NOT_FOUND', { widgetId: 'w1' }) // ok
```
