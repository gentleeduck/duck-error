# Interface: ErrorKit\<R *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md)\>

Defined in: [kit.ts:4](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L4)

## Type Parameters

### R

`R` *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md)

## Properties

### ErrorClass

> `readonly` **ErrorClass**: \<`C`\>(`code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>) => [`KitError`](KitError.md)\<`R`, `C`\>

Defined in: [kit.ts:42](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L42)

For instanceof checks or subclassing — see createErrorKit for why it's never shared across kits.

#### Parameters

##### code

`C`

##### args

...[`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>

#### Returns

[`KitError`](KitError.md)\<`R`, `C`\>

## Methods

### asError()

> **asError**\<`C` *extends* `string`\>(`error`: `unknown`, `code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>): [`KitError`](KitError.md)\<`R`\>

Defined in: [kit.ts:50](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L50)

An already-typed error as it stands; anything else wrapped under the fallback code with the original on `cause`.

#### Type Parameters

##### C

`C` *extends* `string`

#### Parameters

##### error

`unknown`

##### code

`C`

##### args

...[`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>

#### Returns

[`KitError`](KitError.md)\<`R`\>

***

### fail()

> **fail**\<`C` *extends* `string`\>(`code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>): [`KitError`](KitError.md)\<`R`, `C`\>

Defined in: [kit.ts:47](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L47)

Constructs and returns (never throws) a typed instance.

#### Type Parameters

##### C

`C` *extends* `string`

#### Parameters

##### code

`C`

##### args

...[`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>

#### Returns

[`KitError`](KitError.md)\<`R`, `C`\>

***

### hasErrorCode()

> **hasErrorCode**\<`C` *extends* `string`\>(`err`: `unknown`, `code`: `C`): `err is Error & { meta: MetaOf<R[C]> }`

Defined in: [kit.ts:54](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L54)

Checked by property, not instanceof, so a duplicated copy of this package still matches; meta is checked too, since code alone could narrow to a meta that isn't actually there.

#### Type Parameters

##### C

`C` *extends* `string`

#### Parameters

##### err

`unknown`

##### code

`C`

#### Returns

`err is Error & { meta: MetaOf<R[C]> }`

***

### metaOf()

> **metaOf**\<`C` *extends* `string`\>(`err`: [`KitError`](KitError.md)\<`R`\>, `code`: `C`): [`MetaOf`](../duck-error/namespaces/Brand/type-aliases/MetaOf.md)\<`R`\[`C`\]\>

Defined in: [kit.ts:56](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L56)

Reads `err.meta` at the shape `code` declares. Safe once the caller has confirmed `err.code === code`.

#### Type Parameters

##### C

`C` *extends* `string`

#### Parameters

##### err

[`KitError`](KitError.md)\<`R`\>

##### code

`C`

#### Returns

[`MetaOf`](../duck-error/namespaces/Brand/type-aliases/MetaOf.md)\<`R`\[`C`\]\>

***

### rethrowError()

> **rethrowError**\<`C` *extends* `string`\>(`error`: `unknown`, `code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>): `never`

Defined in: [kit.ts:52](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L52)

[ErrorKit.asError](#aserror), thrown rather than returned.

#### Type Parameters

##### C

`C` *extends* `string`

#### Parameters

##### error

`unknown`

##### code

`C`

##### args

...[`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>

#### Returns

`never`

***

### throwError()

> **throwError**\<`C` *extends* `string`\>(`code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>): `never`

Defined in: [kit.ts:48](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/kit.ts#L48)

#### Type Parameters

##### C

`C` *extends* `string`

#### Parameters

##### code

`C`

##### args

...[`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>

#### Returns

`never`
