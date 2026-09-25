# Function: isSecretKey()

> **isSecretKey**(`key`: `string`): `boolean`

Defined in: [scrub.ts:14](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/scrub.ts#L14)

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
