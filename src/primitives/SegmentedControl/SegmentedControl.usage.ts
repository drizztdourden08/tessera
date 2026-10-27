/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row of joined buttons that picks one value out of a few, with a highlight that slides to the active one.',
  useWhen: [
    'A short setting has a few choices that all fit on one line, such as a scale or an alignment.',
    'The choices are modes of one view, and the user switches between them often.',
  ],
  avoidWhen: [
    { case: 'The choices are many or have long labels.', use: 'Select' },
    { case: 'Each choice needs a sentence of help.', use: 'RadioGroup' },
    { case: 'Several choices can be on at once.', use: 'ToggleGroup' },
  ],
  rules: [
    'Give each option a value and either a label or an icon.',
    'An icon option takes a hint, and its label reads from it; the icon is a name from the set or any node, such as a pixel icon or a Glyph.',
    'A node passed as icon is drawn as given, so size and colour it yourself; a name is sized by the control.',
    'Pass onDeselect to let a second press on the active option clear the value.',
    'selectedTone neutral draws the chosen option on a grey fill; accent, the default, keeps the primary highlight.',
    'An option takes a tooltip with an optional description and shortcut, placed by tooltipPlacement; its name is the label or hint.',
    'A disabled option takes a string that says why.',
  ],
  a11y: [
    'The track is a radio group named by label, with a radio per option and one Tab stop on the chosen one.',
    'The arrow keys, Home and End move and choose; an icon option is named by its title or hint.',
  ],
  tree: {
    path: ['actions', 'several related buttons', 'only one can be on'],
    rule: 'SegmentedControl is the joined row that picks one of a few values.',
  },
  example: `import { useState } from 'react';
import { SegmentedControl } from '@drizztdourden08/tessera';

const ScalePicker = () => {
  const [scale, setScale] = useState('2x');
  return (
    <SegmentedControl
      label="Window scale"
      value={scale}
      onChange={setScale}
      options={[
        { value: '1x', label: '1x' },
        { value: '2x', label: '2x' },
        { value: 'fit', label: 'Fit window' },
      ]}
    />
  );
};
`,
  propsHash: '641b0842a681225c',
} satisfies ComponentUsage;

export { usage };
