# Function: scrubMeta()

> **scrubMeta**(`meta`: `object`, `depth?`: `number`): `Record`\<`string`, `unknown`\>

Defined in: [scrub.ts:26](https://github.com/gentleeduck/duck-error/blob/9f780d12ee1ae6b18d178e0e8a92b97584f33b7b/packages/duck-error/src/scrub.ts#L26)

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
