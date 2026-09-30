/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Card, Flex, Stack, Tag, Text } from '../../src/primitives';
import type {
  TagCategoryColor, TagColor, TagLook, TagNormalColor, TagUrgencyColor, TagVariant,
} from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type TagArgs = {
  label: string;
  variant: TagVariant;
  color: TagColor;
  removable: boolean;
  disabled: boolean;
};

const NORMAL: readonly TagNormalColor[] = ['neutral', 'primary', 'secondary', 'tertiary'];

const URGENCY: readonly TagUrgencyColor[] = ['success', 'warning', 'danger', 'info'];

const CATEGORY: readonly TagCategoryColor[] = ['rose', 'orange', 'amber', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'pink'];

const COLORS: Readonly<Record<TagVariant, readonly TagColor[]>> = { normal: NORMAL, urgency: URGENCY, category: CATEGORY };

const GAMES: readonly { name: string; tags: readonly { label: string; look: TagLook }[] }[] = [
  { name: 'A Link to the Past', tags: [{ label: 'Zelda', look: { variant: 'category', color: 'green' } }, { label: 'Stable', look: { variant: 'urgency', color: 'success' } }] },
  { name: 'Super Metroid', tags: [{ label: 'Metroid', look: { variant: 'category', color: 'violet' } }, { label: 'Beta', look: { variant: 'urgency', color: 'warning' } }] },
  { name: 'Pokemon Red', tags: [{ label: 'Pokemon', look: { variant: 'category', color: 'rose' } }, { label: 'Featured', look: { color: 'primary' } }] },
];

const ARGS: Partial<TagArgs> = { label: 'Zelda', variant: 'category', color: 'green', removable: false, disabled: false };

const ARG_TYPES: StoryLiteArgTypes<TagArgs> = {
  label: { control: 'text' },
  variant: { control: 'select', options: ['normal', 'urgency', 'category'] },
  color: { control: 'select', options: [...NORMAL, ...URGENCY, ...CATEGORY], description: 'Only the colours of the variant apply; the types refuse the others.' },
  removable: { control: 'boolean' },
  disabled: { control: 'boolean' },
};

const meta = {
  title: 'Primitives · Display/Tag',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TagArgs>;

const lookOf = (variant: TagVariant, color: TagColor): TagLook => {
  const urgency = URGENCY.find((c) => c === color);
  const category = CATEGORY.find((c) => c === color);
  if (variant === 'urgency') return { variant, color: urgency ?? 'info' };
  if (variant === 'category') return { variant, color: category ?? 'blue' };
  return { variant: 'normal', color: NORMAL.find((c) => c === color) ?? 'neutral' };
};

const noop = () => undefined;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Tag {...lookOf(args.variant, args.color)} disabled={args.disabled} onRemove={args.removable ? noop : undefined}>{args.label}</Tag>
  ),
} satisfies StoryLiteStoryDefinition<TagArgs>;

const Variants = {
  name: 'Three variants, every colour',
  render: () => (
    <Box className="story-column">
      {(['normal', 'urgency', 'category'] as const).map((variant) => (
        <Box key={variant} className="story-row">
          <Text className="story-label">{variant}</Text>
          <Flex gap="xs" wrap>{COLORS[variant].map((color) => <Tag key={color} {...lookOf(variant, color)}>{color}</Tag>)}</Flex>
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TagArgs>;

const Removable = {
  name: 'Removable, as in a tag field',
  render: () => (
    <Flex gap="md" align="center" wrap>
      <Tag onRemove={noop}>game:links-awakening</Tag>
      <Tag color="primary" onRemove={noop}>Ocarina of Time</Tag>
      <Tag variant="urgency" color="warning" title="Tags read namespace:value, such as game:zelda." onRemove={noop}>speedrun</Tag>
      <Tag onRemove={noop} disabled>mode:open</Tag>
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<TagArgs>;

const SelectableRow = () => {
  const [picked, setPicked] = useState<readonly string[]>(['Defeat Ganon']);
  const toggle = (goal: string) => setPicked((now) => (now.includes(goal) ? now.filter((g) => g !== goal) : [...now, goal]));
  return (
    <Flex gap="md" align="center" wrap>
      {['Defeat Ganon', 'Triforce hunt', 'Pedestal'].map((goal) => (
        <Tag key={goal} color="primary" selected={picked.includes(goal)} onSelect={() => toggle(goal)}>{goal}</Tag>
      ))}
      <Tag variant="category" color="teal" selected={picked.includes('Teal')} onSelect={() => toggle('Teal')}>Teal</Tag>
    </Flex>
  );
};

const Selectable = {
  name: 'Selectable, as in TagPicker',
  render: () => <SelectableRow />,
} satisfies StoryLiteStoryDefinition<TagArgs>;

const OnItems = {
  name: 'Categorising items',
  render: () => (
    <Box className="story-column">
      <Card>
        <Stack gap="sm">
          {GAMES.map((game) => (
            <Flex key={game.name} justify="between" align="center" gap="md">
              <Text>{game.name}</Text>
              <Flex gap="xs">{game.tags.map((tag) => <Tag key={tag.label} {...tag.look}>{tag.label}</Tag>)}</Flex>
            </Flex>
          ))}
        </Stack>
      </Card>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TagArgs>;

const renderState = (props: StateProps) => (
  <Tag color="primary" selected={props.selected === true} disabled={props.disabled === true} onSelect={noop}>Triforce hunt</Tag>
);

const Overview = overviewStory({
  component: 'Tag',
  description: 'A value that sorts an item into a group: a game, a category, a mode. Every tag shares one shape and one size, so the chips of a tag field, the picks in a select, the options of a picker and the labels on a list all read as the same family. variant picks the palette and color picks from it: normal takes neutral, the default, and the theme colours, drawn with a border; urgency takes success, warning, danger and info, drawn bold with no border; category takes the ten category colours, drawn as a tinted chip with a dot. The types refuse a colour that is not in its variant. onRemove adds a remove button, as in TagInput and Combobox. selected with onSelect makes the tag a toggle, as in TagPicker: it rests grey and shows its colour once picked.',
  playground: Playground,
  variants: [Variants, Removable, Selectable, OnItems],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      STATE.hover,
      STATE.focus,
      STATE.selected,
      { ...STATE.disabled, props: { selected: true, disabled: true } },
      { name: 'Remove focused', pseudo: 'focus-visible', target: '.tag-chip__remove', render: () => <Tag onRemove={noop}>mode:open</Tag> },
    ],
  },
  code: `import { Tag } from '@drizztdourden08/tessera';

<Tag variant="category" color="green">Zelda</Tag>
<Tag variant="urgency" color="warning">Beta</Tag>
<Tag color="primary" onRemove={() => remove('ocarina')}>Ocarina of Time</Tag>
<Tag selected={picked} onSelect={toggle}>Triforce hunt</Tag>`,
});

export default meta;
export { OnItems, Overview, Playground, Removable, Selectable, Variants };
