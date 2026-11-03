/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { ResetButton } from '../../src/composites';
import { Flex, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type ResetButtonArgs = {
  label: string;
  changed: boolean;
};

const ARG_TYPES: PlaygroundArgTypes<ResetButtonArgs> = {
  label: { group: 'Content', control: 'text', description: 'The name of the setting; the button reads Reset followed by it.' },
  changed: { group: 'State', control: 'boolean', description: 'The button shows only while the value differs from its default.' },
};

const meta = {
  title: 'Composites · Actions/ResetButton',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ResetButtonArgs>;

const noop = () => undefined;

const Playground = {
  name: 'Playground',
  args: { label: 'Volume', changed: true },
  argTypes: ARG_TYPES,
  render: (args) => <ResetButton label={args.label} changed={args.changed} onReset={noop} />,
} satisfies PlaygroundStory<ResetButtonArgs>;

const InARow = {
  name: 'Beside a setting name',
  render: () => (
    <Flex gap="xs" align="center">
      <Text>Volume</Text>
      <ResetButton label="Volume" changed onReset={noop} />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<ResetButtonArgs>;

const Overview = overviewStory({
  component: 'ResetButton',
  description: 'A small icon button that puts one changed setting back to its default.',
  points: [
    '`label` is the name of the setting; the button and its tooltip read Reset and that name.',
    '`changed` shows the button only while the value differs from its default.',
    'It renders nothing without `onReset`, so a read only row needs no condition around it.',
    'It is an xs ghost [IconButton] with the rotate icon, the same in every row.',
    '[FormRow] and [OptionRow] use it in their heads, before the Changed status.',
  ],
  instead: '[ActionBar] when a whole panel resets at once.',
  playground: Playground,
  variants: [InARow],
  states: {
    render: (props: StateProps) => <ResetButton label="Volume" changed onReset={noop} {...props} />,
    list: [STATE.idle, { ...STATE.hover, target: 'button' }, { ...STATE.focus, target: 'button' }],
  },
});

export default meta;
export { InARow, Overview, Playground };
