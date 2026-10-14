/* @layer stories @kind constants */
const CAROUSEL_STRINGS = {
  slide: 'slide',
  carousel: 'carousel',
  previous: 'Previous slide',
  next: 'Next slide',
  stop: 'Stop turning',
  start: 'Start turning',
  pick: 'Slides',
  show: (label: string) => `Show ${label}`,
  position: (at: number, count: number, label: string) => `${at} of ${count}: ${label}`,
} as const;

export { CAROUSEL_STRINGS };
