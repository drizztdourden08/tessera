/* @layer renderer-components @kind data */
const CHART_STRINGS = {
  meter: 'Meter',
  rising: 'Rising',
  falling: 'Falling',
  steady: 'Steady',
  other: 'Other',
  free: 'Free',
  otherCount: (label: string, count: number) => `${label} (${count})`,
  segmentTip: (label: string, value: string, percent: string) => `${label}: ${value}, ${percent}`,
  barSummary: (label: string, parts: readonly string[]) => `${label}: ${parts.join(', ')}`,
  sparklineSummary: (label: string, latest: string, low: string, high: string) => `${label}: latest ${latest}, low ${low}, high ${high}`,
  sparklineEmpty: (label: string) => `${label}: no samples yet`,
};

export { CHART_STRINGS };
