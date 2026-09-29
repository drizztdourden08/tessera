/* @layer renderer-components @kind logic */
const pointerFraction = (clientX: number, rect: DOMRect): number => {
  if (rect.width <= 0) return 0;
  return Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
};

export { pointerFraction };
