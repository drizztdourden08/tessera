/* @layer renderer-components @kind data */
const ICON_EFFECT = {
  every: 3500,
  jitterShare: 0.25,
  minDelay: 120,
  samples: 64,
  trail: 6,
  design: 24,
  shapes: 'path, circle, ellipse, line, polyline, polygon, rect',
  unpainted: 'defs, clipPath, mask, symbol, pattern, marker',
  pops: {
    twinkle: { d: 'M0 -5.5Q1 -1 5.5 0Q1 1 0 5.5Q-1 1 -5.5 0Q-1 -1 0 -5.5Z', stroke: 0 },
    glint: { d: 'M-6 6L6 -6', stroke: 2 },
    ping: { d: 'M5 0A5 5 0 1 1 -5 0A5 5 0 1 1 5 0Z', stroke: 1.5 },
    burst: { d: 'M0 -2V-5M0 2V5M-2 0H-5M2 0H5M1.4 -1.4L3 -3M-1.4 1.4L-3 3M-1.4 -1.4L-3 -3M1.4 1.4L3 3', stroke: 1.5 },
    dot: { d: 'M2.5 0A2.5 2.5 0 1 1 -2.5 0A2.5 2.5 0 1 1 2.5 0Z', stroke: 0 },
  },
  shimmerStroke: 2.5,
  sweepDash: '0.45 1.1',
} as const;

export { ICON_EFFECT };
