---
"@drizztdourden08/tessera": minor
---

Text takes `tone` as Span does, `mono` for the code face, `numeric` for tabular figures and `variant="overline"` for small caps group headings. No Tessera text uses `--c-text-faint` any more (about 1.86:1); it is `--c-text-muted` (5.29:1 on the LogPanel), and the standards extension adds the stylelint rule `tessera/no-faint-text`, which refuses `color: var(--c-text-faint)`. See MIGRATION.md section 117.
