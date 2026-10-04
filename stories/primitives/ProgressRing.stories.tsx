/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, ProgressRing } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './ProgressRing.stories.css';

type RingSize = 'sm' | 'md' | 'lg';

type ProgressRingArgs = {
  progress: number;
  showFill: boolean;
  radius: number;
  strokeWidth: number;
  size: RingSize;
};

const SIZES: readonly RingSize[] = ['sm', 'md', 'lg'];

const STEPS = [0, 0.25, 0.5, 0.75, 1] as const;

const ARGS: Partial<ProgressRingArgs> = { progress: 0.6, showFill: true, radius: 15, strokeWidth: 2.5, size: 'lg' };

const ARG_TYPES: PlaygroundArgTypes<ProgressRingArgs> = {
    progress: { group: 'Value', control: 'range', min: 0, max: 1, step: 0.05, description: 'Fill fraction, 0 to 1.' },
    showFill: { group: 'Appearance', control: 'boolean', description: 'Off omits progress, which draws the track alone.' },
    radius: { group: 'Appearance', control: 'number' },
    strokeWidth: { group: 'Appearance', control: 'number' },
    size: { group: 'Appearance', control: 'select', options: [...SIZES], description: 'Story wrapper width; the ring fills its box.' },
  };

const meta = {
  title: 'Primitives · Feedback/ProgressRing',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ProgressRingArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <ProgressRing
      className={`progress-ring-story--${args.size}`}
      progress={args.showFill ? args.progress : undefined}
      radius={args.radius}
      strokeWidth={args.strokeWidth}
    />
  ),
} satisfies PlaygroundStory<ProgressRingArgs>;

const STEP_COLUMNS = [...STEPS.map((step) => ({ key: String(step), label: `${step * 100}%` })), { key: 'track', label: 'track only' }];

const SIZE_COLUMNS = [...axis(SIZES), { key: 'thick', label: 'thick stroke' }];

const ProgressAndSizes = {
  name: 'Progress and sizes',
  render: () => (
    <Box className="story-column">
      <Demonstrator
        columns={STEP_COLUMNS}
        cell={(_row, step) => <ProgressRing className="progress-ring-story--md" progress={step === 'track' ? undefined : Number(step)} />}
      />
      <Demonstrator
        columns={SIZE_COLUMNS}
        cell={(_row, size) => (size === 'thick'
          ? <ProgressRing className="progress-ring-story--lg" progress={0.4} strokeWidth={5} radius={13} />
          : <ProgressRing className={`progress-ring-story--${size}`} progress={0.4} />)}
      />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ProgressRingArgs>;

const Overview = overviewStory({
  component: 'ProgressRing',
  description: 'A circular progress indicator, the round counterpart to [ProgressBar].',
  points: [
    '`progress` is a fraction from 0 to 1; leave it out and only the track is drawn.',
    'The ring fills its box, so its size comes from a class or its container.',
    '`radius` and `strokeWidth` set the line.',
  ],
  playground: Playground,
  variants: [ProgressAndSizes],
});

export default meta;
export { Overview, Playground, ProgressAndSizes };
