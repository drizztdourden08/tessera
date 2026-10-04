/* @layer renderer-components @kind logic */
const gaugeFraction = (value: number, min: number, max: number): number => {
  if (!Number.isFinite(value) || max <= min) return 0;
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
};

export { gaugeFraction };
