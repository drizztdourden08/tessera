---
'@drizztdourden08/tessera': patch
---

Tessera's lint and structure tooling moves from `brock-build` and `brock-lint-config` to `@drizztdourden08/standards`, with the same rules. The usage file check of the standards extension now treats a missing `Name.usage.ts` like any other usage finding: a note in `report` mode, a finding in `enforce` mode. An app needs no change beyond installing Tessera. See MIGRATION.md section 54.
