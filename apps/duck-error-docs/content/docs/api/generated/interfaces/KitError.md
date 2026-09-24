# Interface: KitError\<R *extends* [`Registry`](../duck-error/namespaces/ErrorKit/type-aliases/Registry.md), C *extends* [`Code`](../duck-error/namespaces/ErrorKit/type-aliases/Code.md)\<`R`\> = [`Code`](../duck-error/namespaces/ErrorKit/type-aliases/Code.md)\<`R`\>\>

Defined in: [kit.ts:31](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L31)

The shape every kit's error instances have, independent of which kit built them.

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

Defined in: [kit.ts:32](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L32)

***

### meta

> `readonly` **meta**: `Record`\<`string`, `unknown`\>

Defined in: [kit.ts:36](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L36)

***

### status

> `readonly` **status**: `number`

Defined in: [kit.ts:33](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L33)

***

### statusCode

> `readonly` **statusCode**: `number`

Defined in: [kit.ts:35](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L35)

Same value as `status`, under the name Nest's base exception filter reads.

## Methods

### toJSON()

> **toJSON**(): \{ `error`: \{ `code`: `C`; `status`: `number`; \} & `Record`\<`string`, `unknown`\>; `ok`: `false`; \}

Defined in: [kit.ts:37](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/kit.ts#L37)

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
