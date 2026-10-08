/* @layer renderer-components @kind data */
import type { ComponentUsage } from '../../guide/usage.type';

const usage = {
  job: 'Puts its children in the middle on both axes, such as initials in an avatar, an icon in a tile or a message in an empty pane.',
  useWhen: [
    'One item or a short group sits in the middle of a box, such as a waiting message in an empty area.',
    'Initials or an icon sit in the middle of a round or square badge.',
  ],
  avoidWhen: [
    { case: 'The items line up along a column from the top.', use: 'Stack' },
    { case: 'The items sit side by side from the start of a row.', use: 'Inline' },
    { case: 'Only one axis is centred, or the alignment changes at run time.', use: 'Flex' },
  ],
  rules: [
    'Give it a size, through a class or its parent, so there is room to centre in; it fits its content otherwise.',
    'direction defaults to row; set column to stack a title over its message in the middle.',
    'Set inline to sit it in a line of text, sized to its content, such as initials in an avatar.',
    'It is a Flex with align and justify fixed to center and takes every other Flex prop, such as gap, as and className.',
  ],
  a11y: [
    'It adds no role; set as to the element the content needs, such as section for an empty pane with a heading.',
    'Centring changes only the look, so the reading order stays the order of the children.',
  ],
  tree: {
    path: ['layout', 'items in a row or a column'],
    rule: 'Center puts its children in the middle of its box on both axes, with the gap and direction of a Flex.',
  },
  example: `import { Center, Text } from '@drizztdourden08/tessera';

const LobbyWaiting = () => (
  <Center direction="column" gap="sm" className="lobby-empty">
    <Text variant="title">Lobby</Text>
    <Text variant="subtitle">Waiting for the host to start the session</Text>
  </Center>
);
`,
  propsHash: '6fce93c922c84fb7',
} satisfies ComponentUsage;

export { usage };
