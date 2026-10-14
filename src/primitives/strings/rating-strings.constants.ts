/* @layer renderer-components @kind data */
const RATING_STRINGS = {
  pickLabel: 'Your rating',
  none: 'Not rated yet',
  outOf: (value: string, max: number) => `${value} out of ${max}`,
  from: (count: number) => (count === 1 ? 'from 1 rating' : `from ${count} ratings`),
  star: (stars: number) => (stars === 1 ? '1 star' : `${stars} stars`),
};

export { RATING_STRINGS };
