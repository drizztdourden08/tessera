/* @layer stories @kind story */
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { OptionsDemo } from './_samples/OptionsDemo';
import type { OptionsDemoProps } from './_samples/OptionsDemo';
import './WidgetOptions.stories.css';

type OptionsArgs = OptionsDemoProps;

const ARGS: Partial<OptionsArgs> = {
  title: 'Players',
  placement: 'docked',
  canPopOut: true,
  makeRoomHint: 'The main view shrinks to fit this widget',
  contextLabel: 'In context',
  ownRows: true,
};

const ARG_TYPES: PlaygroundArgTypes<OptionsArgs> = {
  title: { group: 'Content', control: 'text' },
  makeRoomHint: { group: 'Content', control: 'text', description: 'The hint line text for Make room.' },
  contextLabel: { group: 'Content', control: 'text', description: 'The Show choice for a widget seen only in context.' },
  ownRows: { group: 'Content', control: 'boolean', description: 'The widget adds a group of its own through own: a Sort sub-menu and two checks. They change the player list.' },
  placement: { group: 'Layout', control: 'select', options: ['docked', 'floating', 'popped'], description: 'Where the widget lives when the panel opens.' },
  canPopOut: { group: 'Behaviour', control: 'boolean', description: 'Shows the own window option; a widget that cannot leave the app hides it.' },
};

const meta = {
  title: 'Composites · Widgets/WidgetOptions',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<OptionsArgs>;

const story = (name: string, patch: Partial<OptionsArgs>) => ({
  name,
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <OptionsDemo {...args} {...patch} />,
} satisfies PlaygroundStory<OptionsArgs>);

const Playground = story('Playground', {});
const Docked = story('Docked on the right, with its own group', {});
const Floating = story('Floating over the main view', { placement: 'floating' });
const OwnWindow = story('In its own window: pin, snap and sync', { placement: 'popped' });
const FrameOnly = story('Frame options only', { ownRows: false });

const CODE = `import { Widget, useWidgetOptionsMenu } from '@drizztdourden08/tessera';

const options = useWidgetOptionsMenu({
  placement: 'docked',
  dockEdge: 'left',
  makeRoom,
  opacity: frame.opacity,
  show: frame.show,
  onDock: (edge) => dock('players', edge),
  onFloat: () => float('players'),
  onPopOut: () => popOut('players'),
  onMakeRoomChange: setMakeRoom,
  onOpacityChange: (opacity) => setFrame({ opacity }),
  onShowChange: (show) => setFrame({ show }),
  onReset: reset,
  own: [{
    id: 'players',
    label: 'Players',
    items: [{ id: 'compact', label: 'Compact rows', kind: 'check', checked: compact, onSelect: () => setCompact(!compact) }],
  }],
});

<Widget id="players" tabs={tabs} activeId="players" paneKey={pane.key} opacity={frame.opacity} options={options} onClose={close}>
  <PlayerList />
</Widget>

// WidgetManager builds the same menu for every widget; optionGroups={(id) => groups} adds a widget's own.`;

const Overview = overviewStory({
  component: 'WidgetOptions',
  importName: 'useWidgetOptionsMenu',
  description: 'The menu every widget opens from its gear: where it sits, whether it makes room, its opacity and when it shows.',
  points: [
    '`useWidgetOptionsMenu` turns the options into [DropdownMenu] groups, which `Widget` opens from its gear.',
    'Choices are radio sub-menus, toggles are checks with a dim mark when off, and actions are plain items.',
    'Picking a check or a radio keeps the menu open; Reset closes it.',
    'In its own window it adds pin, snap and follow the main window; a widget adds its own groups through `own`.',
    'The menu sits in the top layer and stays inside the window; [[Esc]], a press outside or a window blur closes it.',
  ],
  playground: Playground,
  variants: [Docked, Floating, OwnWindow, FrameOnly],
  code: CODE,
});

export default meta;
export { Docked, Floating, FrameOnly, Overview, OwnWindow, Playground };
