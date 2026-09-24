# Function: scrubMeta()

> **scrubMeta**(`meta`: `object`, `depth?`: `number`): `Record`\<`string`, `unknown`\>

Defined in: [scrub.ts:12](https://github.com/gentleeduck/duck-error/blob/ac3a7b4fe00b2803c0b15bea5cb68867dfe4c4f3/packages/duck-errors/src/scrub.ts#L12)

Every secret-bearing key dropped, at any depth. Past the cap the subtree is truncated, not walked.

## Parameters

### meta

`object`

### depth?

`number` = `0`

## Returns

`Record`\<`string`, `unknown`\>
