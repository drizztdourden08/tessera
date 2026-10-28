/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'An angle in degrees, set by dragging a dial or typing a number, that snaps to 15, 22.5 or 45 degrees and wraps at a full turn.',
  useWhen: [
    'An editor rotates a sprite, a selection or a brush, and the user wants to point the angle and also type it.',
    'The angle should land on round steps, such as 15 degrees for a rotation or 45 for a direction.',
  ],
  avoidWhen: [
    { case: 'The value is any other number, such as a size or an offset.', use: 'NumberField' },
    { case: 'The user picks one of nine places on a box.', use: 'AnchorPicker' },
  ],
  rules: [
    'Pass value in degrees and onChange; the app keeps the value. The value stays from 0 up to but not including 360, so 370 becomes 10 and a step below 0 becomes 345 or 359.',
    '0 points to the right and the angle grows clockwise on screen.',
    'snap is the degrees to round to, usually 15, 22.5 or 45. The dial rounds to it, and the wheel and the arrow keys step by it. Leave it out for whole degrees.',
    'Shift while dragging the dial drops the snap, and Shift with the wheel or the arrow keys steps one degree.',
    'dial false leaves the dial out and keeps the number with its wheel and keys.',
    'label, size, disabled and mixed work as on NumberField. mixed shows Mixed and hides the needle; the next angle clears it in the app.',
  ],
  a11y: [
    'The number field is the control readers use; it is named by label or aria-label and shows the degree sign.',
    'The dial is for pointers only and is hidden from readers; the arrow keys and the wheel do the same job.',
  ],
  tree: {
    path: ['a value the user sets', 'free text or a number', 'a number stepped up or down'],
    rule: 'AngleField is the angle you point with a dial and also type, snapped to round steps.',
  },
  example: `import { useState } from 'react';
import { AngleField } from '@drizztdourden08/tessera';

const Rotation = () => {
  const [angle, setAngle] = useState(45);
  return <AngleField label="Rotation" snap={15} value={angle} onChange={setAngle} />;
};
`,
  propsHash: 'a9d2e9696afb7a04',
} satisfies ComponentUsage;

export { usage };
