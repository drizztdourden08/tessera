/* @layer stories @kind data */
type TokenGroup = { title: string; tokens: readonly string[] };

const COLOUR_GROUPS: readonly TokenGroup[] = [
  { title: 'Grounds', tokens: ['--c-bg', '--c-surface', '--c-sunken', '--c-layer', '--c-glass', '--c-panel', '--c-inset', '--c-hover'] },
  { title: 'Borders', tokens: ['--c-border', '--c-border-strong', '--c-hairline'] },
  { title: 'Text', tokens: ['--c-text', '--c-text-dim', '--c-text-muted', '--c-text-faint'] },
  { title: 'Primary', tokens: ['--c-primary', '--c-primary-bright', '--c-primary-dim', '--c-primary-soft', '--c-on-primary', '--c-selected'] },
  { title: 'Secondary', tokens: ['--c-secondary', '--c-secondary-bright', '--c-secondary-dim', '--c-secondary-soft', '--c-secondary-scrim', '--c-on-secondary'] },
  { title: 'Tertiary', tokens: ['--c-tertiary', '--c-tertiary-bright', '--c-tertiary-dim', '--c-tertiary-soft', '--c-on-tertiary'] },
  { title: 'Danger', tokens: ['--c-danger', '--c-danger-bright', '--c-danger-dim', '--c-danger-soft', '--c-on-danger'] },
  { title: 'Warning', tokens: ['--c-warning', '--c-warning-bright', '--c-warning-dim', '--c-warning-soft', '--c-on-warning'] },
  { title: 'Info', tokens: ['--c-info', '--c-info-bright', '--c-info-dim', '--c-info-soft', '--c-on-info'] },
  { title: 'Success', tokens: ['--c-success', '--c-success-bright', '--c-success-dim', '--c-success-soft', '--c-on-success'] },
  { title: 'Tags', tokens: ['--c-tag-rose', '--c-tag-orange', '--c-tag-amber', '--c-tag-lime', '--c-tag-green', '--c-tag-teal', '--c-tag-cyan', '--c-tag-blue', '--c-tag-violet', '--c-tag-pink'] },
  { title: 'Scrims', tokens: ['--c-scrim', '--c-scrim-game'] },
];

type ContrastPair = { text: string; fill: string };

const CONTRAST_PAIRS: readonly ContrastPair[] = [
  { text: '--c-on-primary', fill: '--c-primary' },
  { text: '--c-on-secondary', fill: '--c-secondary' },
  { text: '--c-on-tertiary', fill: '--c-tertiary' },
  { text: '--c-on-danger', fill: '--c-danger' },
  { text: '--c-on-warning', fill: '--c-warning' },
  { text: '--c-on-info', fill: '--c-info' },
  { text: '--c-on-success', fill: '--c-success' },
  { text: '--c-text', fill: '--c-bg' },
  { text: '--c-text-dim', fill: '--c-bg' },
  { text: '--c-text-muted', fill: '--c-bg' },
  { text: '--c-text', fill: '--c-surface' },
  { text: '--c-text-dim', fill: '--c-surface' },
  { text: '--c-text-muted', fill: '--c-surface' },
  { text: '--c-primary-bright', fill: '--c-primary-dim' },
  { text: '--c-secondary-bright', fill: '--c-secondary-dim' },
];

const SHADOWS = ['--shadow-1', '--shadow-2', '--shadow-3', '--shadow-dropdown', '--shadow-overlay', '--shadow-lg'];
const Z_INDEX = [
  '--z-base', '--z-sticky', '--z-nav-overlay', '--z-backdrop', '--z-panel', '--z-floating',
  '--z-modal', '--z-popover', '--z-toast', '--z-tooltip', '--z-top',
];
const DURATIONS = [
  '--duration-fast', '--duration-normal', '--duration-slow', '--duration-drawer', '--duration-float',
  '--duration-glow-drift', '--duration-mascot-hop', '--duration-twinkle',
];
const EASINGS = ['--ease-standard', '--ease-emphasized'];
const TRANSITIONS = ['--transition-fast', '--transition-normal'];

export {
  COLOUR_GROUPS, CONTRAST_PAIRS, DURATIONS, EASINGS, SHADOWS, TRANSITIONS, Z_INDEX,
};
export type { ContrastPair };
