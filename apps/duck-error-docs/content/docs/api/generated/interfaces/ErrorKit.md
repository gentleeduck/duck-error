# Interface: ErrorKit\<R *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md)\>

Defined in: [kit.ts:4](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L4)

## Type Parameters

### R

`R` *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md)

## Properties

### ErrorClass

> `readonly` **ErrorClass**: \<`C`\>(`code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>) => [`KitError`](KitError.md)\<`R`, `C`\>

Defined in: [kit.ts:84](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L84)

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

Defined in: [kit.ts:92](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L92)

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

Defined in: [kit.ts:89](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L89)

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

Defined in: [kit.ts:107](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L107)

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

#### Example

```ts
try {
  await widgets.get(id)
} catch (err) {
  if (kit.hasErrorCode(err, 'WIDGET_NOT_FOUND')) return res.status(404).json({ widgetId: err.meta.widgetId })
  throw err
}
```

***

### metaOf()

> **metaOf**\<`C` *extends* `string`\>(`err`: [`KitError`](KitError.md)\<`R`\>, `code`: `C`): [`MetaOf`](../duck-error/namespaces/Brand/type-aliases/MetaOf.md)\<`R`\[`C`\]\>

Defined in: [kit.ts:115](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L115)

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

#### Example

```ts
if (err.code === 'WIDGET_NOT_FOUND') kit.metaOf(err, 'WIDGET_NOT_FOUND').widgetId // typed, no cast
```

***

### rethrowError()

> **rethrowError**\<`C` *extends* `string`\>(`error`: `unknown`, `code`: `C`, ...`args`: [`Args`](../duck-error/namespaces/ErrorKit/type-aliases/Args.md)\<`R`, `C`\>): `never`

Defined in: [kit.ts:94](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L94)

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

Defined in: [kit.ts:90](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L90)

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
