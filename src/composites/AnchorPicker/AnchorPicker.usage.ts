/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A three by three grid that picks where something is anchored: a corner, an edge or the centre.',
  useWhen: [
    'A canvas or image is resized and the user says which edge or corner stays put.',
    'A tool aligns or places something against one of nine points, such as a watermark or a label.',
  ],
  avoidWhen: [
    { case: 'The user picks one of a few named options in a row.', use: 'SegmentedControl' },
    { case: 'The user picks one of a short list as radio buttons.', use: 'RadioGroup' },
    { case: 'The user picks a position by dragging.', use: 'Slider' },
  ],
  rules: [
    'The app owns value; the picker calls onChange with one of top-left, top, top-right, left, center, right, bottom-left, bottom or bottom-right.',
    'The default variant dots shows the chosen cell as a filled dot.',
    'The variant arrows shows an arrow in every other cell, pointing away from the chosen one: the look of a canvas resize dialog.',
    'Pass label when the default Anchor does not say what is anchored, such as Keep this edge.',
    'size sm fits a dense panel; md is the default.',
  ],
  a11y: [
    'The grid is a radio group with a radio per cell, named Top left to Bottom right, and one Tab stop on the chosen cell.',
    'The arrow keys move in two dimensions and choose; Home and End go to the start and end of the row, and with Control to the first and last cell.',
  ],
  tree: {
    path: ['a value the user sets', 'one of nine anchor points'],
    rule: 'AnchorPicker picks one of nine anchor points, as an image editor does for canvas resize.',
  },
  example: `import { useState } from 'react';
import { AnchorPicker } from '@drizztdourden08/tessera';
import type { Anchor } from '@drizztdourden08/tessera';

const CanvasAnchor = () => {
  const [anchor, setAnchor] = useState<Anchor>('center');
  return <AnchorPicker label="Anchor" variant="arrows" value={anchor} onChange={setAnchor} />;
};
`,
  propsHash: '753c64a0dac3d4bb',
} satisfies ComponentUsage;

export { usage };
