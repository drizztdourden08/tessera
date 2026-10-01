---
'@drizztdourden08/tessera': minor
---

Tag classes are `.tag` again, and CodeBlock prefixes its highlighter classes as `code-block__token--<type>` so they cannot match a component. TagPicker options take a Tag `variant` and `color` and keep them once picked, with a border in their colour. Badge drops spaces and symbols from its value before it renders, shows numbers as whole counts, and renders nothing when no text is left or a count is below 0. ProgressBar renames `variant` and `secondaryVariant` to `tone` and `secondaryTone` (`ProgressVariant` is `ProgressTone`), takes `parts`, several labelled amounts stacked in one bar with a tone or colour each and an optional `legend`, and is now a labelled `progressbar` with `aria-valuenow` and, for parts, `aria-valuetext`; see MIGRATION.md.
