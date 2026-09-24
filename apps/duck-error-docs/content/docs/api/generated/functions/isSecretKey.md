# Function: isSecretKey()

> **isSecretKey**(`key`: `string`): `boolean`

Defined in: [scrub.ts:14](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/scrub.ts#L14)

## Parameters

### key

`string`

## Returns

`boolean`

## Example

```ts
isSecretKey('apiToken') // true — substring match, so it over-redacts rather than under-redacts
isSecretKey('widgetId') // false
```
