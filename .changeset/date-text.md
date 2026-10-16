---
"@drizztdourden08/tessera": minor
---

DateText shows a date or a time in any common format: `relative` (5 minutes ago), `calendar` (Today, 21:40), `date`, `time`, `datetime`, `weekday`, `month` and `iso`, each in a short, medium or long `length`, or Intl date options of your own. It renders a `time` element, shows the full date in a Tooltip (on by default for relative and calendar), and keeps relative and calendar text current from one shared clock. `formatDate(value, format, options)` gives the same text outside React. The locale and the words Just now, Today, Yesterday and Tomorrow come from the new `dates` strings. DataTable takes `SchemaConfig.dates` to format a column, and Select and Combobox columns take every date preset as `format`.
