/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import { ContextDock } from './_samples/ContextDock';
import { WidgetDock } from './_samples/data-widget-dock';
import { PerformanceWidget } from './_samples/PerformanceWidget';
import type { WidgetChrome } from '../../src/composites';
import { CHROME_DEFINITIONS } from './_samples/data-widgets';
import { WidgetBodyDemo } from './_samples/WidgetBodyDemo';
import { WidgetChromeRow } from './_samples/WidgetChromeRow';
import { WidgetFrameDemo } from './_samples/WidgetFrameDemo';
import './Widget.stories.css';

type WidgetArgs = {
  tabbed: boolean;
  chrome: WidgetChrome;
  mode: 'in' | 'out';
  square: boolean;
  titleBarActions: boolean;
  dragRegion: boolean;
  peek: boolean;
  opacity: number;
  canPopOut: boolean;
  contextActive: boolean;
  disabled: boolean;
  disabledWidget: string;
  disabledMessage: string;
  makeRoomHint: string;
};

const FrameDemo = (props: WidgetArgs & { optionsOpen?: boolean }) => <WidgetFrameDemo {...props} />;

const ARGS: Partial<WidgetArgs> = {
  tabbed: false,
  chrome: 'full',
  mode: 'in',
  square: false,
  titleBarActions: false,
  dragRegion: false,
  peek: false,
  opacity: 0.92,
  canPopOut: true,
  contextActive: true,
  disabled: false,
  disabledWidget: 'none',
  disabledMessage: 'Hint sharing is off for this session.',
  makeRoomHint: 'The session view shrinks to fit this widget',
};

const ARG_TYPES: PlaygroundArgTypes<WidgetArgs> = {
  tabbed: { group: 'Content', control: 'boolean', description: 'The pane holds two widgets, shown as tab chips.' },
  titleBarActions: { group: 'Content', control: 'boolean', description: 'The widget adds a button of its own through titleBarActions: a spoiler toggle before the built-in buttons.' },
  disabledMessage: { group: 'Content', control: 'text', description: 'The reason on the disabled state, as disabled takes it.' },
  makeRoomHint: { group: 'Content', control: 'text', description: 'Dock only: the hint under Make room in each widget\'s options' },
  chrome: { group: 'Appearance', control: 'select', options: ['full', 'compact', 'none'], description: 'The frame: the full title bar, a 20 px strip, or none, with a grip and the buttons over the body on hover or focus.' },
  opacity: { group: 'Appearance', control: 'range', min: 0, max: 1, step: 0.05, description: 'Frame opacity, 0 to 1. The content stays opaque; hover makes the frame solid.' },
  mode: { group: 'Layout', control: 'select', options: ['in', 'out'], description: 'out draws the frame as its own window: a pop in button and the pin menu.' },
  square: { group: 'Layout', control: 'boolean', description: 'For a widget window shown fullscreen: no corner radius and no outer border.' },
  dragRegion: { group: 'Layout', control: 'boolean', description: 'In its own window: the title strip moves the window, its buttons stay clickable. Dashed here: the drag region; solid: kept clickable.' },
  peek: { group: 'State', control: 'boolean', description: 'Folded to its title strip.' },
  disabled: { group: 'State', control: 'boolean', description: 'Covers the body with the disabled state, as a docked widget shows it.' },
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
const Single = story('One widget, a region named by its title', {});
const Tabbed = story('Tabbed pane, a region named by its open tab', { tabbed: true });
const OwnWindow = story('Own window', { mode: 'out' });
const OwnActions = story('Own window, with a title bar action', { mode: 'out', titleBarActions: true });
const Fullscreen = story('Own window, fullscreen', { mode: 'out', square: true });
const DragStrip = story('Own window, the title strip moves the window', { mode: 'out', titleBarActions: true, dragRegion: true });
const Folded = story('Peek', { peek: true });
const OffInWindow = story('Own window, disabled with a reason', { mode: 'out', disabled: true });

const Dock = {
  name: 'Session dashboard dock',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WidgetDock {...args} />,
} satisfies PlaygroundStory<WidgetArgs>;

const PerWidget = {
  name: 'Session dashboard dock, a context per widget',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ContextDock {...args} />,
} satisfies PlaygroundStory<WidgetArgs>;

const Chromes = {
  name: 'Three chromes side by side',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WidgetChromeRow {...args} tabbed />,
} satisfies PlaygroundStory<WidgetArgs>;

const ChromeWindows = {
  name: 'Three chromes in their own windows',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WidgetChromeRow {...args} mode="out" dragRegion />,
} satisfies PlaygroundStory<WidgetArgs>;

const ChromeDock = {
  name: 'Three chromes docked',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <WidgetDock {...args} disabledWidget="console" definitions={CHROME_DEFINITIONS} />,
} satisfies PlaygroundStory<WidgetArgs>;

const Bodies = {
  name: 'Body padding and fill',
  render: () => <WidgetBodyDemo />,
} satisfies StoryLiteStoryDefinition<WidgetArgs>;

const Performance = {
  name: 'A performance widget, live',
  render: () => <PerformanceWidget />,
} satisfies StoryLiteStoryDefinition<WidgetArgs>;

const renderState = (props: StateProps) => (
  <FrameDemo {...(ARGS as WidgetArgs)} tabbed peek={props.peek === true} optionsOpen={props.open === true} />
);

const CODE = `import { Widget, WidgetOptions } from '@drizztdourden08/tessera';

<Widget
  id="hints"
  tabs={[{ id: 'hints', label: 'Hints' }, { id: 'players', label: 'Players' }]}
  activeId={active}
  paneKey={pane.key}
  opacity={0.92}
  peek={peek}
  options={<WidgetOptions title="Hints" {...frameOptions} />}
  onActivateTab={(id) => onEdit({ type: 'activate-tab', key: pane.key, id })}
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
    'The title bar drags it and names the region, by its title or open tab; each button names the widget too.',
    '`chrome` is `full`, a 20 px `compact` strip, or `none`: a grip and the buttons over the body on hover or focus.',
    '`titleBarActions` adds buttons; in its own window `pin` keeps it on top and `dragRegion` lets the strip move it.',
    'The body scrolls in its gutter with `padding`, `sm` by default, or `none` or `md`; `fill` makes a full height column.',
    '`options` puts [WidgetOptions] on the gear; `WidgetManager` lays out a dock and hides widgets out of context.',
    '`disabled` covers the body, a string as the reason; docked or in its own window, the look is the same.',
  ],
  playground: Playground,
  variants: [
    Single, Tabbed, OwnWindow, OwnActions, DragStrip, Fullscreen, OffInWindow, Folded, Chromes, ChromeWindows, ChromeDock, Bodies, Dock, PerWidget,
    Performance,
  ],
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
export { Bodies, ChromeDock, ChromeWindows, Chromes, Dock, DragStrip, Folded, Fullscreen, OffInWindow, OwnActions, OwnWindow, Overview, PerWidget, Performance, Playground, Single, Tabbed };
