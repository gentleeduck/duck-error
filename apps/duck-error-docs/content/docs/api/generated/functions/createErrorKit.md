# Function: createErrorKit()

> **createErrorKit**\<`R` *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md), `Name` *extends* `string`\>(`name`: `Name`, `registry`: `R`): [`ErrorKit`](../interfaces/ErrorKit.md)\<`R`\>

Defined in: [kit.ts:60](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L60)

Each call declares its own class (never shared), so two kits' instances never satisfy each other's instanceof; name becomes both the runtime `.name` and the stack-trace identity.

## Type Parameters

### R

`R` *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md)

### Name

`Name` *extends* `string`

## Parameters

### name

`Name`

### registry

`R`

## Returns

[`ErrorKit`](../interfaces/ErrorKit.md)\<`R`\>
