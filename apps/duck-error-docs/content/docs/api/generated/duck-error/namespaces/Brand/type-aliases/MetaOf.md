# Type Alias: MetaOf\<S\>

> **MetaOf**\<`S`\> = `S` *extends* [`Carries`](Carries.md)\<infer M\> ? `M` : `Record`\<`never`, `never`\>

Defined in: [brand.ts:45](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/brand.ts#L45)

What a status says its code hands back. A plain status says nothing, which is a meta with no keys.

## Type Parameters

### S

`S`

The status to read the meta from.

## Example

```ts
const REGISTRY = { WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404) } as const satisfies Record<string, number>

type Meta = Brand.MetaOf<(typeof REGISTRY)['WIDGET_NOT_FOUND']> // { widgetId: string }
type Bare = Brand.MetaOf<500> // Record<never, never> — a plain status carries nothing
```
