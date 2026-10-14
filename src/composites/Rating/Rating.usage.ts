/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row of stars that shows how well something is rated, to the nearest half star, with the number and the count; with onChange it is the picker a person rates with.',
  useWhen: [
    'A store card, an item page or a list shows the average rating of a pack, a preset or a world.',
    'A person gives their own rating, such as Your rating on an item page.',
  ],
  avoidWhen: [
    { case: 'The number is picked on a track, such as a volume.', use: 'Slider' },
    { case: 'One of a few named options is picked.', use: 'SegmentedControl' },
    { case: 'A label sits beside a value that is not a score.', use: 'StatRow' },
  ],
  rules: [
    'Pass the average as value; pass null when nobody has rated yet, never 0, so the stars fade and read Not rated yet.',
    'Pass count for the number of ratings and showValue for the average beside the stars, such as 4.6 (212).',
    'Pass onChange to make it the picker; value is then the whole star the person picked, or null before they pick.',
    'Set disabled on the picker while a rating is being saved.',
    'Use size sm on cards and in rows, md in running text and lg in a ratings panel or for the picker.',
    'Build a ratings panel from Card, ProgressBar, Rating and a Button: the panel is a recipe, not a part.',
  ],
  a11y: [
    'A shown rating is one image with one sentence, such as 4.6 out of 5, from 212 ratings.',
    'The picker is a radio group with a radio per star and one Tab stop; the arrow keys, Home and End move and pick.',
    'label names the picker, Your rating by default, and prefixes the sentence of a shown rating.',
  ],
  tree: {
    path: ['a status, a count or a label', 'a score in stars, or a rating to give'],
    rule: 'Rating shows an average in half stars with its count, and with onChange is the star picker.',
  },
  example: `import { useState } from 'react';
import { Rating } from '@drizztdourden08/tessera';

const PackRating = ({ average, count }: { average: number | null; count: number }) => {
  const [mine, setMine] = useState<number | null>(null);
  return (
    <>
      <Rating value={average} count={count} showValue size="sm" />
      <Rating value={mine} size="lg" onChange={setMine} />
    </>
  );
};
`,
  propsHash: '18e32875f22e7b8c',
} satisfies ComponentUsage;

export { usage };
