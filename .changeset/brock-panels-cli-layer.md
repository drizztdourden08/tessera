---
'@drizztdourden08/tessera': minor
---

`AboutPanel`, `ReleaseNotesPanel`, `CalibrationPanel` and `ProfilePicker` move to Brock and leave Tessera: import the first two from `@drizztdourden08/brock-react`, `CalibrationPanel` from `@drizztdourden08/brock-input/renderer`, and use Brock's `ProfilesPanel` for profiles. `useCopy` is exported, and an app part reads the whole string table through `useTesseraStrings`. `tessera new` takes `layer` from `tessera.config.json` and `--layer`, imports a usage example from the part's own workspace package and its export, and writes a story only where the part's package lists StoryLite or a `stories` folder is set. See MIGRATION.md.
