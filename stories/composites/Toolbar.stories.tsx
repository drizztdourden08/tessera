/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import type { PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { ToolbarDemo } from './_samples/ToolbarDemo';
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
  render: (args) => <ToolbarDemo orientation={args.orientation} handle={args.handle} size={args.size} extent={args.extent} captions={args.orientation === 'horizontal'} />,
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

const Overview = overviewStory({
  component: 'Toolbar',
  description: 'A row or a column of tools: buttons, toggles, groups and a number, with a hint on each and More for the rest.',
  points: [
    '`items` come from data: `button`, `toggle`, `group`, `number` and `separator`, in any order.',
    'Horizontal shows an optional `caption` beside the icon; vertical shows icons only.',
    'Every item has a hint with its name, description and [Shortcut]; the shortcut never sits on the button.',
    '`options` on a button or toggle open a [DropdownMenu] on hover, below a row and beside a column.',
    'Items that do not fit fold into More. The arrow keys along the toolbar move focus.',
    '`handle` draws a grip for a dock to wire through `handleProps`; the toolbar has no drag logic.',
  ],
  instead: '[ActionBar] for the buttons of one item, or [DropdownMenu] for actions that need no button of their own.',
  playground: Playground,
  variants: [Horizontal, Vertical, Overflow, Plain, PixelIcons, NodeIcon],
  states: {
    render: (props: StateProps) => <ToolbarDemo {...props} />,
    list: [
      { name: 'Horizontal', props: {} },
      { name: 'Vertical', props: { orientation: 'vertical' } },
      { name: 'Folded', props: { extent: '240' } },
    ],
  },
  code: TOOLBAR_CODE,
});

export default meta;
export { Horizontal, NodeIcon, Overflow, Overview, PixelIcons, Plain, Playground, Vertical };
