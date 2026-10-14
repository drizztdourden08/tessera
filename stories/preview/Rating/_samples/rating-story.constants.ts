/* @layer stories @kind data */
import type { PreviewCardEntry } from '../../_shared/preview-card.type';

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

const RATING_MAPPING: readonly PreviewCardEntry[] = [
  { name: 'RotP Stars, store site', badge: 'Replaced', tone: 'warning', text: 'Shows stars on the store cards, the featured banner, the item page and the browse side card, and lets a player pick their own rating. Six places.' },
  { name: 'RotP Stars, desktop app', badge: 'Replaced', tone: 'warning', text: 'A second copy in the app: stars, the average and the number of ratings, on the store card and the store detail.' },
  { name: 'Slider', badge: 'Not a fit', text: 'Picks a number on a track. A rating is five stars you tap, and showing an average needs no track.' },
  { name: 'SegmentedControl', badge: 'Not a fit', text: 'Lights one option of a few. A rating fills every star up to the one you pick, and shows half stars.' },
  { name: 'Status and StatRow', badge: 'Not a fit', text: 'A coloured word, or a label and a value. Neither draws stars; they would only show 4.6 as text.' },
];

const RATING_CHOICES: readonly PreviewCardEntry[] = [
  {
    name: 'A. Rating, one new part that shows and picks',
    badge: 'Recommended', tone: 'success',
    text: 'Shows an average with half stars, the number and the count; with onChange it becomes the picker, with the arrow keys. RotP drops both of its copies, and any page with reviews can use it.',
  },
  {
    name: 'B. Rating shows only; picking stays in RotP',
    badge: 'Considered',
    text: 'A smaller part with no behaviour. The store site keeps its own picker, so the star drawing lives in two places again.',
  },
  {
    name: 'C. No new part',
    badge: 'Considered',
    text: 'RotP keeps its two Stars copies. Tessera stays smaller, but the next app that shows ratings writes a third.',
  },
];

const RATING_CODE = `import { Rating } from '@drizztdourden08/tessera';

<Rating value={4.6} count={212} showValue />

<Rating value={myRating} size="lg" onChange={rate} disabled={busy} />`;

export { RATING_CHOICES, RATING_CODE, RATING_MAPPING, RATING_PANEL };
