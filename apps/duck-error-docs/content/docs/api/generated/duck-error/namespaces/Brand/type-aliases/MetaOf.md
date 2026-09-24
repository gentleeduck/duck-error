# Type Alias: MetaOf\<S\>

> **MetaOf**\<`S`\> = `S` *extends* [`Carries`](Carries.md)\<infer M\> ? `M` : `Record`\<`never`, `never`\>

Defined in: [brand.ts:44](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/brand.ts#L44)

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
