# Type Alias: Carries\<M *extends* `object`\>

> **Carries**\<`M` *extends* `object`\> = `number` & \{ `__carries`: `M`; \}

Defined in: [brand.ts:7](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/brand.ts#L7)

Required, not optional — optional is satisfied by any plain number; plain key, not unique symbol, to avoid TS4023 in a consumer's own build.

## Type Declaration

### \_\_carries

> `readonly` **\_\_carries**: `M`

## Type Parameters

### M

`M` *extends* `object`

The meta shape the code carries.
