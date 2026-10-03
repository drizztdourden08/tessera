/* @layer stories @kind story */
import { useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
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

const StageDemo = (props: StageArgs) => {
  const { withToolbar, withDone } = props;
  const [hidden, setHidden] = useState(false);
  return (
    <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="Done and the close button both hide the screen">
      <StageScreen
        title="Input calibration"
        subtitle="Player 1"
        hidden={hidden}
        onClose={() => setHidden(true)}
        toolbar={withToolbar ? TOOLBAR : undefined}
        done={withDone ? { onClick: () => setHidden(true) } : undefined}
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

const ARG_TYPES: StoryLiteArgTypes<StageArgs> = {
  withToolbar: { control: 'boolean', description: 'A row above the stage for status and tools.' },
  withDone: { control: 'boolean', description: 'A Done button at the end of the toolbar row.' },
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
} satisfies StoryLiteStoryDefinition<StageArgs>;

const StageOnly = {
  name: 'The stage alone',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: () => <StageDemo withToolbar={false} withDone={false} />,
} satisfies StoryLiteStoryDefinition<StageArgs>;

const CODE = `import { Card, SectionHeader, StageScreen, Status, StickPlot } from '@drizztdourden08/tessera';

<StageScreen
  title="Input calibration"
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
  description: 'One big screen for custom work with no navigation of its own: calibration, HUD layout, a map or a sprite editor. It is a ScreenWindow whose content is one open stage that scrolls when its content is larger. toolbar is an optional row above the stage, for a status and a few tools. done adds a primary button at the end of that row; it reads Done unless label says otherwise. The stage holds whatever the app draws, such as one Card per calibration step.',
  playground: Playground,
  points: [
    'Use it when the content is one surface the app draws itself.',
    'The example stage is built from the standard parts only: two calibration steps in Cards, one with a StickPlot and one with a ProgressBar, and a PressedGrid.',
    'For pages the user moves between, use WorkspaceScreen. For a task the app runs with a status, use UtilityScreen.',
    'The stage is a positioned box, so its content can place layers inside it.',
  ],
  variants: [StageOnly],
  code: CODE,
});

export default meta;
export { Overview, Playground, StageOnly };
