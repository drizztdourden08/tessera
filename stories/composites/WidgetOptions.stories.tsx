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
  ownRows: { group: 'Content', control: 'boolean', description: 'The widget adds its own OptionRows: a sort SegmentedControl and two sm Toggles, each with a hint. They change the player list.' },
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
const OwnWindow = story('In its own window: pin, snap, sync and group', { placement: 'popped' });
const FrameOnly = story('Frame options only', { ownRows: false });

const CODE = `import { OptionRow, WidgetOptions } from '@drizztdourden08/tessera';

<WidgetOptions
  title="Players"
  placement="docked"
  dockEdge="left"
  makeRoom={makeRoom}
  opacity={frame.opacity}
  show={frame.show}
  anchorRef={gearRef}
  onDock={(edge) => dock('players', edge)}
  onFloat={() => float('players')}
  onPopOut={() => popOut('players')}
  onMakeRoomChange={setMakeRoom}
  onOpacityChange={(opacity) => setFrame({ opacity })}
  onShowChange={(show) => setFrame({ show })}
  onReset={reset}
  onClose={closeOptions}
>
  <OptionRow label="Rows">
    <Toggle
      size="sm"
      checked={compact}
      onChange={setCompact}
      hint={{ label: 'Compact rows', description: 'One line per player, no avatars' }}
    />
  </OptionRow>
</WidgetOptions>`;

const Overview = overviewStory({
  component: 'WidgetOptions',
  description: 'The options panel every widget gets from its gear, pinned under the button. Every choice is a small icon SegmentedControl, and pointing at or tabbing to any option shows its value and what it does in the hint line at the bottom, a HintLine reading the HintScope the panel wraps around its rows. Placement docks the widget to an edge, floats it over the main view, or sends it to its own window; in its own window a pop in button brings it back. A docked widget makes room or lies over the main view as an overlay; a widget in its own window picks how it pins, whether it snaps to edges, whether it follows the main window and which window group it joins, the last two each with an info icon whose tooltip says what they do. Opacity is an sm Slider, Show picks always or only in context, and the widget adds its own OptionRows, whose controls report to the same hint line. The keys button in the header opens the shortcut list in a floating aside beside the panel and remembers that for the session; reset and close sit next to it. Escape, the close button and a press outside close the panel. Each example is a small app: a session view and a Players widget, with the panel open on the gear as soon as the example scrolls into view. Every choice acts on the scene: placement moves the widget, Make room and Overlay change the main view, opacity fades the frame, Show hides the widget when the Session running switch is off, and the sort, compact and finished rows change the list. The line under the scene shows every value the panel set.',
  playground: Playground,
  variants: [Docked, Floating, OwnWindow, FrameOnly],
  code: CODE,
});

export default meta;
export { Docked, Floating, FrameOnly, Overview, OwnWindow, Playground };
