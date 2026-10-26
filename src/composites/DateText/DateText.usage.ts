/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A date or a time in any common format, such as 5 minutes ago, Today, 21:40 or 16 October 2026, with the full date on hover.',
  useWhen: [
    'A list row, a card or a panel says when something happened, such as when a save was made.',
    'A date has to follow the app\'s language and stay correct as time passes, such as 5 minutes ago.',
  ],
  avoidWhen: [
    { case: 'The date is already text the app wrote itself.', use: 'Time' },
    { case: 'Labelled values sit together in a panel, a date among them.', use: 'FactsPanel' },
  ],
  rules: [
    'Pass the raw moment as value, a Date, an ISO string or epoch ms, never text the app formatted.',
    'Use relative for how long ago, calendar for a list of recent saves, date or datetime for records.',
    'Use elapsed for a running job, such as running 4m 03s; set label to the word before it, already translated.',
    'Leave length unset first: each format starts at the length that reads best.',
    'Set the locale and the words Just now, Today, Yesterday and Tomorrow once, in the dates strings.',
    'For a table column, set SchemaConfig.dates; for text outside React, call formatDate with the same format.',
    'Set the unit letters of elapsed and the order of label and time in the dates strings.',
    'Turn tooltip on for a short format whose exact moment matters, such as time or weekday.',
  ],
  a11y: [
    'The text is a time element whose datetime attribute holds the exact moment.',
    'Set focusable when the full date is the only way to read the exact moment, so the keyboard reaches its Tooltip.',
    'A ticking elapsed value is not a live region, so a screen reader is not read every second; the Tooltip holds the exact start.',
    'Figures are tabular, so a time that redraws keeps its width and its neighbours stay put.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a date or a time, such as 5 minutes ago'],
    rule: 'DateText formats a moment with the browser\'s Intl, in the app\'s locale, and keeps relative, calendar and elapsed text up to date from shared timers, paused while the page is hidden.',
  },
  example: `import { DateText } from '@drizztdourden08/tessera';

const SaveTime = ({ savedAt }: { savedAt: number }) => <DateText value={savedAt} format="relative" />;
`,
  propsHash: 'dc0c1e6f57af3eac',
} satisfies ComponentUsage;

export { usage };
