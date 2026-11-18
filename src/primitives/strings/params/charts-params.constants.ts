/* @layer renderer-components @kind data */
const CHARTS_PARAMS = {
  otherCount: ['label', 'count'],
  segmentTip: ['label', 'value', 'percent'],
  barSummary: ['label', 'parts'],
  sparklineSummary: ['label', 'latest', 'low', 'high'],
  sparklineEmpty: ['label'],
} as const;

export { CHARTS_PARAMS };
