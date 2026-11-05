/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Avatar, Flex } from '../../src/primitives';
import type { AvatarShape, AvatarSize, AvatarVariant, TagCategoryColor } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';

type AvatarArgs = {
  label: string;
  initials: string;
  color: TagCategoryColor;
  size: AvatarSize;
  variant: AvatarVariant;
  shape: AvatarShape;
};

const COLORS: readonly TagCategoryColor[] = ['rose', 'orange', 'amber', 'lime', 'green', 'teal', 'cyan', 'blue', 'violet', 'pink'];

const SIZES: readonly AvatarSize[] = ['xs', 'sm', 'lg'];

const SHAPES: readonly AvatarShape[] = ['circle', 'square'];

const PICTURE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 20'%3E%3Crect width='40' height='20' fill='%23567'/%3E%3Ccircle cx='28' cy='8' r='6' fill='%23eb5'/%3E%3C/svg%3E";

const BROKEN_PICTURE = '/tessera-missing-picture.png';

const ARG_TYPES: PlaygroundArgTypes<AvatarArgs> = {
  label: { group: 'Content', control: 'text', description: 'The name of the person: the tooltip and the text a screen reader reads.' },
  initials: { group: 'Content', control: 'text', description: 'One or two letters. Empty draws the unassigned circle.' },
  color: { group: 'Appearance', control: 'select', options: [...COLORS] },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  variant: { group: 'Appearance', control: 'select', options: ['default', 'owner'] },
  shape: { group: 'Appearance', control: 'select', options: [...SHAPES] },
};

const meta = {
  title: 'Primitives · Display/Avatar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<AvatarArgs>;

const Playground = {
  name: 'Playground',
  args: { label: 'Wren Archer', initials: 'WA', color: 'teal', size: 'sm', variant: 'default', shape: 'circle' },
  argTypes: ARG_TYPES,
  render: (args) => (args.initials === ''
    ? <Avatar label={args.label} size={args.size} variant={args.variant} shape={args.shape} />
    : <Avatar label={args.label} initials={args.initials} color={args.color} size={args.size} variant={args.variant} shape={args.shape} />),
} satisfies PlaygroundStory<AvatarArgs>;

const Sizes = {
  name: 'Two sizes, 16 px and 24 px',
  render: () => (
    <Demonstrator
      rows={axis(SIZES)}
      cell={(size) => (
        <Flex gap="sm" align="center">
          <Avatar label="Wren Archer" initials="WA" color="teal" size={size} />
          <Avatar label="You" icon="user" color="violet" size={size} />
          <Avatar label="Unassigned" size={size} />
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<AvatarArgs>;

const EveryColor = {
  name: 'Every category colour',
  render: () => (
    <Flex gap="sm" align="center" wrap>
      {COLORS.map((color) => <Avatar key={color} label={color} initials={color.slice(0, 2)} color={color} size="sm" />)}
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<AvatarArgs>;

const Owner = {
  name: 'Owner: a ring around the circle',
  render: () => (
    <Flex gap="md" align="center" wrap>
      <Avatar label="You" icon="user" color="violet" variant="owner" size="xs" />
      <Avatar label="You" icon="user" color="violet" variant="owner" size="sm" />
      <Avatar label="Wren Archer" initials="WA" color="teal" size="sm" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<AvatarArgs>;

const Picture = {
  name: 'Picture: cropped to the shape, initials if it fails',
  render: () => (
    <Flex gap="md" align="center">
      <Avatar label="Wren Archer" src={PICTURE} size="xs" />
      <Avatar label="Wren Archer" src={PICTURE} size="sm" />
      <Avatar label="Wren Archer" src={BROKEN_PICTURE} color="teal" size="sm" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<AvatarArgs>;

const Square = {
  name: 'Square: a rounded square',
  render: () => (
    <Flex gap="md" align="center">
      <Avatar label="Platform team" initials="PT" color="blue" shape="square" size="sm" />
      <Avatar label="Platform team" src={PICTURE} shape="square" size="sm" />
      <Avatar label="Unassigned" shape="square" size="sm" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<AvatarArgs>;

const Unassigned = {
  name: 'Unassigned: a dashed circle',
  render: () => (
    <Flex gap="md" align="center">
      <Avatar label="Unassigned" size="xs" />
      <Avatar label="Unassigned" size="sm" />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<AvatarArgs>;

const Overview = overviewStory({
  component: 'Avatar',
  description: 'A small round mark for a person, with initials or an icon on a tinted ground.',
  points: [
    '`label` is the name of the person; it is the tooltip on hover and the text a screen reader reads.',
    "`initials`, `icon` or a `src` picture: give one. A picture that fails to load shows the label's initials.",
    'With neither it draws a dashed outline circle, the unassigned state.',
    '`color` picks one of the ten category colours; `size` is `xs` at 16 px or `sm` at 24 px.',
    '`variant="owner"` draws a ring around the circle so the signed-in person stands out.',
    '`shape` is `circle` by default or `square`, which takes the small radius token.',
  ],
  instead: '[TypeMark] for the kind of an item, or [Tag] for a value that sorts it into a group.',
  playground: Playground,
  variants: [Sizes, EveryColor, Owner, Picture, Square, Unassigned],
  states: {
    render: () => <Avatar label="Wren Archer" initials="WA" color="teal" size="sm" />,
    list: [
      STATE.idle,
      STATE.hover,
      { name: 'Unassigned', render: () => <Avatar label="Unassigned" size="sm" /> },
    ],
  },
  code: `import { Avatar } from '@drizztdourden08/tessera';

<Avatar label="Wren Archer" initials="WA" color="teal" />
<Avatar label="You" icon="user" color="violet" variant="owner" size="sm" />
<Avatar label="Wren Archer" src="/people/wren.png" size="sm" />
<Avatar label="Platform team" initials="PT" shape="square" />
<Avatar label="Unassigned" />`,
});

export default meta;
export { EveryColor, Overview, Owner, Picture, Playground, Sizes, Square, Unassigned };
