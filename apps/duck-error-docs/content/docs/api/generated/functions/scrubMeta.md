# Function: scrubMeta()

> **scrubMeta**(`meta`: `object`, `depth?`: `number`): `Record`\<`string`, `unknown`\>

Defined in: [scrub.ts:26](https://github.com/gentleeduck/duck-error/blob/8189fd333e8bc6ffad92de40d5c2d651b7e5d1e6/packages/duck-error/src/scrub.ts#L26)

Every secret-bearing key dropped, at any depth. Past the cap the subtree is truncated, not walked.

## Parameters

### meta

`object`

### depth?

`number` = `0`

## Returns

`Record`\<`string`, `unknown`\>

## Example

```ts
scrubMeta({ widgetId: 'w1', detail: { password: 'leak-me' } })
// -> { widgetId: 'w1', detail: {} } — 'password' matches the secret pattern, 'detail' and 'widgetId' don't
```
