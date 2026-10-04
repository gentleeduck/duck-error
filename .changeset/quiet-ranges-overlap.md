---
'@gentleduck/error': patch
---

`POSTGRES_REFUSALS` classifies SQLSTATE `23P01` (`exclusion_violation`) as `duplicate`. A write refused by an `EXCLUDE` constraint now matches a `duplicate` rule, keyed by its constraint name like a unique violation, instead of falling through to the decorator's own code.
