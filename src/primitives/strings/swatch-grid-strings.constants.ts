/* @layer renderer-components @kind data */
const SWATCH_GRID_STRINGS = {
  name: (name: string, index: number) => `${name}, index ${index}`,
  secondary: 'secondary',
  transparent: 'Transparent',
  moved: (name: string, index: number) => `${name} moved to index ${index}`,
  moveHint: 'Arrows move focus. Shift with an arrow extends the range. Alt with an arrow moves the swatch.',
  empty: 'No colours yet.',
};

export { SWATCH_GRID_STRINGS };
