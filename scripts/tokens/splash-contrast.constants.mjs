/* @layer tooling-scripts @kind data */
const AA = { text: 4.5, large: 3, graphic: 3 };

const GRADIENT_SAMPLES = 32;

const SPLASH_GRADIENT = { selector: '.ts-splash', from: '--c-gradient-dark-from', to: '--c-gradient-dark-to' };

const BUTTON = ['.ts-button'];
const PRIMARY_BUTTON = ['.ts-button', '.ts-button--primary'];
const TRACK = { selectors: ['.ts-progress'], property: 'background' };

const SPLASH_PARTS = [
  { part: 'title', selectors: ['.ts-title'], property: 'color', need: AA.large },
  { part: 'status', selectors: ['.ts-status'], property: 'color', need: AA.text },
  { part: 'failure status', selectors: ['.ts-status', '.ts-status--danger'], property: 'color', need: AA.text },
  { part: 'detail', selectors: ['.ts-detail'], property: 'color', need: AA.text },
  { part: 'version', selectors: ['.ts-version'], property: 'color', need: AA.text },
  { part: 'button label', selectors: BUTTON, property: 'color', on: { selectors: BUTTON, property: 'background' }, need: AA.text },
  { part: 'primary button label', selectors: PRIMARY_BUTTON, property: 'color', on: { selectors: PRIMARY_BUTTON, property: 'background' }, need: AA.text },
  { part: 'button border', selectors: BUTTON, property: 'border', need: AA.graphic },
  { part: 'primary button border', selectors: PRIMARY_BUTTON, property: 'border', need: AA.graphic },
  { part: 'progress bar', selectors: ['.ts-progress::before'], property: 'background', on: TRACK, need: AA.graphic },
  { part: 'failed progress bar', selectors: ['.ts-progress::before', '.ts-progress--danger::before'], property: 'background', on: TRACK, need: AA.graphic },
];

export { GRADIENT_SAMPLES, SPLASH_GRADIENT, SPLASH_PARTS };
