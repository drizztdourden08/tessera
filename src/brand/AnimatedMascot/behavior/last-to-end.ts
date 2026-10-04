/* @layer renderer-components @kind logic */
const endOf = (animation: Animation): number => Number(animation.effect?.getComputedTiming().endTime ?? 0);

const lastToEnd = (animations: readonly Animation[]): Animation | undefined =>
  animations.reduce<Animation | undefined>((last, animation) => (last && endOf(last) >= endOf(animation) ? last : animation), undefined);

export { lastToEnd };
