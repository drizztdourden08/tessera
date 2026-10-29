/* @layer stories @kind data */
const LABELLED_NUMBERS = [
  { id: 'size', label: 'Size', value: 8, min: 1, max: 64, suffix: 'px' },
  { id: 'opacity', label: 'Opacity', value: 100, min: 0, max: 100, suffix: '%' },
  { id: 'spacing', label: 'Spacing', value: 1.5, min: 0, max: 10, step: 0.5 },
  { id: 'angle', label: 'Angle', value: 0, min: -180, max: 180, suffix: 'deg' },
] as const;

export { LABELLED_NUMBERS };
