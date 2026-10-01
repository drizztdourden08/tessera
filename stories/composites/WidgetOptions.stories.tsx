/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
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
  ownRows: false,
};

const ARG_TYPES: StoryLiteArgTypes<OptionsArgs> = {
  title: { control: 'text' },
  placement: { control: 'select', options: ['docked', 'floating', 'popped'], description: 'Where the widget lives when the panel opens.' },
  canPopOut: { control: 'boolean', description: 'Shows the own window option; a widget that cannot leave the app hides it.' },
  makeRoomHint: { control: 'text', description: 'The hint line text for Make room.' },
  contextLabel: { control: 'text', description: 'The Show choice for a widget seen only in context.' },
  ownRows: { control: 'boolean', description: 'The widget adds its own OptionRow, an xs Toggle with a hint.' },
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
} satisfies StoryLiteStoryDefinition<OptionsArgs>);

const Playground = story('Playground', {});
const Docked = story('Docked widget', {});
const Floating = story('Floating widget', { placement: 'floating' });
const OwnWindow = story('Own window', { placement: 'popped' });
const OwnRows = story('With the widget\'s own rows', { ownRows: true });

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
      size="xs"
      checked={compact}
      onChange={setCompact}
      hint={{ label: 'Compact rows', description: 'One line per player, no avatars' }}
    />
  </OptionRow>
</WidgetOptions>`;

const Overview = overviewStory({
  component: 'WidgetOptions',
  description: 'The options panel every widget gets from its gear, pinned under the button. Every choice is a small icon SegmentedControl, and pointing at or tabbing to any option shows its value and what it does in the hint line at the bottom, a HintLine reading the HintScope the panel wraps around its rows. Placement docks the widget to an edge, floats it over the main view, or sends it to its own window; in its own window a pop in button brings it back. A docked widget makes room or lies over the main view as an overlay; a widget in its own window picks how it pins and whether it snaps to edges. Opacity is an xs Slider, Show picks always or only in context, and the widget adds its own OptionRows, whose controls report to the same hint line. The keys button in the header opens the shortcut list in a floating aside beside the panel and remembers that for the session; reset and close sit next to it. Escape, the close button and a press outside close the panel. Press the gear in each example to open it; the line beside the gear shows every value the panel set.',
  playground: Playground,
  variants: [Docked, Floating, OwnWindow, OwnRows],
  code: CODE,
});

export default meta;
export { Docked, Floating, Overview, OwnRows, OwnWindow, Playground };
