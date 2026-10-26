/* @layer renderer-components @kind util */
const gapTo = (list: HTMLElement, x: number): number => {
  const box = list.getBoundingClientRect();
  return Math.max(box.left - x, x - box.right, 0);
};

const nearestList = (lists: readonly HTMLElement[], x: number): HTMLElement | undefined =>
  lists.reduce<HTMLElement | undefined>((best, list) => (best === undefined || gapTo(list, x) < gapTo(best, x) ? list : best), undefined);

export { nearestList };
