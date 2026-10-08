/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'A row of children side by side with even space between them, such as an icon and its label, a set of tags or a title with its actions.',
  useWhen: [
    'A few items sit on one line, such as an icon beside its text or a name beside its status.',
    'A title and its actions share a line, with the actions pushed to the far end.',
  ],
  avoidWhen: [
    { case: 'The items run down a column.', use: 'Stack' },
    { case: 'The direction changes at run time, or the row needs a setting Inline does not default.', use: 'Flex' },
    { case: 'The items line up in equal columns across several rows.', use: 'Grid' },
  ],
  rules: [
    'Leave gap at its default of sm for an icon beside its text; pick a larger space token for separate items.',
    'align defaults to center, so an icon lines up with its text; set baseline for words of different sizes.',
    'Set justify to between to push the last item to the far end, and wrap to let a long row flow onto new lines.',
    'It is a Flex fixed to the row direction and takes every other Flex prop, such as as and className.',
  ],
  a11y: [
    'It adds no role; set as to ul or nav when the row is a list or a set of links, so screen readers hear the structure.',
    'The visual order is the reading order, so put the items in the order a keyboard user tabs through them.',
  ],
  tree: {
    path: ['layout', 'items in a row or a column'],
    rule: 'Inline lays its children side by side in a row, with a token gap and the items centred across it.',
  },
  example: `import { Icon, Inline, Status, Text } from '@drizztdourden08/tessera';

const SessionRow = () => (
  <Inline>
    <Icon name="gamepad-2" />
    <Text>Session 4</Text>
    <Status tone="success" dot>Connected</Status>
  </Inline>
);
`,
  propsHash: 'dd0ddca7ec51929e',
} satisfies ComponentUsage;

export { usage };
