# Type Alias: Args\<R *extends* [`Registry`](Registry.md), C *extends* [`Code`](Code.md)\<`R`\>\>

> **Args**\<`R` *extends* [`Registry`](Registry.md), `C` *extends* [`Code`](Code.md)\<`R`\>\> = `R`\[`C`\] *extends* [`Carries`](../../Brand/type-aliases/Carries.md)\<`any`\> ? \[[`HasRequired`](HasRequired.md)\<[`Meta`](Meta.md)\<`R`, `C`\>\>\] *extends* \[`never`\] ? \[[`Meta`](Meta.md)\<`R`, `C`\>\] : \[[`Meta`](Meta.md)\<`R`, `C`\>\] : \[\]

Defined in: [kit.ts:58](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/kit.ts#L58)

No args for a bare code, else optional/required per Meta's required keys — gated on the value's own Carries brand, not on Meta, since a bare code's Meta resolves to `{}` which anything would satisfy.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

### C

`C` *extends* [`Code`](Code.md)\<`R`\>

## Example

```ts
const REGISTRY = {
  TEST_BARE: 500, // Args -> []
  TEST_DETAIL: detail<{ field: string }>(400), // Args -> [meta: { field: string }]
  TEST_DETAIL_NO_ARG: detail(400), // no <M> given -> Args -> [] (behaves like bare)
} as const satisfies Record<string, number>
const TestError = createErrorKit('TestError', REGISTRY).ErrorClass

new TestError('TEST_BARE') // ok, no second argument
// @ts-expect-error a code that carries something cannot be raised without it
new TestError('TEST_DETAIL')
new TestError('TEST_DETAIL', { field: 'x' }) // ok
```
