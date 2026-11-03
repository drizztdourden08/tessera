/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { overviewStory } from '../_template/overview-story';
import { ZoomFieldDemo } from './_samples/ZoomFieldDemo';

type SliderChoice = 'none' | 'beside' | 'below';

type ZoomFieldArgs = { label: string; min: number; max: number; fit: boolean; slider: SliderChoice; disabled: boolean };

const ARGS: ZoomFieldArgs = { label: 'Zoom', min: 25, max: 1600, fit: true, slider: 'none', disabled: false };

const ARG_TYPES: PlaygroundArgTypes<ZoomFieldArgs> = {
  label: { group: 'Content', control: 'text', description: 'Names the field and is drawn before it.' },
  min: { group: 'Value', control: 'range', min: 5, max: 100, step: 5, description: 'The lowest zoom, in percent.' },
  max: { group: 'Value', control: 'range', min: 200, max: 12800, step: 200, description: 'The highest zoom, in percent.' },
  fit: { group: 'Content', control: 'boolean', description: 'Adds a Fit button through the actions slot.' },
  slider: { group: 'Layout', control: 'select', options: ['none', 'beside', 'below'], description: 'A log slider on the same range.' },
  disabled: { group: 'State', control: 'boolean' },
};

const meta = {
  title: 'Composites · Inputs/ZoomField',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ZoomFieldArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: ({ slider, ...args }) => <ZoomFieldDemo {...args} slider={slider === 'none' ? undefined : slider} />,
} satisfies PlaygroundStory<ZoomFieldArgs>;

const Bare = {
  name: 'No presets: the stops double from the lowest zoom',
  render: () => <ZoomFieldDemo presets={[]} fit={false} />,
} satisfies StoryLiteStoryDefinition<ZoomFieldArgs>;

const Wide = {
  name: 'A wide range, with presets inside it only',
  render: () => <ZoomFieldDemo min={100} max={12800} presets={[25, 100, 400, 1600, 12800]} />,
} satisfies StoryLiteStoryDefinition<ZoomFieldArgs>;

const LogSlider = {
  name: 'With a log slider below',
  render: () => <ZoomFieldDemo slider="below" />,
} satisfies StoryLiteStoryDefinition<ZoomFieldArgs>;

const CODE = `import { Button, ZoomField } from '@drizztdourden08/tessera';

const [zoom, setZoom] = useState(100);

<ZoomField
  value={zoom}
  onChange={setZoom}
  min={25}
  max={1600}
  presets={[25, 50, 100, 200, 400]}
  actions={<Button size="xs" variant="ghost" onClick={fit}>Fit</Button>}
/>`;

const Overview = overviewStory({
  component: 'ZoomField',
  description: 'A zoom value in percent with step buttons, preset chips and a slot for extra buttons such as fit.',
  points: [
    '`value` is a percent and `onChange` sets it; `min` and `max` bound it, and a typed value is clamped.',
    'The minus and plus buttons, the wheel and the arrow keys move along the stops between `min` and `max`.',
    '`presets` draws a chip for each percent; the chip for the current value is pressed.',
    'With no `presets` the stops double from `min`, such as 25, 50, 100 and 200.',
    '`slider` adds a log slider beside or below the field, on the same stops.',
    '`actions` is a slot after the chips, for a Fit button or any other control.',
  ],
  instead: '[NumberField] for any number that is not a zoom.',
  playground: Playground,
  variants: [Bare, Wide, LogSlider],
  code: CODE,
});

export default meta;
export { Bare, LogSlider, Overview, Playground, Wide };
