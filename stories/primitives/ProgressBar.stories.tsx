/* @layer stories @kind story */
import { useEffect, useState } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Button, ProgressBar, Text } from '../../src/primitives';
import type { ProgressVariant } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { LiveTrigger } from './_samples/LiveTrigger';

type SecondaryChoice = ProgressVariant | 'none';

type ProgressBarArgs = {
  value: number;
  max: number;
  variant: ProgressVariant;
  secondaryValue: number;
  secondaryVariant: SecondaryChoice;
  live: boolean;
};

const VARIANTS: readonly ProgressVariant[] = ['primary', 'secondary', 'danger'];

const ARGS: Partial<ProgressBarArgs> = { value: 42, max: 216, variant: 'primary', secondaryValue: 0, secondaryVariant: 'none', live: false };

const ARG_TYPES: StoryLiteArgTypes<ProgressBarArgs> = {
    value: { control: 'number' },
    max: { control: 'number' },
    variant: { control: 'select', options: [...VARIANTS] },
    secondaryValue: { control: 'number', description: 'Zero hides the second fill.' },
    secondaryVariant: { control: 'select', options: ['none', ...VARIANTS] },
    live: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Feedback/ProgressBar',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ProgressBarArgs>;

const LOAD_STEP = 7;
const LOAD_TICK_MS = 120;

const LoadingDemo = () => {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return undefined;
    const timer = setInterval(() => {
      setValue((current) => {
        const next = Math.min(100, current + LOAD_STEP);
        if (next === 100) setRunning(false);
        return next;
      });
    }, LOAD_TICK_MS);
    return () => clearInterval(timer);
  }, [running]);
  const start = () => {
    setValue(0);
    setRunning(true);
  };
  return (
    <Box className="story-column">
      <ProgressBar value={value} />
      <Box className="story-row">
        <Button size="sm" onClick={start} disabled={running}>
          Extract assets
        </Button>
        <Text className="story-label">{value}%</Text>
      </Box>
    </Box>
  );
};

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ProgressBar
      value={args.value}
      max={args.max}
      variant={args.variant}
      secondaryValue={args.secondaryValue > 0 ? args.secondaryValue : undefined}
      secondaryVariant={args.secondaryVariant === 'none' ? undefined : args.secondaryVariant}
      live={args.live}
    />
  ),
} satisfies StoryLiteStoryDefinition<ProgressBarArgs>;

const Variants = {
  name: 'Variants',
  render: () => (
    <Box className="story-column">
      {VARIANTS.map((variant) => (
        <Box key={variant} className="story-column">
          <Text className="story-label">{variant}</Text>
          <ProgressBar value={60} variant={variant} />
        </Box>
      ))}
      <Text className="story-label">empty and full</Text>
      <ProgressBar value={0} />
      <ProgressBar value={100} />
      <Text className="story-label">done over reachable, faded secondary</Text>
      <ProgressBar value={30} secondaryValue={70} />
      <Text className="story-label">done over reachable, coloured secondary</Text>
      <ProgressBar value={30} secondaryValue={70} secondaryVariant="secondary" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ProgressBarArgs>;

const Loading = {
  name: 'Filling over time',
  render: () => <LoadingDemo />,
} satisfies StoryLiteStoryDefinition<ProgressBarArgs>;

const Trigger = {
  name: 'A live reading under a StatRow',
  render: () => <LiveTrigger />,
} satisfies StoryLiteStoryDefinition<ProgressBarArgs>;

const Overview = overviewStory({
  component: 'ProgressBar',
  description: 'A thin bar that shows how much of a task or a total is done. It comes in primary, secondary and danger, and fills the width it is given. An optional second fill behind the main one shows a second amount, such as reachable against done, and live turns off the easing for a value that changes every frame. Under a StatRow with mono on, a live bar reads out an analog trigger or any other axis.',
  playground: Playground,
  variants: [Variants, Trigger],
});

export default meta;
export { Loading, Overview, Playground, Trigger, Variants };
