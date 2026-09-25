# Function: detail()

> **detail**\<`M` *extends* `object` = `never`\>(`status`: `number`): [`Carries`](../duck-error/namespaces/Brand/type-aliases/Carries.md)\<`M`\>

Defined in: [brand.ts:59](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/brand.ts#L59)

M can't be inferred (no parameter uses it), so it defaults to never, not object — object would silently accept any meta shape.

## Type Parameters

### M

`M` *extends* `object` = `never`

The meta shape the code carries.

## Parameters

### status

`number`

## Returns

[`Carries`](../duck-error/namespaces/Brand/type-aliases/Carries.md)\<`M`\>

## Example

```ts
const REGISTRY = {
  WIDGET_NOT_FOUND: detail<{ widgetId: string }>(404), // meta required at the call site
  BAD_INPUT: detail(400), // no <M> given — behaves like a bare code, not an unchecked one
} as const satisfies Record<string, number>
```
