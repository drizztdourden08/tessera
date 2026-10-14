/* @layer renderer-components @kind data */
const CAROUSEL_STRINGS = {
  carousel: 'carousel',
  slide: 'slide',
  slides: 'Slides',
  previous: 'Previous slide',
  next: 'Next slide',
  stop: 'Stop turning',
  start: 'Start turning',
  show: (label: string) => `Show ${label}`,
  position: (at: number, count: number, label: string) => `${at} of ${count}: ${label}`,
};

export { CAROUSEL_STRINGS };
