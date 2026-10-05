/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { StageScreen } from '../../src/composites';
import { Box, Button, Icon, Span, Status } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LivePressedGrid } from './_samples/LivePressedGrid';
import { ScreenDemo } from './_samples/ScreenDemo';
import { StickCalibrationDemo } from './_samples/StickCalibrationDemo';
import { TriggerCalibrationDemo } from './_samples/TriggerCalibrationDemo';
import './StageScreen.stories.css';

type StageArgs = {
  withToolbar: boolean;
  withDone: boolean;
};

const TOOLBAR = (
  <>
    <Status tone="success" variant="pill">Xbox controller connected</Status>
    <Button size="sm" variant="secondary" icon={<Icon name="refresh-cw" size={14} />}>Rescan</Button>
    <Span tone="muted" className="stage-screen-story__hint">Press any button to see it light up</Span>
  </>
);

const StageDemo = (props: StageArgs & { phone?: boolean }) => {
  const { withToolbar, withDone, phone } = props;
  const [hidden, setHidden] = useState(false);
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="Done and the close button both hide the screen" phone={phone}>
      <StageScreen
        title="Input calibration"
        subtitle="Player 1"
        icon={<Icon name="gamepad-2" />}
        heading="Xbox controller"
        hidden={hidden}
        onClose={() => setHidden(true)}
        toolbar={withToolbar ? TOOLBAR : undefined}
        done={withDone ? { onSelect: () => setHidden(true) } : undefined}
      >
        <Box className="stage-screen-story__grid">
          <StickCalibrationDemo />
          <TriggerCalibrationDemo />
          <LivePressedGrid family="xbox" />
        </Box>
      </StageScreen>
    </ScreenDemo>
  );
};

const ARGS: Partial<StageArgs> = { withToolbar: true, withDone: true };

const ARG_TYPES: PlaygroundArgTypes<StageArgs> = {
  withToolbar: { group: 'Content', control: 'boolean', description: 'A status and a few tools in the header, after the heading.' },
  withDone: { group: 'Content', control: 'boolean', description: 'A Done button at the end of the header.' },
};

const meta = {
  title: 'Composites · Screens/StageScreen',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<StageArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StageDemo {...args} />,
} satisfies PlaygroundStory<StageArgs>;

const StageOnly = {
  name: 'The stage alone',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <StageDemo withToolbar={false} withDone={false} />,
} satisfies PlaygroundStory<StageArgs>;

const Narrow = {
  name: 'In a narrow box',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <StageDemo {...args} phone />,
} satisfies PlaygroundStory<StageArgs>;

const CODE = `import { Card, Icon, SectionHeader, StageScreen, Status, StickPlot } from '@drizztdourden08/tessera';

<StageScreen
  title="Input calibration"
  icon={<Icon name="gamepad-2" />}
  heading="Xbox controller"
  onClose={close}
  toolbar={<Status tone="success" variant="pill">Controller connected</Status>}
  done={{ onClick: close }}
>
  <Card>
    <SectionHeader title="Calibrate Left stick" subtitle={step.text} />
    <StickPlot x={x} y={y} size="lg" />
  </Card>
</StageScreen>`;

const Overview = overviewStory({
  component: 'StageScreen',
  description: 'One big screen for custom work the app draws itself, such as calibration, a HUD layout or a map.',
  points: [
    '`icon` and `heading` are required; the stage is the body under the page header.',
    '`toolbar` sits in the header after the heading, for a status and a few tools.',
    '`done` adds a primary button at the end of the header; it reads Done unless its `label` says otherwise.',
    'The stage scrolls when its content is larger, and its content can place layers inside it.',
    'Short of room, the toolbar moves to a row under the heading and wraps its items there.',
  ],
  instead: '[WorkspaceScreen] for pages the user moves between, or [UtilityScreen] for a task with a status.',
  playground: Playground,
  variants: [StageOnly, Narrow],
  code: CODE,
});

export default meta;
export { Narrow, Overview, Playground, StageOnly };
