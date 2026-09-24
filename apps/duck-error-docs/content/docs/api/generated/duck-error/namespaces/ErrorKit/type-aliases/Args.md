# Type Alias: Args\<R *extends* [`Registry`](Registry.md), C *extends* [`Code`](Code.md)\<`R`\>\>

> **Args**\<`R` *extends* [`Registry`](Registry.md), `C` *extends* [`Code`](Code.md)\<`R`\>\> = `R`\[`C`\] *extends* [`Carries`](../../Brand/type-aliases/Carries.md)\<`any`\> ? \[[`HasRequired`](HasRequired.md)\<[`Meta`](Meta.md)\<`R`, `C`\>\>\] *extends* \[`never`\] ? \[[`Meta`](Meta.md)\<`R`, `C`\>\] : \[[`Meta`](Meta.md)\<`R`, `C`\>\] : \[\]

Defined in: [kit.ts:22](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L22)

No args for a bare code, else optional/required per Meta's required keys — gated on the value's own Carries brand, not on Meta, since a bare code's Meta resolves to `{}` which anything would satisfy.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

### C

`C` *extends* [`Code`](Code.md)\<`R`\>
