/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Button, Divider, Flex, Stack, StatRow, Text } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './Divider.stories.css';

type DividerArgs = {
  orientation: 'horizontal' | 'vertical';
};

const ARGS: Partial<DividerArgs> = { orientation: 'horizontal' };

const ARG_TYPES: PlaygroundArgTypes<DividerArgs> = {
    orientation: { group: 'Layout', control: 'select', options: ['horizontal', 'vertical'] },
  };

const meta = {
  title: 'Primitives · Layout/Divider',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DividerArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Flex
      className="divider-demo"
      direction={args.orientation === 'horizontal' ? 'column' : 'row'}
      gap="md"
      align="stretch"
    >
      <Text>Connected players</Text>
      <Divider orientation={args.orientation} />
      <Text>Spectators</Text>
    </Flex>
  ),
} satisfies PlaygroundStory<DividerArgs>;

const InContext = {
  name: 'Horizontal and vertical in context',
  render: () => (
    <Demonstrator
      rows={[{ key: 'horizontal', label: 'horizontal, between settings groups' }, { key: 'vertical', label: 'vertical, between toolbar groups' }]}
      align="stretch"
      cell={(orientation) => (orientation === 'horizontal' ? (
        <Stack className="divider-demo" gap="sm">
          <StatRow label="Profile" value="Speedrun practice" />
          <StatRow label="Controller" value="8BitDo SN30 Pro" />
          <Divider />
          <StatRow label="Audio output" value="Default device" />
          <StatRow label="Volume" value="70%" />
        </Stack>
      ) : (
        <Flex className="divider-demo divider-demo--toolbar" gap="sm" align="center">
          <Button size="sm" variant="ghost">Load</Button>
          <Button size="sm" variant="ghost">Save</Button>
          <Divider orientation="vertical" />
          <Button size="sm" variant="ghost">Reset</Button>
          <Divider orientation="vertical" />
          <Text variant="caption">Slot 3</Text>
        </Flex>
      ))}
    />
  ),
} satisfies StoryLiteStoryDefinition<DividerArgs>;

const CODE = `import { Button, Divider, Flex, Text } from '@drizztdourden08/tessera';

<Flex direction="column" gap="md">
  <Text>Connected players</Text>
  <Divider />
  <Text>Spectators</Text>
</Flex>

<Flex gap="sm" align="center">
  <Button size="sm" variant="ghost">Save</Button>
  <Divider orientation="vertical" />
  <Button size="sm" variant="ghost">Reset</Button>
</Flex>`;

const Overview = overviewStory({
  component: 'Divider',
  description: 'A thin rule that separates groups, such as settings in a list or buttons in a toolbar.',
  points: [
    '`horizontal`, the default, spans the full width of its container.',
    '`vertical` stretches to the height of its row, so it needs a flex row around it.',
    'It carries the separator role for screen readers.',
  ],
  playground: Playground,
  variants: [InContext],
  code: CODE,
});

export default meta;
export { InContext, Overview, Playground };
