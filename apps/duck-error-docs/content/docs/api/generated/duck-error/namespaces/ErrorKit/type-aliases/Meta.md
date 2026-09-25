# Type Alias: Meta\<R *extends* [`Registry`](Registry.md), C *extends* [`Code`](Code.md)\<`R`\>\>

> **Meta**\<`R` *extends* [`Registry`](Registry.md), `C` *extends* [`Code`](Code.md)\<`R`\>\> = [`MetaOf`](../../Brand/type-aliases/MetaOf.md)\<`R`\[`C`\]\>

Defined in: [kit.ts:16](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/kit.ts#L16)

The meta shape a code carries, looked up straight from the registry's own value for it.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

### C

`C` *extends* [`Code`](Code.md)\<`R`\>

## Example

```ts
type WidgetMeta = ErrorKit.Meta<typeof REGISTRY, 'WIDGET_NOT_FOUND'> // { widgetId: string }
```
