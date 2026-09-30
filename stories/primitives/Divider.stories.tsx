/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Button, Divider, Flex, Stack, StatRow, Text } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './Divider.stories.css';

type DividerArgs = {
  orientation: 'horizontal' | 'vertical';
};

const ARGS: Partial<DividerArgs> = { orientation: 'horizontal' };

const ARG_TYPES: StoryLiteArgTypes<DividerArgs> = {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
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
} satisfies StoryLiteStoryDefinition<DividerArgs>;

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
  description: 'A one pixel rule in the border colour that separates groups: settings in a list, buttons in a toolbar. Horizontal, the default, spans the full width of its container. Vertical stretches to the height of the row it sits in, so it needs a flex row around it. It carries the separator role.',
  playground: Playground,
  variants: [InContext],
  code: CODE,
});

export default meta;
export { InContext, Overview, Playground };
