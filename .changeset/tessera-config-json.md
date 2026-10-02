---
'@drizztdourden08/tessera': minor
---

An app tells Tessera's tools where its own parts live in `tessera.config.json` at the repo root, checked against the shipped `tessera.config.schema.json`. `@drizztdourden08/tessera/config` reads it from Node with `loadTesseraConfig` and `findTesseraConfig`, with types. `tessera new` writes each kind into the configured folders, the views into the folder of the app it runs in, and takes `--into` to pick a folder from a list. Tessera declares a `@drizztdourden08/standards` extension that requires usage files in the configured parts and passes their primitives globs and theme token file to ESLint and stylelint. Tessera's own `aiUsage` setting moves from package.json to `ai.usage` in its `tessera.config.json`. See MIGRATION.md.
