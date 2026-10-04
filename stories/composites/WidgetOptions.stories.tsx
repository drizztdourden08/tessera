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
  ownRows: { group: 'Content', control: 'boolean', description: 'The widget adds its own ControlMenuRows: a sort SegmentedControl and two sm Toggles, each with a hint. They change the player list.' },
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
const Docked = story('Docked on the right, with its own rows', {});
const Floating = story('Floating over the main view', { placement: 'floating' });
const OwnWindow = story('In its own window: pin, snap and sync', { placement: 'popped' });
const FrameOnly = story('Frame options only', { ownRows: false });

const CODE = `import { ControlMenuRow, Widget, WidgetOptions } from '@drizztdourden08/tessera';

const options = (
  <WidgetOptions
    title="Players"
    placement="docked"
    dockEdge="left"
    makeRoom={makeRoom}
    opacity={frame.opacity}
    show={frame.show}
    onDock={(edge) => dock('players', edge)}
    onFloat={() => float('players')}
    onPopOut={() => popOut('players')}
    onMakeRoomChange={setMakeRoom}
    onOpacityChange={(opacity) => setFrame({ opacity })}
    onShowChange={(show) => setFrame({ show })}
    onReset={reset}
  >
    <ControlMenuRow label="Rows">
      <Toggle size="sm" checked={compact} onChange={setCompact} hint={{ label: 'Compact rows', description: 'One line per player' }} />
    </ControlMenuRow>
  </WidgetOptions>
);

<Widget id="players" tabs={tabs} activeId="players" paneKey={pane.key} opacity={frame.opacity} options={options} onClose={close}>
  <PlayerList />
</Widget>`;

const Overview = overviewStory({
  component: 'WidgetOptions',
  description: 'The options every widget opens from its gear, a [ControlMenu]: where it sits, whether it makes room, its opacity and when it shows.',
  points: [
    'Each choice is a small icon [SegmentedControl], explained in the hint line when you point at it.',
    'Placement docks the widget to an edge, floats it over the main view, or sends it to its own window.',
    'In its own window it adds pin, snap and follow the main window.',
    'The widget adds its own `ControlMenuRow`s as children; the filter at the top narrows every row by label.',
    'Shortcuts opens a sub-panel of keys; [[Esc]], a press outside or the window losing focus closes the menu.',
  ],
  playground: Playground,
  variants: [Docked, Floating, OwnWindow, FrameOnly],
  code: CODE,
});

export default meta;
export { Docked, Floating, FrameOnly, Overview, OwnWindow, Playground };
