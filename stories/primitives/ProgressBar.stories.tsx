/* @layer stories @kind story */
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, Button, ProgressBar } from '../../src/primitives';
import type { ProgressTone } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { LiveTrigger } from './_samples/LiveTrigger';

type SecondaryChoice = ProgressTone | 'none';

type ProgressBarArgs = {
  value: number;
  max: number;
  tone: ProgressTone;
  secondaryValue: number;
  secondaryTone: SecondaryChoice;
  live: boolean;
  showValue: boolean;
};

const TONES: readonly ProgressTone[] = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'info'];

const ARGS: Partial<ProgressBarArgs> = { value: 42, max: 216, tone: 'primary', secondaryValue: 0, secondaryTone: 'none', live: false, showValue: false };

const ARG_TYPES: PlaygroundArgTypes<ProgressBarArgs> = {
    value: { group: 'Value', control: 'number' },
    max: { group: 'Value', control: 'number' },
    secondaryValue: { group: 'Value', control: 'number', description: 'Zero hides the second fill.' },
    tone: { group: 'Appearance', control: 'select', options: [...TONES] },
    secondaryTone: { group: 'Appearance', control: 'select', options: ['none', ...TONES] },
    live: { group: 'Behaviour', control: 'boolean' },
    showValue: { group: 'Content', control: 'boolean', description: 'The value at the end of the bar, a percent by default.' },
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
      <ProgressBar value={value} showValue />
      <Box className="story-row">
        <Button size="sm" onClick={start} loading={running}>
          Extract assets
        </Button>
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
      tone={args.tone}
      secondaryValue={args.secondaryValue > 0 ? args.secondaryValue : undefined}
      secondaryTone={args.secondaryTone === 'none' ? undefined : args.secondaryTone}
      live={args.live}
      showValue={args.showValue}
    />
  ),
} satisfies PlaygroundStory<ProgressBarArgs>;

const BARS: Readonly<Record<string, ReactNode>> = {
  ...Object.fromEntries(TONES.map((tone) => [tone, <ProgressBar key={tone} value={60} tone={tone} />])),
  'empty and full': (
    <Box className="story-column">
      <ProgressBar value={0} />
      <ProgressBar value={100} />
    </Box>
  ),
  'done over reachable, faded secondary': <ProgressBar value={30} secondaryValue={70} />,
  'done over reachable, coloured secondary': <ProgressBar value={30} secondaryValue={70} secondaryTone="secondary" />,
  'with its value': <ProgressBar value={42} showValue />,
  'with a value of its own': <ProgressBar value={12} max={40} showValue formatValue={(value, max) => `${value} / ${max} checks`} />,
};

const Variants = {
  name: 'Variants',
  render: () => (
    <Demonstrator rows={axis(Object.keys(BARS))} align="stretch" cell={(row) => BARS[row]} />
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
  description: 'A thin bar that shows how much of a task or a total is done.',
  points: [
    '`tone` picks a theme colour or an urgency, and the bar fills the width it is given.',
    '`secondaryValue` draws a second fill behind the main one, such as reachable against done.',
    '`live` turns off the easing for a value that changes every frame.',
    '`showValue` writes the value at its end, a percent unless `formatValue(value, max)` says otherwise.',
  ],
  instead: '[ProgressRing] for a round one, [Spinner] when the length is unknown, or [StackedBar] for parts of a whole.',
  playground: Playground,
  variants: [Variants, Trigger],
});

export default meta;
export { Loading, Overview, Playground, Trigger, Variants };
