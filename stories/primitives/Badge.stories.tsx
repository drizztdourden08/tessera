/* @layer stories @kind story */
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Badge, Flex, Icon, IconButton, Text } from '../../src/primitives';
import type { BadgeAnchor, BadgeColor } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';

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

const ARG_TYPES: PlaygroundArgTypes<BadgeArgs> = {
  value: { group: 'Content', control: 'text', description: 'Letters and digits only. A number above max shows as max+.' },
  max: { group: 'Value', control: 'number' },
  variant: { group: 'Appearance', control: 'select', options: ['inline', 'number', 'dot'] },
  color: { group: 'Appearance', control: 'select', options: [...COLORS] },
  translucent: { group: 'Appearance', control: 'boolean', description: 'Lets a little of what is behind show through.' },
  anchored: { group: 'Layout', control: 'boolean', description: 'Pins a number or a dot to the corner of an icon.' },
  anchor: { group: 'Layout', control: 'select', options: [...ANCHORS] },
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
} satisfies PlaygroundStory<BadgeArgs>;

const SHAPES: Readonly<Record<string, ReactNode>> = {
  'inline, after text': (
    <Flex gap="md" align="center" wrap>
      <Text>Hints <Badge variant="inline" value={3} /></Text>
      <Text>Item log <Badge variant="inline" value={214} /></Text>
      <Text>Saves <Badge variant="inline" value={1500} max={999} /></Text>
    </Flex>
  ),
  'number, on its own': (
    <Flex gap="md" align="center" wrap>
      <Badge value={3} />
      <Badge value="A" />
      <Badge value={42} />
      <Badge value={120} max={99} />
    </Flex>
  ),
  'number and dot, anchored to an icon': (
    <Flex gap="xl" align="center" wrap>
      <Badge value={3}>{BELL}</Badge>
      <Badge value={42}><Icon name="mail" size={20} /></Badge>
      <Badge value={120} max={99}><Icon name="message-square" size={20} /></Badge>
      <Badge variant="dot"><Icon name="users" size={20} /></Badge>
    </Flex>
  ),
};

const Shapes = {
  name: 'One character is a circle, more make a pill',
  render: () => <Demonstrator rows={axis(Object.keys(SHAPES))} cell={(shape) => SHAPES[shape]} />,
} satisfies StoryLiteStoryDefinition<BadgeArgs>;

const Colors = {
  name: 'Every colour',
  render: () => (
    <Demonstrator
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
    <Demonstrator
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
  description: 'A count or a dot attached to something, such as the unread messages on a bell or a dot that says something is new.',
  points: [
    '`inline` sits after text, `number` is a solid count on a corner of its host, and `dot` is a plain dot.',
    'A `number` or a `dot` wraps its host, such as an icon; `anchor` picks the corner.',
    '`max` caps a count, so 120 with a `max` of 99 reads 99+.',
    '**It renders nothing** when the value is empty or a count is below 0.',
    '`normal`, a pastel red, is the default colour; `tame` is the quiet one.',
  ],
  instead: '[Status] for a word that names a state, or [Tag] for a group.',
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
