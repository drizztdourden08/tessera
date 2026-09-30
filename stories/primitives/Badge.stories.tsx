/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Badge, Box, Flex, Icon, IconButton, Text } from '../../src/primitives';
import type { BadgeAnchor, BadgeColor } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis, VariantGrid } from '../_template/VariantGrid';

type BadgeArgs = {
  variant: 'inline' | 'number' | 'dot';
  value: string;
  max: number;
  color: BadgeColor;
  translucent: boolean;
  anchored: boolean;
  anchor: BadgeAnchor;
};

const COLORS: readonly BadgeColor[] = ['normal', 'tame', 'success', 'warning', 'danger', 'info', 'primary', 'secondary', 'tertiary'];

const ANCHORS: readonly BadgeAnchor[] = ['top-end', 'bottom-end', 'top-start', 'bottom-start'];

const LOOKS = ['inline', 'number', 'dot', 'translucent'] as const;

const BELL = <Icon name="bell" size={20} />;

const ARGS: Partial<BadgeArgs> = {
  variant: 'number', value: '7', max: 99, color: 'normal', translucent: false, anchored: true, anchor: 'top-end',
};

const ARG_TYPES: StoryLiteArgTypes<BadgeArgs> = {
  variant: { control: 'select', options: ['inline', 'number', 'dot'] },
  value: { control: 'text', description: 'Letters and digits only. A number above max shows as max+.' },
  max: { control: 'number' },
  color: { control: 'select', options: [...COLORS] },
  translucent: { control: 'boolean', description: 'Lets a little of what is behind show through.' },
  anchored: { control: 'boolean', description: 'Pins a number or a dot to the corner of an icon.' },
  anchor: { control: 'select', options: [...ANCHORS] },
};

const meta = {
  title: 'Primitives · Display/Badge',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BadgeArgs>;

const shownValue = (raw: string): number | string => (/^\d+$/.test(raw) ? Number(raw) : raw);

const PlaygroundBadge = (props: { args: BadgeArgs }) => {
  const { variant, value, max, color, translucent, anchored, anchor } = props.args;
  if (variant === 'inline') {
    return <Text>Players <Badge variant="inline" value={shownValue(value)} max={max} color={color} translucent={translucent} /></Text>;
  }
  const host = anchored ? BELL : undefined;
  if (variant === 'dot') return <Badge variant="dot" color={color} translucent={translucent} anchor={anchor}>{host}</Badge>;
  return <Badge value={shownValue(value)} max={max} color={color} translucent={translucent} anchor={anchor}>{host}</Badge>;
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <PlaygroundBadge args={args} />,
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Shapes = {
  name: 'One character is a circle, more make a pill',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">inline, after text</Text>
      <Flex gap="md" align="center" wrap>
        <Text>Hints <Badge variant="inline" value={3} /></Text>
        <Text>Item log <Badge variant="inline" value={214} /></Text>
        <Text>Saves <Badge variant="inline" value={1500} max={999} /></Text>
      </Flex>
      <Text className="story-label">number, on its own</Text>
      <Flex gap="md" align="center" wrap>
        <Badge value={3} />
        <Badge value="A" />
        <Badge value={42} />
        <Badge value={120} max={99} />
      </Flex>
      <Text className="story-label">number and dot, anchored to an icon</Text>
      <Flex gap="xl" align="center" wrap>
        <Badge value={3}>{BELL}</Badge>
        <Badge value={42}><Icon name="mail" size={20} /></Badge>
        <Badge value={120} max={99}><Icon name="message-square" size={20} /></Badge>
        <Badge variant="dot"><Icon name="users" size={20} /></Badge>
      </Flex>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Colors = {
  name: 'Every colour',
  render: () => (
    <VariantGrid
      rows={axis(COLORS)}
      columns={axis(LOOKS)}
      cell={(color, look) => {
        if (look === 'inline') return <Badge variant="inline" value={12} color={color} />;
        if (look === 'dot') return <Badge variant="dot" color={color} />;
        return <Badge value={look === 'translucent' ? 5 : 8} color={color} translucent={look === 'translucent'} />;
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Anchors = {
  name: 'Anchors',
  render: () => (
    <VariantGrid
      rows={axis(ANCHORS)}
      columns={axis(['number', 'dot', 'icon button'] as const)}
      cell={(anchor, look) => {
        if (look === 'dot') return <Badge variant="dot" color="success" anchor={anchor}>{BELL}</Badge>;
        if (look === 'number') return <Badge value={4} anchor={anchor}>{BELL}</Badge>;
        return (
          <Badge value={12} color="primary" anchor={anchor}>
            <IconButton label="Notifications, 12 unread"><Icon name="bell" size={16} /></IconButton>
          </Badge>
        );
      }}
    />
  ),
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Overview = overviewStory({
  component: 'Badge',
  description: 'A count or a dot attached to something: the number of hints on a tab, the unread messages on a bell, a dot that says something new is there. inline sits after text on a soft fill, number is a solid count, and dot is a plain dot. One character draws a perfect circle and more characters stretch it into a pill of the same height. value takes digits or letters, never spaces or symbols, and max caps a number, so 120 with max 99 reads 99+. A number or a dot wraps its host, such as an icon, and sits on the corner that anchor names. normal, a pastel red, is the default colour; tame is the quiet one, then the urgencies and the theme colours, and translucent lets a little of the host show through.',
  playground: Playground,
  variants: [Shapes, Colors, Anchors],
  code: `import { Badge, Icon } from '@drizztdourden08/tessera';

<Badge variant="inline" value={3} color="tame" />

<Badge value={unread} max={99}>
  <Icon name="bell" size={20} />
</Badge>

<Badge variant="dot" anchor="bottom-end">
  <Icon name="users" size={20} />
</Badge>`,
});

export default meta;
export { Anchors, Colors, Overview, Playground, Shapes };
