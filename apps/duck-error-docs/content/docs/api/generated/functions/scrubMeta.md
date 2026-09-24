# Function: scrubMeta()

> **scrubMeta**(`meta`: `object`, `depth?`: `number`): `Record`\<`string`, `unknown`\>

Defined in: [scrub.ts:12](https://github.com/gentleeduck/duck-error/blob/486c0f1feeff8b047b529aa51384324e1af9036c/packages/duck-error/src/scrub.ts#L12)

Every secret-bearing key dropped, at any depth. Past the cap the subtree is truncated, not walked.

## Parameters

### meta

`object`

### depth?

`number` = `0`

## Returns

`Record`\<`string`, `unknown`\>
