/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Button, Icon, Inline, Status, Tag, Text } from '../../src/primitives';
import type { FlexAlign, FlexJustify, SpaceToken } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';

type InlineArgs = {
  gap: SpaceToken;
  align: FlexAlign;
  justify: FlexJustify;
  wrap: boolean;
};

const GAPS: readonly SpaceToken[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const TAGS = ['Randomizer', 'Multiworld', 'Glitchless', 'Keysanity'];

const ARGS: Partial<InlineArgs> = { gap: 'sm', align: 'center', justify: 'start', wrap: false };

const ARG_TYPES: PlaygroundArgTypes<InlineArgs> = {
  gap: { group: 'Layout', control: 'select', options: [...GAPS] },
  align: { group: 'Layout', control: 'select', options: ['start', 'center', 'end', 'stretch', 'baseline'] },
  justify: { group: 'Layout', control: 'select', options: ['start', 'center', 'end', 'between', 'around'] },
  wrap: { group: 'Layout', control: 'boolean' },
};

const meta = {
  title: 'Primitives · Layout/Inline',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<InlineArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Inline gap={args.gap} align={args.align} justify={args.justify} wrap={args.wrap}>
      <Icon name="gamepad-2" size={20} />
      <Text variant="title">Session 4</Text>
      <Status tone="success" dot>Connected</Status>
      <Button size="sm" variant="secondary">Leave</Button>
    </Inline>
  ),
} satisfies PlaygroundStory<InlineArgs>;

const GapScale = {
  name: 'Gap scale',
  render: () => (
    <Demonstrator
      rows={axis(GAPS)}
      cell={(gap) => (
        <Inline gap={gap}>
          {TAGS.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        </Inline>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<InlineArgs>;

const Header = {
  name: 'A row with its action at the end',
  render: () => (
    <Inline justify="between" className="story-column">
      <Inline gap="xs">
        <Icon name="folder" />
        <Text>Saves</Text>
      </Inline>
      <Button size="sm" variant="ghost">Open folder</Button>
    </Inline>
  ),
} satisfies StoryLiteStoryDefinition<InlineArgs>;

const Overview = overviewStory({
  component: 'Inline',
  description: 'A row of children side by side with even space between them, such as an icon and its label, a set of tags or a title with its actions.',
  points: [
    '`gap` takes a space token and defaults to `sm`.',
    '`align` sets how the children sit across the row and defaults to `center`, so an icon lines up with its text.',
    'It is a [Flex] fixed to the row direction, so it takes every other Flex prop, such as `justify` and `wrap`.',
  ],
  instead: '[Stack] for a column.',
  playground: Playground,
  variants: [GapScale, Header],
});

export default meta;
export { GapScale, Header, Overview, Playground };
