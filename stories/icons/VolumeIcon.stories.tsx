/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { VolumeIcon } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { VolumeIconCycle } from './VolumeIconCycle';
import { VolumeIconLive } from './VolumeIconLive';
import { VolumeIconSteps } from './VolumeIconSteps';
import './icons.stories.css';

type VolumeIconArgs = {
  level: number;
  muted: boolean;
  size: number;
};

const ARG_TYPES: PlaygroundArgTypes<VolumeIconArgs> = {
  level: { group: 'State', control: 'range', min: 0, max: 1, step: 0.05, description: 'The sound level, from 0 to 1.' },
  muted: { group: 'State', control: 'boolean' },
  size: { group: 'Appearance', control: 'number' },
};

const meta = {
  title: 'Core · Icons/VolumeIcon',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<VolumeIconArgs>;

const Playground = {
  name: 'Playground',
  args: { level: 0.6, muted: false, size: 32 },
  argTypes: ARG_TYPES,
  render: (args) => <VolumeIcon level={args.level} muted={args.muted} size={args.size} />,
} satisfies PlaygroundStory<VolumeIconArgs>;

const Steps = {
  name: 'Every step, at 0, 25, 50, 75 and 100% and muted',
  render: () => <VolumeIconSteps />,
} satisfies StoryLiteStoryDefinition<VolumeIconArgs>;

const Cycle = {
  name: 'The level rising and falling by itself',
  render: () => <VolumeIconCycle />,
} satisfies StoryLiteStoryDefinition<VolumeIconArgs>;

const Live = {
  name: 'Drag the level, or mute',
  render: () => <VolumeIconLive />,
} satisfies StoryLiteStoryDefinition<VolumeIconArgs>;

const Overview = overviewStory({
  component: 'VolumeIcon',
  description: 'A sound level icon: a white speaker, waves in the primary colour that grow in four steps as the level rises, and a red X at 0 or muted.',
  points: [
    '`level` runs from 0 to 1: one wave up to 25%, two up to 50%, three up to 75% and four above that.',
    'Each step makes the shown waves taller, as every arc draws out from its middle toward its tips.',
    'Waves take `--c-volume-wave`, the primary colour; the speaker takes `--c-text`, white on the dark ground.',
    'At 0 or with `muted` the waves fade out as a red X draws in.',
    'Every change morphs over 390 ms on transform, opacity and stroke offset; reduced motion switches at once.',
    '[VolumeControl] and the [Video] bar draw it; use it alone beside a level shown somewhere else.',
  ],
  playground: Playground,
  variants: [Steps, Cycle, Live],
});

export default meta;
export { Cycle, Live, Overview, Playground, Steps };
