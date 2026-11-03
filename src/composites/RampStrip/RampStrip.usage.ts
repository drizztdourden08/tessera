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
    'To pick several steps, pass selected, a set of indexes, and onSelectionChange; a click picks one, Shift extends the range from the picked step, and Ctrl or Command adds or removes one. value still names the main step and onChange still runs on a plain click.',
    'With selected the strip is a group of toggle buttons and not a radio group, and an arrow key moves to one step and selects only it.',
    'A step takes marks, small corner indicators such as a dot or a letter, either a list or an object keyed top-start, top-end, bottom-start or bottom-end; they take their colour from the swatch.',
    'Pass onSwatchDragStart(index, event) to make every step draggable; set the payload on event.dataTransfer there.',
    'Pass swatchMenu(index) to give each step a context menu of menu items, opened by a right click, a long press or the menu key; return an empty list for a step with none.',
    'Pass onStepClick(index, event) and onStepDoubleClick(index, event) to react to a click or a double click on a step; onStepClick runs after the pick.',
    'Pass stepData(index) to put data attributes on a step; write each key with its data- prefix, such as data-slot.',
    'Pass selectionKeys false to turn off the built-in arrow, Home and End keys, so the app can own the keyboard; Tab still enters on the picked step.',
    'Pass wrap to let the steps flow onto more lines when the row is full.',
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
  propsHash: '45e54d5cc32cad68',
} satisfies ComponentUsage;

export { usage };
