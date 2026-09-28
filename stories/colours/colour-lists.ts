/* @layer stories @kind data */
interface MainSwatch {
  group: 'Accents' | 'White and black' | 'Urgency' | 'Tags';
  name: string;
  token: string;
  on: string;
  use: string;
}

const MAIN_SWATCHES: readonly MainSwatch[] = [
  { group: 'Accents', name: 'Primary', token: '--p-primary', on: '--p-on-primary', use: 'Selection, focus, the main action.' },
  { group: 'Accents', name: 'Secondary', token: '--p-secondary', on: '--p-on-secondary', use: 'Positive states and the second action.' },
  { group: 'Accents', name: 'Tertiary', token: '--p-tertiary', on: '--p-on-tertiary', use: 'The quiet third tier, and every neutral: grounds, borders and text are steps of it.' },
  { group: 'White and black', name: 'White', token: '--p-white', on: '--p-black', use: 'The white of this app: the light ground.' },
  { group: 'White and black', name: 'Black', token: '--p-black', on: '--p-white', use: 'The black of this app: panels and layers on the dark ground.' },
  { group: 'White and black', name: 'Pure white', token: '--p-pure-white', on: '--p-pure-black', use: 'The top of every palette.' },
  { group: 'White and black', name: 'Pure black', token: '--p-pure-black', on: '--p-pure-white', use: 'The bottom of every palette, and the dark ground.' },
  { group: 'Urgency', name: 'Danger', token: '--p-danger', on: '--c-on-danger', use: 'Errors and what cannot be undone.' },
  { group: 'Urgency', name: 'Warning', token: '--p-warning', on: '--c-on-warning', use: 'Caution: it works, but look.' },
  { group: 'Urgency', name: 'Info', token: '--p-info', on: '--c-on-info', use: 'Information to note, never a selection.' },
  { group: 'Urgency', name: 'Success', token: '--p-success', on: '--c-on-success', use: 'Done, saved, passed.' },
  { group: 'Tags', name: 'Rose', token: '--p-tag-rose', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Orange', token: '--p-tag-orange', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Amber', token: '--p-tag-amber', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Lime', token: '--p-tag-lime', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Green', token: '--p-tag-green', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Teal', token: '--p-tag-teal', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Cyan', token: '--p-tag-cyan', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Blue', token: '--p-tag-blue', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Violet', token: '--p-tag-violet', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
  { group: 'Tags', name: 'Pink', token: '--p-tag-pink', on: '--p-pure-black', use: 'Labels, categories, chart series.' },
];

const SWATCH_GROUPS = ['Accents', 'White and black', 'Urgency', 'Tags'] as const;

interface Palette {
  name: string;
  prefix: string;
  steps: readonly number[];
  seed: number | null;
}

const ACCENT_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950] as const;
const GREY_STEPS = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000] as const;

const PALETTES: readonly Palette[] = [
  { name: 'Primary', prefix: '--p-primary', steps: ACCENT_STEPS, seed: 500 },
  { name: 'Secondary', prefix: '--p-secondary', steps: ACCENT_STEPS, seed: 500 },
  { name: 'Tertiary', prefix: '--p-tertiary', steps: ACCENT_STEPS, seed: 500 },
  { name: 'Grey', prefix: '--p-grey', steps: GREY_STEPS, seed: null },
];

export { MAIN_SWATCHES, PALETTES, SWATCH_GROUPS };
export type { MainSwatch, Palette };
