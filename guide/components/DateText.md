# DateText

A date or a time in any common format, such as 5 minutes ago, Today, 21:40 or 16 October 2026, with the full date on hover.

Import it from `@drizztdourden08/tessera`. It is also exported from `@drizztdourden08/tessera/composites`.

```tsx
import { DateText } from '@drizztdourden08/tessera';
```

The source is `src/composites/DateText/DateText.tsx`. Its gallery page is Composites · Content/DateText (`#/story/composites-datetext--overview`).

## Where the questions lead here

What are you placing? A status, a count or a label. What does it show? A date or a time, such as 5 minutes ago.

DateText formats a moment with the browser's Intl, in the app's locale, and keeps relative and calendar text up to date.

## Use it when

- A list row, a card or a panel says when something happened, such as when a save was made.
- A date has to follow the app's language and stay correct as time passes, such as 5 minutes ago.

## Use something else when

- The date is already text the app wrote itself. Use `Time` instead.
- Labelled values sit together in a panel, a date among them. Use `FactsPanel` instead.

## Rules

- Pass the raw moment as value, a Date, an ISO string or epoch ms, never text the app formatted.
- Use relative for how long ago, calendar for a list of recent saves, date or datetime for records.
- Leave length unset first: each format starts at the length that reads best.
- Set the locale and the words Just now, Today, Yesterday and Tomorrow once, in the dates strings.
- For a table column, set SchemaConfig.dates; for text outside React, call formatDate with the same format.
- Turn tooltip on for a short format whose exact moment matters, such as time or weekday.

## Accessibility

- The text is a time element whose datetime attribute holds the exact moment.
- Set focusable when the full date is the only way to read the exact moment, so the keyboard reaches its Tooltip.
- Figures are tabular, so a time that redraws keeps its width and its neighbours stay put.

## Example

```tsx
import { DateText } from '@drizztdourden08/tessera';

const SaveTime = ({ savedAt }: { savedAt: number }) => <DateText value={savedAt} format="relative" />;
```

## Props

- `value`: `DateValue`.
- `format` (optional): `DateFormat`. Default `'datetime'`.
- `length` (optional): `DateLength`, one of `'short'`, `'medium'`, `'long'`.
- `tooltip` (optional): `boolean`.
- `focusable` (optional): `boolean`. Default `false`.
- `className` (optional): `string`.
