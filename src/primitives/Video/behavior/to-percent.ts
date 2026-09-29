/* @layer renderer-components @kind logic */
const toPercent = (part: number, whole: number): string => {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return '0%';
  return `${Math.min(100, Math.max(0, (part / whole) * 100))}%`;
};

export { toPercent };
