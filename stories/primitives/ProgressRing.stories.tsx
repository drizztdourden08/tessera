/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, ProgressRing, Text } from '../../src/primitives';
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

const ARG_TYPES: StoryLiteArgTypes<ProgressRingArgs> = {
    progress: { control: 'number', description: 'Fill fraction, 0 to 1.' },
    showFill: { control: 'boolean', description: 'Off omits progress, which draws the track alone.' },
    radius: { control: 'number' },
    strokeWidth: { control: 'number' },
    size: { control: 'select', options: [...SIZES], description: 'Story wrapper width; the ring fills its box.' },
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
} satisfies StoryLiteStoryDefinition<ProgressRingArgs>;

const ProgressAndSizes = {
  name: 'Progress and sizes',
  render: () => (
    <Box className="story-column">
      <Box className="story-row">
        {STEPS.map((step) => (
          <Box key={step} className="story-column">
            <ProgressRing className="progress-ring-story--md" progress={step} />
            <Text className="story-label">{step * 100}%</Text>
          </Box>
        ))}
        <Box className="story-column">
          <ProgressRing className="progress-ring-story--md" />
          <Text className="story-label">track only</Text>
        </Box>
      </Box>
      <Box className="story-row">
        {SIZES.map((size) => (
          <Box key={size} className="story-column">
            <ProgressRing className={`progress-ring-story--${size}`} progress={0.4} />
            <Text className="story-label">{size}</Text>
          </Box>
        ))}
        <Box className="story-column">
          <ProgressRing className="progress-ring-story--lg" progress={0.4} strokeWidth={5} radius={13} />
          <Text className="story-label">thick stroke</Text>
        </Box>
      </Box>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<ProgressRingArgs>;

const Overview = overviewStory({
  component: 'ProgressRing',
  description: 'A circular progress indicator, the round counterpart to ProgressBar. progress is a fraction from 0 to 1; leave it out and only the track is drawn. The ring fills the box it is given, so its size comes from a class or its container, and radius and strokeWidth set the line.',
  playground: Playground,
  variants: [ProgressAndSizes],
});

export default meta;
export { Overview, Playground, ProgressAndSizes };
