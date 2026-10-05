/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import { ShortcutList } from '../../src/composites';
import type { ShortcutListGroup, ShortcutListItem } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import './ShortcutList.stories.css';

type ShortcutListArgs = {
  content: 'keys' | 'gestures' | 'groups';
  size: 'xs' | 'md';
  width: 'wide' | 'narrow';
};

const KEYS: readonly ShortcutListItem[] = [
  { keys: ['ctrl', 'S'], description: 'Save the board' },
  { keys: ['ctrl', 'shift', 'Z'], description: 'Redo the last change you undid' },
  { keys: 'esc', description: 'Close the open panel' },
  { keys: '?', description: 'Show every shortcut in a list like this one' },
];

const DRAG_TITLE: ShortcutListItem = { gesture: { icon: 'move', label: 'Drag title' }, description: 'Move the panel to an edge, a tab or over the board' };

const DRAG_GAP: ShortcutListItem = { gesture: { icon: 'arrow-left-right', label: 'Drag gap' }, description: 'Resize the panels on both sides; a double click evens them' };

const GESTURES: readonly ShortcutListItem[] = [
  DRAG_TITLE,
  DRAG_GAP,
  { keys: 'alt', gesture: { icon: 'move', label: 'Drag' }, description: 'Copy the card instead of moving it' },
  { mouse: 'right', description: 'Open the menu of the card under the pointer' },
];

const GROUPS: readonly ShortcutListGroup[] = [
  { label: 'Any time', items: [DRAG_TITLE, { keys: 'alt', description: 'Peek: panels fold away while held' }, DRAG_GAP] },
  {
    label: 'While dragging',
    items: [
      { keys: 'shift', description: 'Swap with the panel under the pointer' },
      { keys: 'ctrl', description: 'Land as an overlay; the board keeps its room' },
      { keys: 'esc', description: 'Cancel the drag' },
    ],
  },
];

const ARGS: Partial<ShortcutListArgs> = { content: 'groups', size: 'xs', width: 'wide' };

const ARG_TYPES: PlaygroundArgTypes<ShortcutListArgs> = {
  content: { group: 'Content', control: 'select', options: ['keys', 'gestures', 'groups'], description: 'Keys only, gestures beside keys, or groups with a heading each.' },
  size: { group: 'Appearance', control: 'select', options: ['xs', 'md'], description: 'The keycap size; xs fits a menu or a panel.' },
  width: { group: 'Layout', control: 'select', options: ['wide', 'narrow'], description: 'Narrow sets the list in a 192 px box, where each row stacks its keys over its text.' },
};

const Demo = (args: ShortcutListArgs) => {
  const list = args.content === 'groups'
    ? <ShortcutList groups={GROUPS} size={args.size} label="Board shortcuts" />
    : <ShortcutList items={args.content === 'keys' ? KEYS : GESTURES} size={args.size} label="Board shortcuts" />;
  return <Box className={`shortcut-list-story shortcut-list-story--${args.width}`}>{list}</Box>;
};

const meta = {
  title: 'Composites · Content/ShortcutList',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ShortcutListArgs>;

const story = (name: string, patch: Partial<ShortcutListArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <Demo {...args} {...patch} />,
} satisfies PlaygroundStory<ShortcutListArgs>);

const Playground = story('Playground', {});
const KeysOnly = story('Keys only', { content: 'keys' });
const Gestures = story('Gestures beside keys', { content: 'gestures' });
const Groups = story('Groups', { content: 'groups' });
const Narrow = story('Narrow', { content: 'groups', width: 'narrow' });

const CODE = `import { ShortcutList } from '@drizztdourden08/tessera';

<ShortcutList
  label="Board shortcuts"
  groups={[
    { label: 'Any time', items: [
      { gesture: { icon: 'move', label: 'Drag title' }, description: 'Move the panel' },
      { keys: 'alt', description: 'Peek: panels fold away while held' },
    ] },
    { label: 'While dragging', items: [
      { keys: 'shift', description: 'Swap with the panel under the pointer' },
      { keys: 'esc', description: 'Cancel the drag' },
    ] },
  ]}
/>`;

const Overview = overviewStory({
  component: 'ShortcutList',
  description: 'A list of keys and what they do: keycaps in one column, each description beside its keys and wrapping in its own.',
  points: [
    'Every key cell shares one column as wide as the widest, so all descriptions start at one edge.',
    'A key lines up with the first line of its text; long descriptions wrap under themselves, never under the keys.',
    'A drag or a click is a `gesture`: an outlined cap with an icon and a short verb, shaped like a keycap.',
    '`groups` adds a small heading per group, such as While dragging, so the rows under it drop the repeated + drop.',
    'When the text column would get under 160 px, each row stacks, its keys above its text.',
  ],
  instead: 'Use [Shortcut] for one key or key combination inside a sentence or a button.',
  playground: Playground,
  variants: [KeysOnly, Gestures, Groups, Narrow],
  code: CODE,
});

export default meta;
export { Gestures, Groups, KeysOnly, Narrow, Overview, Playground };
