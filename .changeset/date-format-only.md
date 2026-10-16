---
"@drizztdourden08/tessera": patch
---

`formatDate` is now the one way Tessera writes a date. A `Date` in a Select or Combobox column with no `format`, or as an option's text, tag or category, used the browser's `toLocaleDateString()` and now reads as the `date` preset, the same text as `format: 'date'`: Oct 16, 2026 in place of 10/16/2026 in English. A new test fails when `src` or the gallery writes a date with a `toLocale` call or an Intl date formatter outside `date-format`.
