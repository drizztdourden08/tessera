/* @layer stories @kind story */
import { useState, useSyncExternalStore } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { ErrorBoundary } from '../../src/composites';
import { Box, Button, StatRow, Text } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { STATE } from '../_template/states/states.constants';
import type { StateProps } from '../_template/states/states.type';

type BoundaryArgs = {
  label: string;
  errorMessage: string;
  withAction: boolean;
};

type PresetSummaryProps = { fail: boolean; errorMessage: string };

const subscribeNever = () => () => undefined;

const PresetSummary = ({ fail, errorMessage }: PresetSummaryProps) => {
  const inBrowser = useSyncExternalStore(subscribeNever, () => true, () => false);
  if (fail && inBrowser) throw new Error(errorMessage);
  return (
    <Box className="story-column">
      <StatRow label="Preset" value="Casual" />
      <StatRow label="Games" value="5" />
      <StatRow label="Hints" value="On" />
    </Box>
  );
};

const RecoverDemo = (props: BoundaryArgs) => {
  const { label, errorMessage } = props;
  const [attempt, setAttempt] = useState(0);
  const retry = <Button size="sm" variant="secondary" onClick={() => setAttempt(attempt + 1)}>Reload preset</Button>;
  return (
    <Box className="story-column">
      <Text className="story-label">The first render fails, the retry succeeds</Text>
      <ErrorBoundary label={label} action={retry} resetKey={attempt}>
        <PresetSummary fail={attempt === 0} errorMessage={errorMessage} />
      </ErrorBoundary>
    </Box>
  );
};

const ARGS: Partial<BoundaryArgs> = {
    label: 'The preset summary could not be shown',
    errorMessage: 'Preset Casual lists a game file that is missing from this computer.',
    withAction: false,
  };

const ARG_TYPES: StoryLiteArgTypes<BoundaryArgs> = {
    label: { control: 'text' },
    errorMessage: { control: 'text' },
    withAction: { control: 'boolean' },
  };

const meta = {
  title: 'Composites · Dialogs/ErrorBoundary',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<BoundaryArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ErrorBoundary
      label={args.label}
      action={args.withAction ? <Button size="sm" variant="secondary">Open preset folder</Button> : undefined}
    >
      <PresetSummary fail errorMessage={args.errorMessage} />
    </ErrorBoundary>
  ),
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const Recoverable = {
  name: 'Recover with a reset key',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <RecoverDemo {...args} />,
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const DefaultLabel = {
  name: 'Default label',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ErrorBoundary>
      <PresetSummary fail errorMessage={args.errorMessage} />
    </ErrorBoundary>
  ),
} satisfies StoryLiteStoryDefinition<BoundaryArgs>;

const renderState = (props: StateProps) => (
  <ErrorBoundary label={ARGS.label}>
    <PresetSummary fail={props.invalid === true} errorMessage={ARGS.errorMessage ?? ''} />
  </ErrorBoundary>
);

const Overview = overviewStory({
  component: 'ErrorBoundary',
  description: 'A fence around a section that might throw while it renders. Wrap any part of a page that reads data it does not control, so one broken section never takes the page down with it. Healthy children render untouched; a thrown error shows as an inline notice in their place, with a headline, the error message and an optional action. A changed reset key drops the error and renders the children again.',
  playground: Playground,
  variants: [DefaultLabel],
  states: {
    render: renderState,
    list: [
      { ...STATE.idle, name: 'Healthy' },
      STATE.error,
    ],
  },
});

export default meta;
export { DefaultLabel, Overview, Playground, Recoverable };
