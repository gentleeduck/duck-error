# Type Alias: Args\<R *extends* [`Registry`](Registry.md), C *extends* [`Code`](Code.md)\<`R`\>\>

> **Args**\<`R` *extends* [`Registry`](Registry.md), `C` *extends* [`Code`](Code.md)\<`R`\>\> = `R`\[`C`\] *extends* [`Carries`](../../Brand/type-aliases/Carries.md)\<`any`\> ? \[[`HasRequired`](HasRequired.md)\<[`Meta`](Meta.md)\<`R`, `C`\>\>\] *extends* \[`never`\] ? \[[`Meta`](Meta.md)\<`R`, `C`\>\] : \[[`Meta`](Meta.md)\<`R`, `C`\>\] : \[\]

Defined in: [kit.ts:22](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L22)

No args for a bare code, else optional/required per Meta's required keys — gated on the value's own Carries brand, not on Meta, since a bare code's Meta resolves to `{}` which anything would satisfy.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

### C

`C` *extends* [`Code`](Code.md)\<`R`\>
