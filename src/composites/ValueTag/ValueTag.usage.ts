/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A read only value of an option: a tag for text and numbers, a True or False pill for a switch, with an optional label before it.',
  useWhen: [
    'A view shows the options of a game or preset without letting the user change them.',
    'An OptionRow control column shows the chosen value instead of an input.',
  ],
  avoidWhen: [
    { case: 'The tag is a label the user can click or remove.', use: 'Tag' },
    { case: 'The value is a state with a tone, such as running or failed.', use: 'Status' },
  ],
  rules: [
    'Pass a boolean to get the True or False pill, and a string or a number to get a plain tag.',
    'Pass label for the name of the value, written before the tag.',
    'Pass compact for the narrow form: the label is smaller and breaks anywhere.',
  ],
  a11y: [
    'The value is written as text, not shown by colour alone.',
  ],
  buildingBlock: true,
  example: `import { ValueTag } from '@drizztdourden08/tessera';

const Shuffle = () => <ValueTag value label="Shuffle" />;
`,
  propsHash: '8c558007f2043285',
} satisfies ComponentUsage;

export { usage };
