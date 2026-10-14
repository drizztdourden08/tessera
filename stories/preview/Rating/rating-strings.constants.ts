/* @layer stories @kind constants */
const RATING_STRINGS = {
  label: 'Rating',
  pickLabel: 'Your rating',
  none: 'Not rated yet',
  outOf: (value: string, max: number) => `${value} out of ${max}`,
  from: (count: number) => (count === 1 ? 'from 1 rating' : `from ${count} ratings`),
  star: (n: number) => (n === 1 ? '1 star' : `${n} stars`),
} as const;

export { RATING_STRINGS };
