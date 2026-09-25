---
'@gentleduck/error': minor
---

`fail` and `throwError` accept an optional `cause` after meta, in a fixed tuple position that holds for every registry branch including bare codes (`fail(code, undefined, causeError)`). Backward compatible: every existing call already omits it.
