/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A small icon button that puts one changed setting back to its default, named after the setting.',
  useWhen: [
    'A row shows a setting that can differ from its default and the user may want to undo the change.',
    'A custom row head needs the same reset button as FormRow and OptionRow.',
  ],
  avoidWhen: [
    { case: 'A whole form or panel resets at once.', use: 'ActionBar' },
  ],
  rules: [
    'Pass the name of the setting as label; the button and its tooltip read Reset followed by that name.',
    'Pass changed so the button shows only while the value differs from its default.',
    'It renders nothing without onReset, so a read only row needs no condition around it.',
  ],
  a11y: [
    'The button is named by its label and shows the same name as a tooltip.',
  ],
  tree: {
    path: ['actions', 'one action', 'puts a changed setting back to its default'],
    rule: 'ResetButton gives every settings row the same reset icon, name and tooltip.',
  },
  example: `import { ResetButton } from '@drizztdourden08/tessera';

const VolumeReset = ({ changed, onReset }: { changed: boolean; onReset: () => void }) => (
  <ResetButton label="Volume" changed={changed} onReset={onReset} />
);
`,
  propsHash: '2e50df01f671866b',
} satisfies ComponentUsage;

export { usage };
