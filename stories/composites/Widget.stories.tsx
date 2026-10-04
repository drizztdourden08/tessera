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
  disabledMessage: { group: 'Content', control: 'text' },
  makeRoomHint: { group: 'Content', control: 'text', description: 'Dock only: the hint under Make room in each widget\'s options' },
  opacity: { group: 'Appearance', control: 'range', min: 0, max: 1, step: 0.05, description: 'Frame opacity, 0 to 1. The content stays opaque; hover makes the frame solid.' },
  mode: { group: 'Layout', control: 'select', options: ['in', 'out'], description: 'out draws the frame as its own window: a pop in button and a pin.' },
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
>
  <HintList />
</Widget>

// A whole dock goes through WidgetManager, which draws a DockLayout of Widgets
// and their options from a WidgetLayout, and hands every change to onLayoutChange.`;

const Overview = overviewStory({
  component: 'Widget',
  description: 'The frame a tool panel wears, docked in a DockLayout pane, floating over the main view, or in its own window: a player list, a log, hints. The title bar is the drag handle; it shows the widget name, or one tab chip per widget when its pane holds several, then the pop out, options and close buttons. In its own window it shows a pop in button and a pin that steps through off, always on top and with the app. The frame takes the opacity setting and turns solid on hover, while the content stays opaque. Peek folds it to its title strip. The gear opens WidgetOptions, live in every example here: its icon controls change the frame, pointing at any option shows its value and what it does in the hint line at the bottom, and the line under the frame shows every value. The frame fills the box it is given; WidgetManager places a whole dock of them from a WidgetLayout and opens WidgetOptions from the gear.',
  playground: Playground,
  variants: [Single, Tabbed, OwnWindow, Folded, Dock],
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
export { Dock, Folded, OwnWindow, Overview, Playground, Single, Tabbed };
