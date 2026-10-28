/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { ToolbarDemo } from './_samples/ToolbarDemo';
import { ToolbarEdgeDemo } from './_samples/ToolbarEdgeDemo';
import { TOOLBAR_ARG_TYPES, TOOLBAR_ARGS, TOOLBAR_CODE } from './_samples/toolbar-story.constants';
import type { ToolbarArgs } from './_samples/toolbar-story.type';
import './Toolbar.stories.css';

const meta = {
  title: 'Composites · Actions/Toolbar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ToolbarArgs>;

const Playground = {
  name: 'Playground',
  args: TOOLBAR_ARGS,
  argTypes: TOOLBAR_ARG_TYPES,
  render: (args) => <ToolbarDemo orientation={args.orientation} handle={args.handle} size={args.size} extent={args.extent} layout={args.layout} openOn={args.openOn} captions={args.orientation === 'horizontal'} />,
} satisfies PlaygroundStory<ToolbarArgs>;

const Horizontal = {
  name: 'Horizontal: an icon with a short caption, and a menu below the Pencil',
  render: () => <ToolbarDemo captions readout />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const Vertical = {
  name: 'Vertical: icons only, and the Pencil opens its menu to the right',
  render: () => <ToolbarDemo orientation="vertical" readout />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const Overflow = {
  name: 'Too short for every item: the rest fold into More',
  render: () => (
    <Box className="toolbar-story__row">
      <ToolbarDemo extent="240" />
      <ToolbarDemo orientation="vertical" extent="240" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const Plain = {
  name: 'Without a handle, at md size',
  render: () => <ToolbarDemo handle={false} size="md" />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const PixelIcons = {
  name: 'Pixel icons beside smooth icons: the buttons grow to hold a 24 px icon',
  render: () => (
    <Box className="toolbar-story">
      <Box className="toolbar-story__row">
        <ToolbarDemo pixel captions />
        <ToolbarDemo captions />
      </Box>
      <Box className="toolbar-story__row">
        <ToolbarDemo pixel orientation="vertical" />
        <ToolbarDemo orientation="vertical" />
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const NodeIcon = {
  name: 'A node as an icon: the Fill tool draws its own bitmap, and keeps it in More',
  render: () => (
    <Box className="toolbar-story__row">
      <ToolbarDemo bitmap captions />
      <ToolbarDemo bitmap orientation="vertical" extent="240" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const ClickOpen = {
  name: 'Opens on click: the Pencil shows its menu when pressed, and the arrow key still opens it',
  render: () => <ToolbarDemo captions openOn="click" readout />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const TwoShortcuts = {
  name: 'Two shortcuts: the Brush size hint lists Smaller and Larger as two rows',
  render: () => <ToolbarDemo />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const List = {
  name: 'List: a row for each tool with its name, description and shortcut, for a wide panel',
  render: () => <ToolbarDemo layout="list" handle={false} readout />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const RightEdge = {
  name: 'Near the right edge: the long Transform menu and its sub-menu stay inside the view',
  render: () => <ToolbarEdgeDemo />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const Columns = {
  name: 'Columns: a short column wraps into two before it folds, and 2 keeps two at any length',
  render: () => (
    <Box className="toolbar-story__row">
      <ToolbarDemo orientation="vertical" extent="320" columns="auto" />
      <ToolbarDemo orientation="vertical" extent="640" columns={2} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const Priority = {
  name: 'Priority: with Undo and Redo set high, the tools fold into More first and those two stay',
  render: () => (
    <Box className="toolbar-story__row">
      <ToolbarDemo extent="320" handle={false} />
      <ToolbarDemo extent="320" handle={false} priority />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const HiddenItems = {
  name: 'Hidden items: the Eraser, Fill and the Grid are left out, and the separators close up',
  render: () => <ToolbarDemo hiddenItems={['eraser', 'bucket', 'grid']} />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const ContextMenu = {
  name: 'Context menu: right click a tool, or focus it and press Shift+F10',
  render: () => <ToolbarDemo context captions />,
} satisfies StoryLiteStoryDefinition<ToolbarArgs>;

const Overview = overviewStory({
  component: 'Toolbar',
  description: 'A row or a column of tools: buttons, toggles, groups and a number, with a hint on each and More for the rest.',
  points: [
    '`items` come from data: `button`, `toggle`, `group`, `number` and `separator`, in any order.',
    'A bar shows an optional `caption` beside the icon unless `labels` is off; `layout="list"` makes labelled rows.',
    'Every item has a hint with its name, description and [Shortcut]; `shortcut` can be a list of labelled keys.',
    '`options` on a button or toggle open a [DropdownMenu] on hover, or on click with `openOn`.',
    'Items that do not fit fold into More, lowest `priority` first; `columns` wraps a column into two first.',
    '`handle` draws a grip for a dock; `hiddenItems` leaves items out; `onContextMenu` reports right clicks.',
  ],
  instead: '[ActionBar] for the buttons of one item, or [DropdownMenu] for actions that need no button of their own.',
  playground: Playground,
  variants: [Horizontal, Vertical, Overflow, Plain, PixelIcons, NodeIcon, ClickOpen, TwoShortcuts, List, RightEdge, Columns, Priority, HiddenItems, ContextMenu],
  states: {
    render: (props: StateProps) => <ToolbarDemo {...props} />,
    list: [
      { name: 'Horizontal', props: {} },
      { name: 'Vertical', props: { orientation: 'vertical' } },
      { name: 'Folded', props: { extent: '240' } },
      { name: 'List', props: { layout: 'list', handle: false } },
    ],
  },
  code: TOOLBAR_CODE,
});

export default meta;
export { ClickOpen, Columns, ContextMenu, HiddenItems, Horizontal, List, NodeIcon, Overflow, Overview, PixelIcons, Plain, Playground, Priority, RightEdge, TwoShortcuts, Vertical };
