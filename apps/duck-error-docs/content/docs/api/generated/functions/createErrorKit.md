# Function: createErrorKit()

> **createErrorKit**\<`R` *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md), `Name` *extends* `string`\>(`name`: `Name`, `registry`: `R`): [`ErrorKit`](../interfaces/ErrorKit.md)\<`R`\>

Defined in: [kit.ts:134](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L134)

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

## Example

```ts
const REGISTRY = {
  WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404),
  STORAGE_FAILED: fault<{ cause?: string }>(500),
} as const satisfies Record<string, number>

const kit = createErrorKit('AppError', REGISTRY)
export const AppError = kit.ErrorClass

kit.throwError('WIDGET_NOT_FOUND', { widgetId: 'w1' })
// -> AppError { code: 'WIDGET_NOT_FOUND', status: 404, meta: { widgetId: 'w1' } }
```
