# Interface: KitError\<R *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md), C *extends* [`Code`](../duck-error/namespaces/ErrorKit/type-aliases/Code.md)\<`R`\> = [`Code`](../duck-error/namespaces/ErrorKit/type-aliases/Code.md)\<`R`\>\>

Defined in: [kit.ts:73](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L73)

The shape every kit's error instances have, independent of which kit built them.

## Example

```ts
const err = kit.fail('WIDGET_NOT_FOUND', { widgetId: 'w1' })
err.toJSON() // { ok: false, error: { code: 'WIDGET_NOT_FOUND', status: 404, widgetId: 'w1' } }
```

## Extends

- `Error`

## Type Parameters

### R

`R` *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md)

### C

`C` *extends* [`Code`](../duck-error/namespaces/ErrorKit/type-aliases/Code.md)\<`R`\> = [`Code`](../duck-error/namespaces/ErrorKit/type-aliases/Code.md)\<`R`\>

## Properties

### code

> `readonly` **code**: `C`

Defined in: [kit.ts:74](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L74)

***

### meta

> `readonly` **meta**: `Record`\<`string`, `unknown`\>

Defined in: [kit.ts:78](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L78)

***

### status

> `readonly` **status**: `number`

Defined in: [kit.ts:75](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L75)

***

### statusCode

> `readonly` **statusCode**: `number`

Defined in: [kit.ts:77](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L77)

Same value as `status`, under the name Nest's base exception filter reads.

## Methods

### toJSON()

> **toJSON**(): \{ `error`: \{ `code`: `C`; `status`: `number`; \} & `Record`\<`string`, `unknown`\>; `ok`: `false`; \}

Defined in: [kit.ts:79](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L79)

#### Returns

\{ `error`: \{ `code`: `C`; `status`: `number`; \} & `Record`\<`string`, `unknown`\>; `ok`: `false`; \}

##### error

> **error**: \{ `code`: `C`; `status`: `number`; \} & `Record`\<`string`, `unknown`\>

###### Type Declaration

###### code

> **code**: `C`

###### status

> **status**: `number`

##### ok

> **ok**: `false`
