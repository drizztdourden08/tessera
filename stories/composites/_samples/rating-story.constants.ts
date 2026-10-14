/* @layer stories @kind data */
const RATING_PANEL = {
  title: 'Ratings',
  average: 4.6,
  countLine: '212 ratings',
  rows: ['5', '4', '3', '2', '1'],
  counts: [124, 60, 18, 6, 4],
  mine: 'Your rating',
  remove: 'Remove my rating',
  barLabel: (stars: number, count: number) => `${stars} stars: ${count}`,
} as const;

const RATING_CODE = `import { Rating } from '@drizztdourden08/tessera';

<Rating value={4.6} count={212} showValue />

<Rating value={myRating} size="lg" onChange={rate} disabled={busy} />`;

export { RATING_CODE, RATING_PANEL };
