/* @layer renderer-components @kind data */
const SCRUB_RULER_STRINGS = {
  label: 'Ruler',
  valueText: (index: number, count: number) => `Frame ${index + 1} of ${count}`,
  clearBand: 'Clear range',
};

export { SCRUB_RULER_STRINGS };
