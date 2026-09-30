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
  canPopOut: { control: 'boolean', description: 'Shows Pop out; a widget that cannot leave the app hides it.' },
  makeRoomHint: { control: 'text', description: 'The line under Make room.' },
  contextLabel: { control: 'text', description: 'The Show choice for a widget seen only in context.' },
  ownRows: { control: 'boolean', description: 'The widget adds its own OptionRows.' },
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
  <OptionRow label="Compact rows" hint="One line per player">
    <Toggle checked={compact} onChange={setCompact} />
  </OptionRow>
</WidgetOptions>`;

const Overview = overviewStory({
  component: 'WidgetOptions',
  description: 'The options panel every widget gets from its gear, pinned under the button. Placement docks the widget to an edge, floats it over the main view, or sends it to its own window and back. A docked widget can make room or lie over the main view; a widget in its own window picks how it pins and whether it snaps to edges. Opacity sets the frame, Show picks always or only in context, the widget adds its own OptionRows, and the keys the dock answers to are listed at the bottom above a reset. Escape, the close button and a press outside close it. Press the gear in each example to open the panel.',
  playground: Playground,
  variants: [Docked, Floating, OwnWindow, OwnRows],
  code: CODE,
});

export default meta;
export { Docked, Floating, Overview, OwnRows, OwnWindow, Playground };
