/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import type { DockMainGrip } from '../../src/composites';
import { DockDemo } from './_samples/DockDemo';
import { CHROMES_HINT, DOCK_CHROMES } from './_samples/dock-demo.constants';
import { SAVED_HINT } from './_samples/dock-saved-layout.constants';
import './DockLayout.stories.css';

type DockArgs = {
  peek: boolean;
  swap: boolean;
  overlay: boolean;
  floating: boolean;
  mainLabel: string;
  gripLabel: string;
  mainGrip: DockMainGrip;
};

const ARGS: Partial<DockArgs> = {
  peek: false, swap: false, overlay: false, floating: true, mainLabel: 'Main view', gripLabel: 'Main', mainGrip: 'always',
};

const ARG_TYPES: PlaygroundArgTypes<DockArgs> = {
  mainLabel: { group: 'Content', control: 'text', description: 'Names the main view in the drag label.' },
  gripLabel: { group: 'Content', control: 'text', description: 'The word on the grip at the top of the main view.' },
  peek: { group: 'State', control: 'boolean', description: 'Every pane folds to its title strip and the main view takes the room. Holding Alt does the same.' },
  floating: { group: 'State', control: 'boolean', description: 'Start with the Console floating over the main view.' },
  swap: { group: 'Behaviour', control: 'boolean', description: 'A drop on a pane swaps the two. Holding Shift does the same.' },
  overlay: { group: 'Behaviour', control: 'boolean', description: 'A drop lands over the main view instead of making room. Holding Ctrl does the same.' },
  mainGrip: { group: 'Behaviour', control: 'select', options: ['always', 'dragging', 'hidden'], description: 'When the grip shows: always, only while a widget is dragged, or never, for an app whose main view never moves.' },
};

const meta = {
  title: 'Composites · Widgets/DockLayout',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<DockArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DockDemo {...args} />,
} satisfies PlaygroundStory<DockArgs>;

const Tiled = {
  name: 'Tiled around the main view',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DockDemo {...args} floating={false} />,
} satisfies PlaygroundStory<DockArgs>;

const Floating = {
  name: 'With a floating widget',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DockDemo {...args} />,
} satisfies PlaygroundStory<DockArgs>;

const Peek = {
  name: 'Peek',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DockDemo {...args} peek />,
} satisfies PlaygroundStory<DockArgs>;

const Kit = {
  name: 'A kit kept apart from other widgets',
  render: () => (
    <DockDemo
      start="kit"
      hint="Elements and Network are one kit. Drag either onto Players or the log: no hint shows and the drop does nothing."
    />
  ),
} satisfies StoryLiteStoryDefinition<DockArgs>;

const Snap = {
  name: 'Floating widgets that snap to edges',
  render: () => (
    <DockDemo start="snap" floatSnap={12} hint="Move or resize a floating widget near an edge: within 12 px it snaps, and a guide line shows." />
  ),
} satisfies StoryLiteStoryDefinition<DockArgs>;

const Chromes = {
  name: 'Widgets in three chromes',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <DockDemo {...args} start="kit" chromes={DOCK_CHROMES} hint={CHROMES_HINT} />,
} satisfies PlaygroundStory<DockArgs>;

const Saved = {
  name: 'A layout saved before makeRoom',
  render: () => <DockDemo start="saved" hint={SAVED_HINT} />,
} satisfies StoryLiteStoryDefinition<DockArgs>;

const renderState = (props: StateProps) => (
  <DockDemo className="dock-story--state" floating={false} peek={props.peek === true} />
);

const CODE = `import { DockLayout, Widget, applyEdit, useDockKeys } from '@drizztdourden08/tessera';

const [layout, setLayout] = useState(startLayout);
const { peek, modifiers } = useDockKeys();

<DockLayout
  layout={layout}
  peek={peek}
  modifiers={modifiers}
  main={<MainView />}
  onMainRect={setMainRect}
  onEdit={(edit) => setLayout((prev) => applyEdit(prev, edit, mainRect))}
  labelOf={(id) => labels[id]}
  renderPane={(pane) => <Widget id={pane.active} tabs={tabsOf(pane)} activeId={pane.active} paneKey={pane.key} {...frame} />}
  renderFloating={(f) => <Widget id={f.id} tabs={tabsOf(f)} activeId={f.id} paneKey={null} {...frame} />}
/>`;

const Overview = overviewStory({
  component: 'DockLayout',
  description: 'The stage that widgets tile around a main view, where they move by drag and drop and resize by dividers and edges.',
  points: [
    'It lays out the split tree in `layout`, draws each pane through `renderPane` and marks it `data-pane-id`.',
    '**It owns no data:** every change leaves through `onEdit` as a `LayoutEdit` for the host to apply.',
    'Drag a title bar to dock, tab or float the widget, or past the window edge to pop it out through `onPopOut`.',
    'A small hint beside the pointer lists the keys: [[Shift]] swaps panes, [[Ctrl]] overlays, [[Esc]] cancels.',
    'Drag a divider or a floating edge to resize, double-click to even a divider; `floatSnap` snaps to edges.',
    '`canDrop` refuses a drop and its hint; WidgetManager uses it to keep each widget `group` in its own panes.',
  ],
  playground: Playground,
  variants: [Tiled, Floating, Peek, Kit, Snap, Chromes, Saved],
  states: {
    render: renderState,
    list: [
      STATE.idle,
      { name: 'Divider hover', pseudo: 'hover', target: '.dock-divider' },
      { name: 'Grip hover', pseudo: 'hover', target: '.dock-grip' },
      { name: 'Peek', props: { peek: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Chromes, Floating, Kit, Overview, Peek, Playground, Saved, Snap, Tiled };
