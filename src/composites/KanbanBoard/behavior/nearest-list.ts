/* @layer renderer-components @kind util */
const gapAcross = (list: HTMLElement, x: number): number => {
  const box = list.getBoundingClientRect();
  return Math.max(box.left - x, x - box.right, 0);
};

const gapDown = (list: HTMLElement, y: number): number => {
  const box = list.getBoundingClientRect();
  return Math.max(box.top - y, y - box.bottom, 0);
};

const closer = (list: HTMLElement, best: HTMLElement, point: { x: number; y: number }): boolean => {
  const across = gapAcross(list, point.x) - gapAcross(best, point.x);
  return across < 0 || (across === 0 && gapDown(list, point.y) < gapDown(best, point.y));
};

const nearestList = (lists: readonly HTMLElement[], x: number, y: number): HTMLElement | undefined =>
  lists.reduce<HTMLElement | undefined>((best, list) => (best === undefined || closer(list, best, { x, y }) ? list : best), undefined);

export { nearestList };
