/* @layer stories @kind data */
const LADDER: readonly { key: string; label: string; minutes: number }[] = [
  { key: 'now', label: '20 s ago', minutes: -1 / 3 },
  { key: 'minutes', label: '5 min ago', minutes: -5 },
  { key: 'hours', label: '3 h ago', minutes: -180 },
  { key: 'yesterday', label: '26 h ago', minutes: -1560 },
  { key: 'days', label: '4 days ago', minutes: -5760 },
  { key: 'weeks', label: '2 weeks ago', minutes: -20_160 },
  { key: 'months', label: '3 months ago', minutes: -129_600 },
  { key: 'year', label: '14 months ago', minutes: -604_800 },
  { key: 'ahead', label: 'In 10 min', minutes: 10 },
];

const LADDER_COLUMNS: readonly { key: string; label: string }[] = [
  { key: 'long', label: 'long' },
  { key: 'short', label: 'short' },
  { key: 'fr', label: 'French strings' },
];

const FRENCH = { locale: 'fr', justNow: "À l'instant" };

export { FRENCH, LADDER, LADDER_COLUMNS };
