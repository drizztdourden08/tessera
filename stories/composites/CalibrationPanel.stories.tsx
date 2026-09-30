/* @layer stories @kind story */
import type { StoryLiteArgTypes, StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { CalibrationPanel } from '../../src/composites';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import type { StateProps } from '../_template/states/states.type';
import { StickCalibrationDemo } from './_samples/StickCalibrationDemo';
import { TriggerCalibrationDemo } from './_samples/TriggerCalibrationDemo';
import './CalibrationPanel.stories.css';

type PanelArgs = {
  title: string;
  instruction: string;
  readout: string;
  actionLabel: string;
  actionDisabled: boolean;
  cancelLabel: string;
};

const ARGS: Partial<PanelArgs> = {
  title: 'Calibrate Left stick',
  instruction: 'Roll the stick around its full edge a few times.',
  readout: 'span x 0.84  y 0.61',
  actionLabel: 'Next',
  actionDisabled: true,
  cancelLabel: 'Cancel',
};

const ARG_TYPES: StoryLiteArgTypes<PanelArgs> = {
  title: { control: 'text' },
  instruction: { control: 'text', description: 'What to do in this step.' },
  readout: { control: 'text', description: 'A live line of numbers. Empty hides it.' },
  actionLabel: { control: 'text' },
  actionDisabled: { control: 'boolean', description: 'The step still waits for input.' },
  cancelLabel: { control: 'text' },
};

const meta = {
  title: 'Composites · Input devices/CalibrationPanel',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<PanelArgs>;

const draw = (args: PanelArgs) => (
  <CalibrationPanel
    className="calibration-panel-story"
    title={args.title}
    instruction={args.instruction}
    readout={args.readout || undefined}
    action={{ label: args.actionLabel, disabled: args.actionDisabled, onClick: () => undefined }}
    onCancel={() => undefined}
    cancelLabel={args.cancelLabel}
  />
);

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => draw(args),
} satisfies StoryLiteStoryDefinition<PanelArgs>;

const Stick = {
  name: 'A stick, step by step',
  render: () => <Box className="calibration-panel-story"><StickCalibrationDemo /></Box>,
} satisfies StoryLiteStoryDefinition<PanelArgs>;

const Trigger = {
  name: 'A trigger, step by step',
  render: () => <Box className="calibration-panel-story"><TriggerCalibrationDemo /></Box>,
} satisfies StoryLiteStoryDefinition<PanelArgs>;

const renderState = (props: StateProps) => draw({ ...(ARGS as PanelArgs), actionDisabled: props.waiting === true });

const CODE = `import { CalibrationPanel, StickPlot } from '@drizztdourden08/tessera';

<CalibrationPanel
  title="Calibrate Left stick"
  instruction="Roll the stick around its full edge a few times."
  readout={\`span x \${spanX.toFixed(2)}  y \${spanY.toFixed(2)}\`}
  action={{ label: 'Next', disabled: !wideEnough, onClick: nextStep }}
  onCancel={close}
>
  <StickPlot x={x} y={y} size="lg" range={range} center={center} />
</CalibrationPanel>`;

const Overview = overviewStory({
  component: 'CalibrationPanel',
  description: 'The frame of one calibration step for a stick, a trigger or any other input: a title, what to do now, a live readout in small monospace, the step content, then Cancel and the step action. The host owns the steps and the maths and passes the current step as plain values: its instruction, its readout and one action with a label, a disabled flag and a handler. Put a StickPlot, a StatRow over a ProgressBar, or Sliders for the dead zones in its children.',
  playground: Playground,
  variants: [Stick, Trigger],
  states: {
    render: renderState,
    list: [
      { name: 'Idle' },
      { name: 'Waiting for input', props: { waiting: true } },
    ],
  },
  code: CODE,
});

export default meta;
export { Overview, Playground, Stick, Trigger };
