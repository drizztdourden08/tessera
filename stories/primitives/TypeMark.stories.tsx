/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Flex, TypeMark } from '../../src/primitives';
import type { IconName, TagCategoryColor, TypeMarkSize, TypeMarkVariant } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';

type TypeMarkArgs = {
  label: string;
  icon: IconName;
  color: TagCategoryColor;
  size: TypeMarkSize;
  variant: TypeMarkVariant;
};

type ItemType = { icon: IconName; label: string; color: TagCategoryColor };

const SIZES: readonly TypeMarkSize[] = ['xs', 'sm'];

const ITEM_TYPES: readonly ItemType[] = [
  { icon: 'zap', label: 'Epic', color: 'violet' },
  { icon: 'bookmark', label: 'Story', color: 'green' },
  { icon: 'circle-check', label: 'Task', color: 'blue' },
  { icon: 'bug', label: 'Bug', color: 'rose' },
  { icon: 'wrench', label: 'Tech debt', color: 'amber' },
  { icon: 'scroll-text', label: 'Test plan', color: 'teal' },
  { icon: 'flask', label: 'Test case', color: 'cyan' },
];

const ARG_TYPES: PlaygroundArgTypes<TypeMarkArgs> = {
  label: { group: 'Content', control: 'text', description: 'The type name: the tooltip and the text a screen reader reads.' },
  icon: { group: 'Content', control: 'select', options: ITEM_TYPES.map((type) => type.icon) },
  color: { group: 'Appearance', control: 'select', options: ['rose', 'orange', 'amber', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'pink'] },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  variant: { group: 'Appearance', control: 'select', options: ['tile', 'outline'] },
};

const meta = {
  title: 'Primitives · Display/TypeMark',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TypeMarkArgs>;

const Playground = {
  name: 'Playground',
  args: { label: 'Bug', icon: 'bug', color: 'rose', size: 'sm', variant: 'tile' },
  argTypes: ARG_TYPES,
  render: (args) => <TypeMark label={args.label} icon={args.icon} color={args.color} size={args.size} variant={args.variant} />,
} satisfies PlaygroundStory<TypeMarkArgs>;

const EveryType = {
  name: 'The item types, at both sizes',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <Flex gap="sm" align="center" wrap>
          {ITEM_TYPES.map((type) => <TypeMark key={type.label} icon={type.icon} label={type.label} color={type.color} size={size} />)}
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<TypeMarkArgs>;

const Outline = {
  name: 'Outline: the bare icon in the colour',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <Flex gap="sm" align="center" wrap>
          {ITEM_TYPES.map((type) => <TypeMark key={type.label} icon={type.icon} label={type.label} color={type.color} size={size} variant="outline" />)}
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<TypeMarkArgs>;

const Overview = overviewStory({
  component: 'TypeMark',
  description: 'A small tinted tile with an icon in a colour, to mark the type of an item.',
  points: [
    '`icon` is a Tessera icon name and `color` one of the ten category colours.',
    'The tile takes a tint of the colour and the icon takes the full colour.',
    '`size` is `xs` at 16 px for dense rows or `sm` at 20 px beside a title.',
    '`variant="outline"` shows only the icon in the colour, with no tile, at the icon size.',
    '`label` is the type name; it is the tooltip on hover and the text a screen reader reads.',
  ],
  instead: '[Avatar] for a person, or [Tag] for a value that sorts an item into a group.',
  playground: Playground,
  variants: [EveryType, Outline],
  states: {
    render: () => <TypeMark icon="bug" label="Bug" color="rose" size="sm" />,
    list: [STATE.idle, STATE.hover],
  },
  code: `import { TypeMark } from '@drizztdourden08/tessera';

<TypeMark icon="bug" label="Bug" color="rose" />
<TypeMark icon="bookmark" label="Story" color="green" size="sm" />
<TypeMark icon="bug" label="Bug" color="rose" variant="outline" />`,
});

export default meta;
export { EveryType, Outline, Overview, Playground };
