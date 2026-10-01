/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box, HintLine } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { HintScopeDemo } from './_samples/HintScopeDemo';
import './_samples/SegmentHintDemo.css';

type HintLineArgs = {
  label: string;
  description: string;
  idle: string;
  lines: 1 | 2;
  pointed: boolean;
};

const ARGS: Partial<HintLineArgs> = {
  label: 'Dock left',
  description: 'Takes the left edge of the app',
  idle: 'Point at an option to see what it does',
  lines: 2,
  pointed: true,
};

const ARG_TYPES: StoryLiteArgTypes<HintLineArgs> = {
  label: { control: 'text', description: 'The value, in the text colour.' },
  description: { control: 'text', description: 'What it does, muted.' },
  idle: { control: 'text', description: 'The line shown while nothing is pointed at.' },
  lines: { control: 'select', options: [1, 2], description: 'The fixed height, in lines. Longer text is cut with an ellipsis.' },
  pointed: { control: 'boolean', description: 'Off passes hint={null}, so the idle line shows.' },
};

const meta = {
  title: 'Primitives · Feedback/HintLine',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<HintLineArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="segment-hint-demo__panel">
      <HintLine hint={args.pointed ? { label: args.label, description: args.description } : null} idle={args.idle} lines={args.lines} />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<HintLineArgs>;

const LONG = { label: 'With app', description: 'On top exactly when the app is, and comes forward with it whenever the app is brought to the front' };

const SHORT = { label: 'Float', description: 'Hovers over the main view' };

const CONTENT = { Idle: null, Short: SHORT, Long: LONG } as const;

const Content = {
  name: 'Idle, short and long, at one and two lines',
  render: () => (
    <Demonstrator
      rows={axis(['Idle', 'Short', 'Long'] as const)}
      columns={axis(['2 lines', '1 line'] as const)}
      cell={(row, column) => (
        <Box className="segment-hint-demo__panel">
          <HintLine hint={CONTENT[row]} lines={column === '1 line' ? 1 : 2} />
        </Box>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<HintLineArgs>;

const FromScope = {
  name: 'Reading a HintScope',
  render: () => <HintScopeDemo />,
} satisfies StoryLiteStoryDefinition<HintLineArgs>;

const CODE = `import { HintLine, HintScope, SegmentedControl } from '@drizztdourden08/tessera';

<HintScope>
  <SegmentedControl
    size="xs"
    aria-label="Placement"
    value={edge}
    onChange={setEdge}
    options={[
      { value: 'left', icon: 'panel-left', hint: { label: 'Dock left', description: 'Takes the left edge of the app' } },
      { value: 'float', icon: 'picture-in-picture-2', hint: { label: 'Float', description: 'Hovers over the main view' } },
    ]}
  />
  <HintLine />
</HintScope>`;

const Overview = overviewStory({
  component: 'HintLine',
  description: 'A line set aside in a panel that says what the option under the pointer or the keyboard focus does: its value in the text colour, then the explanation muted. Inside a HintScope it reads whatever control is pointed at or focused, from SegmentedControl, ToggleGroup, Toggle, Slider, IconButton or anything that uses useHintTarget; outside one, or to show something else, pass hint yourself. While nothing is pointed at it shows an idle line. Its height is fixed at one or two lines and longer text ends in an ellipsis, so the panel never jumps. It is a polite live region, so a screen reader reads each new hint once the user stops moving.',
  playground: Playground,
  variants: [FromScope, Content],
  code: CODE,
});

export default meta;
export { Content, FromScope, Overview, Playground };
