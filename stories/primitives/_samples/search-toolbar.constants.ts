/* @layer stories @kind data */
const TOOLBAR_PRESETS = ['Casual seed', 'Keysanity', 'Swordless', 'Open mode', 'Inverted world', 'Boss shuffle'] as const;

const TOOLBAR_SORTS = [
  { value: 'recent', label: 'Last played' },
  { value: 'name', label: 'Name' },
];

export { TOOLBAR_PRESETS, TOOLBAR_SORTS };
