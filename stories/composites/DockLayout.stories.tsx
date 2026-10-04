/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';
import type { DockMainGrip } from '../../src/composites';
import { DockDemo } from './_samples/DockDemo';
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
  description: 'The stage that widgets tile around a main view. It lays a split tree out over its own size: every pane and the main view get a rectangle, and every gap between two of them is a divider that drags to resize and double-clicks to even out. Widgets drag by their title bar, one tab drags out of a pane, and the grip on top of the main view moves it. While a drag is live, strips along the edges, a compass on every pane and a preview show where the drop lands: an edge, a side of a pane, a tab, or floating over the main view. Shift swaps two panes, Ctrl lands a pane over the main view instead of making room, Escape cancels, and past the window edge a widget can pop out. The stage owns no data: every change leaves as a LayoutEdit for the host to apply.',
  playground: Playground,
  variants: [Tiled, Floating, Peek],
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
export { Floating, Overview, Peek, Playground, Tiled };
