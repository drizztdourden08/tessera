/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row of colour swatches that shows one ramp, from dark to light or step to step, with a caption on each step and one picked.',
  useWhen: [
    'A palette editor shows a ramp of shades and the user picks one step to edit or assign.',
    'A ramp needs a large preview row above or beside the colour it builds, with the step number on every swatch.',
  ],
  avoidWhen: [
    { case: 'The user picks one colour from a loose set that is not an ordered ramp.', use: 'ChoiceGrid' },
    { case: 'A single colour is shown or picked, with no row of steps.', use: 'ColorSwatch' },
  ],
  rules: [
    'Pass steps, value and onChange; the app keeps the picked index. value is null when no step is picked.',
    'Each step has a color, and optionally a caption, a label, unused and disabled. The caption shows on the swatch; label names the step to readers and as its tooltip, and falls back to the colour.',
    'numbered true captions every step without its own caption with its place in the ramp, starting at 1.',
    'size sm and md keep each swatch at the control height. preview stretches the steps over the full width as tall blocks, for a ramp you want to read at a glance.',
    'The left and right arrow keys, Home and End move to the next open step and pick it. Tab enters on the picked step.',
  ],
  a11y: [
    'The strip is a radio group named by aria-label; each step is a radio named by its label or colour.',
    'Selection is shown by an outline, not by colour alone.',
  ],
  tree: {
    path: ['a value the user sets', 'a colour from a ramp of steps'],
    rule: 'RampStrip is the ordered row of shades of one ramp, with a caption on each step.',
  },
  example: `import { useState } from 'react';
import { RampStrip } from '@drizztdourden08/tessera';

const steps = [{ color: '#1b2a41' }, { color: '#324a5f' }, { color: '#4f7cac' }, { color: '#9ec1de' }];

const Ramp = () => {
  const [step, setStep] = useState<number | null>(1);
  return <RampStrip aria-label="Blue ramp" steps={steps} value={step} onChange={setStep} numbered size="preview" />;
};
`,
  propsHash: 'dd636f249d0ae649',
} satisfies ComponentUsage;

export { usage };
