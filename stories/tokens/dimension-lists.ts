/* @layer stories @kind data */
import type { TokenEntry } from './token-table';

type SpacingUse = Record<'margin' | 'padding' | 'gap', string>;

const SPACING_STEPS: readonly (readonly [string, SpacingUse])[] = [
  ['--space-2xs', { margin: 'Nudging a glyph off its neighbour.', padding: 'The inside of a tiny chip or badge.', gap: 'A caption and the control it names, read as one.' }],
  ['--space-xs', { margin: 'Between a label and its value on one line.', padding: 'Compact chips, tags and table cells.', gap: 'An icon beside its text; items inside a toolbar group.' }],
  ['--space-sm', { margin: 'Between lines of a small stack.', padding: 'Buttons and inputs, block direction.', gap: 'Buttons in a row; fields in a compact form.' }],
  ['--space-md', { margin: 'Between paragraphs and related blocks.', padding: 'Buttons and inputs, inline direction; list rows.', gap: 'The default between siblings in a stack.' }],
  ['--space-lg', { margin: 'Between groups inside a panel.', padding: 'Cards and dialog bodies.', gap: 'Between cards in a grid.' }],
  ['--space-xl', { margin: 'Between sections of a page.', padding: 'Roomy panels and empty states.', gap: 'Between the columns of a layout.' }],
  ['--space-2xl', { margin: 'Above a page title; around a hero.', padding: 'Full pages at wide sizes.', gap: 'Between major regions of a page.' }],
];

const spacingFor = (property: keyof SpacingUse): TokenEntry[] =>
  SPACING_STEPS.map(([token, use]) => ({ token, use: use[property] }));

const SCALE_STEPS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128, 160, 192, 224, 256, 288, 320, 384, 448, 512, 640, 768, 896, 1024] as const;

const scaleUse = (px: number): string => {
  if (px <= 2) return 'Hairlines and borders.';
  if (px <= 32) return 'Spacing, radius, type and small parts.';
  if (px <= 128) return 'Controls, icons and marks.';
  return 'Panels, dialogs, layout widths and breakpoints.';
};

const SCALE: readonly TokenEntry[] = SCALE_STEPS.map((px) => ({ token: `--size-${px}`, use: scaleUse(px) }));

const RADIUS: readonly TokenEntry[] = [
  { token: '--radius-sm', use: 'Chips, badges, table cells, small inputs.' },
  { token: '--radius-md', use: 'Buttons, inputs and menus: the default corner.' },
  { token: '--radius-lg', use: 'Cards and popovers.' },
  { token: '--radius-xl', use: 'Dialogs, widgets and large panels.' },
  { token: '--radius-pill', use: 'Fully rounded ends on a bar of any height: pills, tracks.' },
  { token: '--radius-round', use: 'A circle from a square: dots, knobs, avatars.' },
];

interface SizeGroup {
  title: string;
  file: string;
  entries: readonly TokenEntry[];
}

const SIZE_GROUPS: readonly SizeGroup[] = [
  {
    title: 'Layout',
    file: 'canonical.css',
    entries: [
      { token: '--dialog-w-sm', use: 'A small dialog: a question and its buttons.' },
      { token: '--dialog-w-md', use: 'A dialog holding a form.' },
      { token: '--panel-w-sm', use: 'A narrow side panel.' },
      { token: '--panel-w-md', use: 'The default side panel.' },
      { token: '--panel-w-lg', use: 'A wide side panel.' },
      { token: '--widget-w-min', use: 'The narrowest a widget may be drawn.' },
    ],
  },
  {
    title: 'Controls and chrome',
    file: 'size.css',
    entries: [
      { token: '--control-h-sm', use: 'A compact control row.' },
      { token: '--titlebar-height', use: 'The window title bar.' },
      { token: '--scrollbar-size', use: 'Scrollbar thickness.' },
      { token: '--avatar-d', use: 'A signed-in account avatar.' },
      { token: '--badge-d-xs', use: 'A round count or remove badge.' },
      { token: '--sort-caret-width', use: 'The box a sort arrow is centred in.' },
      { token: '--menu-trigger-width', use: 'The column menu trigger beside it.' },
      { token: '--table-select-w', use: 'The checkbox column of a table.' },
      { token: '--open-entry-width', use: 'The free entry a closed-set control offers.' },
      { token: '--filter-clause-width', use: 'One filter clause.' },
      { token: '--dropzone-inline-w', use: 'The inline drop target in a header line.' },
    ],
  },
  {
    title: 'Section nav',
    file: 'size.css',
    entries: [
      { token: '--section-nav-w', use: 'Collapsed width.' },
      { token: '--section-nav-w-open', use: 'Open width.' },
      { token: '--section-nav-item-h', use: 'One item.' },
      { token: '--section-nav-toggle-d', use: 'The round toggle on its edge.' },
    ],
  },
  {
    title: 'Brand',
    file: 'size.css',
    entries: [
      { token: '--brand-mark-sm', use: 'A mark inline beside text.' },
      { token: '--brand-mark-md', use: 'A toolbar icon.' },
      { token: '--brand-mark-lg', use: 'A header.' },
      { token: '--brand-mark-xl', use: 'A splash or an app icon.' },
      { token: '--pixel-wordmark-sm', use: 'A wordmark, one CSS pixel per art pixel.' },
      { token: '--pixel-wordmark-md', use: 'Two CSS pixels per art pixel.' },
      { token: '--pixel-wordmark-lg', use: 'Three CSS pixels per art pixel.' },
    ],
  },
];

export { RADIUS, SCALE, SCALE_STEPS, SIZE_GROUPS, spacingFor };
