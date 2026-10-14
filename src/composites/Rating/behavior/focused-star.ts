/* @layer renderer-components @kind logic */
const focusedStar = (target: EventTarget | null, fallback: number): number => {
  const star = target !== null && 'dataset' in target ? Number((target as HTMLElement).dataset.star) : Number.NaN;
  return Number.isInteger(star) && star > 0 ? star : fallback;
};

export { focusedStar };
