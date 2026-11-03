/* @layer renderer-components @kind util */
const segmentButtonClass = (active: boolean, mixed: boolean): string =>
  ['segmented__btn', 'focus-ring-inset', active && 'segmented__btn--active', mixed && 'segmented__btn--mixed'].filter(Boolean).join(' ');

export { segmentButtonClass };
