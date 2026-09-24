# Type Alias: Bare\<R *extends* [`Registry`](Registry.md)\>

> **Bare**\<`R` *extends* [`Registry`](Registry.md)\> = `{ [C in Code<R>]: [HasRequired<Meta<R, C>>] extends [never] ? C : never }`\[[`Code`](Code.md)\<`R`\>\]

Defined in: [kit.ts:37](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/kit.ts#L37)

A code that needs nothing beyond itself.

## Type Parameters

### R

`R` *extends* [`Registry`](Registry.md)

## Example

```ts
type NoMetaNeeded = ErrorKit.Bare<typeof REGISTRY> // every code declared with a plain number, no detail()/fault()<M>
```
