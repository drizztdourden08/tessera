/* @layer renderer-components @kind logic */
/** 0 to 1 over a span of milliseconds, easing in and out (smoothstep), so a blend starts and lands softly. */
const easeWeight = (elapsed: number, span: number): number => {
  if (span <= 0 || elapsed >= span) return 1;
  if (elapsed <= 0) return 0;
  const t = elapsed / span;
  return t * t * (3 - 2 * t);
};

export { easeWeight };
