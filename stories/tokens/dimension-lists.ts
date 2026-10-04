/* @layer stories @kind data */
import type { TokenEntry } from './token-table.type';

const SPACING: readonly TokenEntry[] = [
  { token: '--space-2xs' },
  { token: '--space-xs' },
  { token: '--space-sm' },
  { token: '--space-md' },
  { token: '--space-lg' },
  { token: '--space-xl' },
  { token: '--space-2xl' },
];

const SCALE_STEPS = [1, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 128, 160, 192, 224, 256, 288, 320, 384, 448, 512, 640, 768, 896, 1024] as const;

const SCALE: readonly TokenEntry[] = SCALE_STEPS.map((px) => ({ token: `--size-${px}` }));

const RADIUS: readonly TokenEntry[] = [
  { token: '--radius-sm' },
  { token: '--radius-md' },
  { token: '--radius-lg' },
  { token: '--radius-xl' },
  { token: '--radius-pill' },
  { token: '--radius-round' },
];

interface SizeGroup {
  title: string;
  entries: readonly TokenEntry[];
}

const SIZE_GROUPS: readonly SizeGroup[] = [
  {
    title: 'Layout',
    entries: [
      { token: '--dialog-w-sm' },
      { token: '--dialog-w-md' },
      { token: '--panel-w-sm' },
      { token: '--panel-w-md' },
      { token: '--panel-w-lg' },
      { token: '--widget-w-min' },
    ],
  },
  {
    title: 'Controls and chrome',
    entries: [
      { token: '--control-h-sm' },
      { token: '--control-h-md' },
      { token: '--titlebar-height' },
      { token: '--scrollbar-size' },
      { token: '--avatar-d' },
      { token: '--badge-d-xs' },
      { token: '--sort-caret-width' },
      { token: '--menu-trigger-width' },
      { token: '--table-select-w' },
      { token: '--open-entry-width' },
      { token: '--filter-clause-width' },
      { token: '--dropzone-inline-w' },
    ],
  },
  {
    title: 'Section nav',
    entries: [
      { token: '--side-nav-w' },
      { token: '--side-nav-w-open' },
      { token: '--side-nav-item-h' },
      { token: '--side-nav-toggle-d' },
    ],
  },
  {
    title: 'Widgets and dock',
    entries: [
      { token: '--widget-titlebar-h' },
      { token: '--widget-btn-d' },
      { token: '--widget-options-w' },
      { token: '--widget-options-slider-w' },
      { token: '--widget-options-aside-w' },
      { token: '--dock-grip-h' },
      { token: '--dock-divider-bar' },
    ],
  },
  {
    title: 'Hero',
    entries: [
      { token: '--hero-h' },
      { token: '--hero-intro-w' },
      { token: '--hero-art-left' },
      { token: '--hero-art-h' },
      { token: '--hero-aside-w' },
    ],
  },
  {
    title: 'FactsPanel',
    entries: [{ token: '--facts-panel-value-max-w' }],
  },
  {
    title: 'Settings rows',
    entries: [
      { token: '--settings-row-compact-h' },
      { token: '--settings-row-compact-control-w' },
    ],
  },
  {
    title: 'Brand',
    entries: [
      { token: '--brand-mark-sm' },
      { token: '--brand-mark-md' },
      { token: '--brand-mark-lg' },
      { token: '--brand-mark-xl' },
      { token: '--pixel-wordmark-sm' },
      { token: '--pixel-wordmark-md' },
      { token: '--pixel-wordmark-lg' },
    ],
  },
];

export { RADIUS, SCALE, SCALE_STEPS, SIZE_GROUPS, SPACING };
