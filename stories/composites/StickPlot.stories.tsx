/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { StickPlot } from '../../src/composites';
import type { StickPlotPoint, StickPlotRange, StickPlotSize } from '../../src/composites';
import { Flex } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { LiveStickPlot } from './_samples/LiveStickPlot';

type StickArgs = {
  x: number;
  y: number;
  label: string;
  calibrated: boolean;
  showValue: boolean;
  innerDeadzone: number;
  outerDeadzone: number;
  showCalibration: boolean;
  size: StickPlotSize;
};

const SIZES: readonly StickPlotSize[] = ['md', 'lg'];

const RANGE: StickPlotRange = { minX: -0.94, maxX: 0.97, minY: -0.99, maxY: 0.92 };
const CENTER: StickPlotPoint = { x: 0.04, y: -0.03 };

const ARGS: Partial<StickArgs> = {
  x: 0.42, y: -0.31, label: 'Left stick', calibrated: false, showValue: true,
  innerDeadzone: 0, outerDeadzone: 1, showCalibration: false, size: 'md',
};

const ARG_TYPES: PlaygroundArgTypes<StickArgs> = {
  label: { group: 'Content', control: 'text' },
  x: { group: 'Value', control: 'range', min: -1, max: 1, step: 0.05, description: 'Across, from -1 at the left to 1 at the right.' },
  y: { group: 'Value', control: 'range', min: -1, max: 1, step: 0.05, description: 'Down, from -1 at the top to 1 at the bottom.' },
  innerDeadzone: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05, description: 'Radius of the inner dead zone. Zero hides it.' },
  outerDeadzone: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05, description: 'Radius past which the stick reads full. One hides it.' },
  showValue: { group: 'Appearance', control: 'boolean' },
  showCalibration: { group: 'Appearance', control: 'boolean', description: 'Draws a measured range and a recorded center.' },
  size: { group: 'Appearance', control: 'select', options: [...SIZES] },
  calibrated: { group: 'State', control: 'boolean', description: 'Marks the reading as calibrated after the numbers.' },
};

const meta = {
  title: 'Composites · Input devices/StickPlot',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StickArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <StickPlot
      x={args.x}
      y={args.y}
      label={args.label || undefined}
      calibrated={args.calibrated}
      showValue={args.showValue}
      innerDeadzone={args.innerDeadzone > 0 ? args.innerDeadzone : undefined}
      outerDeadzone={args.outerDeadzone < 1 ? args.outerDeadzone : undefined}
      range={args.showCalibration ? RANGE : undefined}
      center={args.showCalibration ? CENTER : undefined}
      size={args.size}
    />
  ),
} satisfies PlaygroundStory<StickArgs>;

const Live = {
  name: 'A stick being moved',
  render: () => (
    <Flex gap="lg" align="start" wrap>
      <LiveStickPlot label="Left stick" />
      <LiveStickPlot label="Left stick" calibrated innerDeadzone={0.15} outerDeadzone={0.9} />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StickArgs>;

const TwoSticks = {
  name: 'Two sticks, one calibrated',
  render: () => (
    <Flex gap="lg" align="start" wrap>
      <StickPlot x={-0.62} y={0.18} label="Left stick" />
      <StickPlot x={0.33} y={-0.71} label="Right stick" calibrated />
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<StickArgs>;

const Calibration = {
  name: 'Large, with dead zones, range and center',
  render: () => (
    <LiveStickPlot size="lg" showValue={false} innerDeadzone={0.12} outerDeadzone={0.92} range={RANGE} center={CENTER} />
  ),
} satisfies StoryLiteStoryDefinition<StickArgs>;

const renderState = (props: StateProps) => (
  <StickPlot
    x={typeof props.x === 'number' ? props.x : 0}
    y={typeof props.y === 'number' ? props.y : 0}
    label="Left stick"
    calibrated={props.calibrated === true}
    innerDeadzone={typeof props.deadzone === 'number' ? props.deadzone : undefined}
  />
);

const CODE = `import { StickPlot } from '@drizztdourden08/tessera';

<StickPlot
  x={stick.x}
  y={stick.y}
  label="Left stick"
  calibrated
  innerDeadzone={0.12}
  outerDeadzone={0.92}
/>`;

const Overview = overviewStory({
  component: 'StickPlot',
  description: 'Where an analog stick points, as a dot on a round plot with its value under it. x and y run from -1 to 1, with y down as a gamepad reports it. The host does the reading and the maths and passes plain numbers. innerDeadzone shades the middle where the stick reads zero and dims the dot inside it; outerDeadzone shades the rim past which it reads full. range outlines the travel measured while calibrating and center marks the recorded rest point. size lg draws it larger for a calibration panel.',
  playground: Playground,
  variants: [Live, TwoSticks, Calibration],
  states: {
    render: renderState,
    list: [
      { name: 'Centered' },
      { name: 'Pushed', props: { x: 0.64, y: -0.52 } },
      { name: 'Inside the dead zone', props: { x: 0.08, y: 0.1, deadzone: 0.2 } },
      { name: 'Calibrated', props: { x: 0.64, y: -0.52, calibrated: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Calibration, Live, Overview, Playground, TwoSticks };
