/* @layer renderer-components @kind data */
const ICON_EFFECT = {
  every: 3500,
  jitterShare: 0.25,
  minDelay: 120,
  samples: 64,
  design: 24,
  shapes: 'path, circle, ellipse, line, polyline, polygon, rect',
  unpainted: 'defs, clipPath, mask, symbol, pattern, marker',
  pops: {
    twinkle: { d: 'M0 -5.5Q0.45 -0.45 5.5 0Q0.45 0.45 0 5.5Q-0.45 0.45 -5.5 0Q-0.45 -0.45 0 -5.5Z', stroke: 0 },
    glint: { d: 'M-6 6L6 -6', stroke: 1.1 },
    ping: { d: 'M5 0A5 5 0 1 1 -5 0A5 5 0 1 1 5 0Z', stroke: 0.9 },
    burst: { d: 'M0 -2V-5M0 2V5M-2 0H-5M2 0H5M1.4 -1.4L3 -3M-1.4 1.4L-3 3M-1.4 -1.4L-3 -3M1.4 1.4L3 3', stroke: 0.9 },
    dot: { d: 'M1.8 0A1.8 1.8 0 1 1 -1.8 0A1.8 1.8 0 1 1 1.8 0Z', stroke: 0 },
    comet: { d: 'M0 -3.2Q0.3 -0.3 3.2 0Q0.3 0.3 0 3.2Q-0.3 0.3 -3.2 0Q-0.3 -0.3 0 -3.2Z', stroke: 0 },
  },
  cometTail: { d: 'M-9 -9L-1.6 -1.6', stroke: 0.9 },
  shimmerStroke: 1.4,
  sweepDash: '0.45 1.1',
  sizes: {
    sm: { grow: 0.7, trail: 4 },
    md: { grow: 1, trail: 6 },
    lg: { grow: 1.45, trail: 9 },
  },
} as const;

export { ICON_EFFECT };
