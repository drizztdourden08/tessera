/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

const TIME_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'RotP SaveRowTime', badge: 'Replaced', tone: 'warning', text: 'RotP draws each save\'s time itself: a Tooltip around its own relativeTime, Just now under a minute, the full date on hover. It reads the time once, so a row says 5 minutes ago until something else redraws it.' },
  { name: 'Tessera today', badge: 'Nothing', text: 'No part or helper formats a time relative to now. LogPanel and FactsPanel show the text the app gives them; table and select columns format a date or a date and time, never an age.' },
  { name: 'ItemList, toast() and useNameEdit', badge: 'Shipped', tone: 'success', text: 'The rest of RotP\'s save list is covered already: rows with an inline Undo and the Delete key, a toast that reports how it closed, and the rename hook.' },
];

const TIME_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. RelativeTime, a new composite',
    badge: 'Recommended', tone: 'success',
    text: 'One part for an age: 5 minutes ago in a time element, the full date in a Tooltip on hover. Every RelativeTime on the page redraws from one timer each minute, built on Intl.RelativeTimeFormat, and reads the locale and Just now from the app\'s strings. Fits a row meta, a card, a log or a facts panel.',
  },
  {
    name: 'B. A relative format on the parts that format values',
    badge: 'Considered',
    text: 'Columns of DataTable, Select and FileList take format: relative beside date and datetime, and a formatRelativeTime helper is exported. No new part, but no tooltip, no redraw each minute, and a row meta such as RotP\'s still needs its own wrapper.',
  },
  {
    name: 'C. No new part',
    badge: 'Considered',
    text: 'RotP keeps SaveRowTime and adds its own timer. The next app with a list of saves, sessions or uploads writes the same few lines again.',
  },
];

const TIME_CODE = `import { RelativeTime } from '@drizztdourden08/tessera';

<RelativeTime value={save.timestamp} />

// In a row
<ItemList render={(save) => ({ meta: <RelativeTime value={save.timestamp} /> })} ... />

// The app's locale, through its strings override
<TesseraProvider strings={{ times: { locale: 'fr', justNow: "À l'instant" } }}>`;

export { TIME_CHOICES, TIME_CODE, TIME_MAPPING };
