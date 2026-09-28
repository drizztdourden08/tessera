/* @layer renderer-components @kind constants */
const MOUSE_TARGET = 'mouse';

const TOUR_WAITS = { travel: 1, press: 1.1, tap: 0.35, hold: 2, rest: 1.2 } as const;

const CAMERA = { keyMargin: 0.9, overviewMargin: 0.6, maxScale: 3 } as const;

const FALLBACK_TRAVEL_MS = 760;

const MS_PER_SECOND = 1000;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export { CAMERA, FALLBACK_TRAVEL_MS, MOUSE_TARGET, MS_PER_SECOND, REDUCED_MOTION_QUERY, TOUR_WAITS };
