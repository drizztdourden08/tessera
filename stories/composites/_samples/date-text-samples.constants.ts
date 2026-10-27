/* @layer stories @kind data */
import { buildSchema } from '../../../src/data';
import type { DateFormat, DateLength, TesseraOverrides } from '../../../src/primitives';
import type { DateRow, DateRunningStep, DateStep } from './date-text-samples.type';

const MINUTE_MS = 60_000;

const LOADED = Date.now();

const FRENCH: TesseraOverrides = {
  strings: {
    dates: {
      locale: 'fr', justNow: 'À l\'instant', today: 'Aujourd\'hui', yesterday: 'Hier', tomorrow: 'Demain',
      dayAt: (day: string, time: string) => `${day} à ${time}`,
    },
  },
};

const OWN_FORMAT: DateFormat = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };

const FORMAT_ROWS: readonly { key: string; label: string; format: DateFormat }[] = [
  { key: 'relative', label: 'relative', format: 'relative' },
  { key: 'calendar', label: 'calendar', format: 'calendar' },
  { key: 'date', label: 'date', format: 'date' },
  { key: 'time', label: 'time', format: 'time' },
  { key: 'datetime', label: 'datetime', format: 'datetime' },
  { key: 'weekday', label: 'weekday', format: 'weekday' },
  { key: 'month', label: 'month', format: 'month' },
  { key: 'iso', label: 'iso', format: 'iso' },
  { key: 'options', label: 'Intl options', format: OWN_FORMAT },
];

const FORMAT_COLUMNS: readonly { key: DateLength | 'french'; label: string }[] = [
  { key: 'short', label: 'short' },
  { key: 'medium', label: 'medium' },
  { key: 'long', label: 'long' },
  { key: 'french', label: 'French, default length' },
];

const LADDER: readonly DateStep[] = [
  { key: 'now', label: '20 s ago', minutes: -1 / 3 },
  { key: 'minutes', label: '5 min ago', minutes: -5 },
  { key: 'hours', label: '3 h ago', minutes: -180 },
  { key: 'yesterday', label: '26 h ago', minutes: -1560 },
  { key: 'days', label: '4 days ago', minutes: -5760 },
  { key: 'weeks', label: '2 weeks ago', minutes: -20_160 },
  { key: 'months', label: '3 months ago', minutes: -129_600 },
  { key: 'year', label: '14 months ago', minutes: -604_800 },
  { key: 'ahead', label: 'In 10 min', minutes: 10 },
  { key: 'days-ahead', label: 'In 3 days', minutes: 4320 },
];

const LADDER_COLUMNS: readonly { key: string; label: string }[] = [
  { key: 'relative', label: 'relative' },
  { key: 'short', label: 'relative, short' },
  { key: 'calendar', label: 'calendar' },
  { key: 'french', label: 'relative, French' },
];

const RUNNING: readonly DateRunningStep[] = [
  { name: 'Index rebuild', seconds: 12, label: 'running' },
  { name: 'Asset export', seconds: 243, label: 'running' },
  { name: 'Nightly backup', seconds: 3720, label: 'running' },
  { name: 'Archive sweep', seconds: 183_600, label: 'stuck for' },
];

const DATE_ROWS: readonly DateRow[] = [
  { id: 'r1', name: 'Before the palace', savedAt: LOADED - 5 * MINUTE_MS, created: '2026-03-14T18:05:00Z' },
  { id: 'r2', name: 'Dark World start', savedAt: LOADED - 1400 * MINUTE_MS, created: '2026-02-02T09:30:00Z' },
  { id: 'r3', name: 'Ice Palace, second key', savedAt: LOADED - 4400 * MINUTE_MS, created: '2025-12-24T21:12:00Z' },
];

const DATE_SCHEMA = buildSchema(DATE_ROWS, { dates: { savedAt: 'calendar', created: 'date' }, labels: { savedAt: 'Saved', created: 'Started' } });

const DATE_CODE = `import { DateText, formatDate } from '@drizztdourden08/tessera';

<DateText value={save.timestamp} format="relative" />
<DateText value="2026-10-16T21:40:00Z" format="date" length="long" />
<DateText value={Date.now()} format={{ month: 'short', day: 'numeric' }} tooltip />
<DateText value={job.startedAt} format="elapsed" label="running" /> // running 4m 03s, ticking
<DateText value={job.startedAt} format="elapsed" length="short" /> // 4m, one unit

// The same text outside React, or for a table column
formatDate(save.timestamp, 'calendar'); // Today, 21:40
buildSchema(rows, { dates: { savedAt: 'calendar' } });

// The app's locale and words
<TesseraProvider overrides={{ strings: { dates: { locale: 'fr', justNow: "À l'instant" } } }}>`;

export { DATE_CODE, DATE_ROWS, DATE_SCHEMA, FORMAT_COLUMNS, FORMAT_ROWS, FRENCH, LADDER, LADDER_COLUMNS, LOADED, MINUTE_MS, RUNNING };
