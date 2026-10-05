/* @layer renderer-components @kind data */
const TOUR_STRINGS = {
  closeTour: 'Close the tour',
  clickToGo: 'Click the highlighted part to go on.',
  waitToGo: 'Do what this step asks to go on.',
  announce: (step: number, total: number, title: string) => `Step ${step} of ${total}: ${title}`,
  nextKey: 'Next step',
  backKey: 'Step back',
};

export { TOUR_STRINGS };
