/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { WidgetDock } from './_samples/data-widget-dock';
import { WidgetFrameDemo } from './_samples/WidgetFrameDemo';
import './Widget.stories.css';

type WidgetArgs = {
  tabbed: boolean;
  mode: 'in' | 'out';
  square: boolean;
  titleBarActions: boolean;
  peek: boolean;
  opacity: number;
  canPopOut: boolean;
  contextActive: boolean;
  disabledWidget: string;
  disabledMessage: string;
  makeRoomHint: string;
};

const FrameDemo = (props: WidgetArgs & { optionsOpen?: boolean }) => <WidgetFrameDemo {...props} />;

const ARGS: Partial<WidgetArgs> = {
  tabbed: false,
  mode: 'in',
  square: false,
  titleBarActions: false,
  peek: false,
  opacity: 0.92,
  canPopOut: true,
  contextActive: true,
  disabledWidget: 'none',
  disabledMessage: 'Hint sharing is off for this session.',
  makeRoomHint: 'The session view shrinks to fit this widget',
};

const ARG_TYPES: PlaygroundArgTypes<WidgetArgs> = {
  tabbed: { group: 'Content', control: 'boolean', description: 'The pane holds two widgets, shown as tab chips.' },
  titleBarActions: { group: 'Content', control: 'boolean', description: 'The widget adds a button of its own through titleBarActions: a spoiler toggle before the built-in buttons.' },
  disabledMessage: { group: 'Content', control: 'text' },
  makeRoomHint: { group: 'Content', control: 'text', description: 'Dock only: the hint under Make room in each widget\'s options' },
  opacity: { group: 'Appearance', control: 'range', min: 0, max: 1, step: 0.05, description: 'Frame opacity, 0 to 1. The content stays opaque; hover makes the frame solid.' },
  mode: { group: 'Layout', control: 'select', options: ['in', 'out'], description: 'out draws the frame as its own window: a pop in button and the pin menu.' },
  square: { group: 'Layout', control: 'boolean', description: 'For a widget window shown fullscreen: no corner radius and no outer border.' },
  peek: { group: 'State', control: 'boolean', description: 'Folded to its title strip.' },
  contextActive: { group: 'State', control: 'boolean', description: 'Dock only: a session is running. Players and Hints show only in context.' },
  disabledWidget: { group: 'State', control: 'select', options: ['none', 'players', 'log', 'hints', 'console'], description: 'Dock only: covered through resolveDisabled' },
  canPopOut: { group: 'Behaviour', control: 'boolean' },
};

const meta = {
  title: 'Composites · Widgets/Widget',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<WidgetArgs>;

const story = (name: string, patch: Partial<WidgetArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <FrameDemo {...args} {...patch} />,
} satisfies PlaygroundStory<WidgetArgs>);

const Playground = story('Playground', {});
const Single = story('One widget', {});
const Tabbed = story('Tabbed pane', { tabbed: true });
const OwnWindow = story('Own window', { mode: 'out' });
const OwnActions = story('Own window, with a title bar action', { mode: 'out', titleBarActions: true });
const Fullscreen = story('Own window, fullscreen', { mode: 'out', square: true });
const Folded = story('Peek', { peek: true });

const Dock = {
  name: 'Session dashboard dock',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WidgetDock {...args} />,
} satisfies PlaygroundStory<WidgetArgs>;

const renderState = (props: StateProps) => (
  <FrameDemo {...(ARGS as WidgetArgs)} tabbed peek={props.peek === true} optionsOpen={props.open === true} />
);

const CODE = `import { Widget } from '@drizztdourden08/tessera';

<Widget
  id="hints"
  tabs={[{ id: 'hints', label: 'Hints' }, { id: 'players', label: 'Players' }]}
  activeId={active}
  paneKey={pane.key}
  opacity={0.92}
  peek={peek}
  optionsOpen={optionsOpen}
  onActivateTab={(id) => onEdit({ type: 'activate-tab', key: pane.key, id })}
  onOpenOptions={(anchor) => openOptions('hints', anchor)}
  onPopOut={() => popOut('hints')}
  onClose={() => close('hints')}
  titleBarActions={<SpoilerToggle />}
>
  <HintList />
</Widget>

// A whole dock goes through WidgetManager, which draws a DockLayout of Widgets
// and their options from a WidgetLayout, and hands every change to onLayoutChange.
// widgetActions={(id) => ...} gives each widget its own title bar buttons there.`;

const Overview = overviewStory({
  component: 'Widget',
  description: 'The frame of a tool panel, such as a player list or a log, docked in a [DockLayout], floating, or in its own window.',
  points: [
    'The title bar is the drag handle, with the name or one tab per widget, then pop out, options and close.',
    'In its own window, `pin` picks from a title bar menu whether it stays on top.',
    '`titleBarActions` adds buttons of its own before the built-in ones.',
    'The frame takes `opacity` and turns solid on hover; `peek` folds it to its title strip.',
    '`square` drops the corners and the border for a widget window shown fullscreen.',
    'The gear opens [WidgetOptions], and `WidgetManager` places a whole dock of widgets from a layout.',
  ],
  playground: Playground,
  variants: [Single, Tabbed, OwnWindow, OwnActions, Fullscreen, Folded, Dock],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Tab hover', pseudo: 'hover', target: '.widget__tab:not(.widget__tab--active)' },
      { ...STATE.open, name: 'Options open' },
      { name: 'Peek', props: { peek: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Dock, Folded, Fullscreen, OwnActions, OwnWindow, Overview, Playground, Single, Tabbed };
