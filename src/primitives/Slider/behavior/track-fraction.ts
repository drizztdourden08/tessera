/* @layer renderer-components @kind util */
const trackFraction = (clientX: number, rect: DOMRect): number => {
  const inset = rect.height / 2;
  const span = rect.width - inset * 2;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, (clientX - rect.left - inset) / span));
};

export { trackFraction };
