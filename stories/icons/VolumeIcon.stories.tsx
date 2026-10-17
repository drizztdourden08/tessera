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
  description: 'The speaker of a sound level: gold waves that grow in steps as the level rises, and a red X at 0 or muted.',
  points: [
    '`level` runs from 0 to 1: up to a third draws one wave, up to two thirds two, and above that three.',
    'Each wave is larger and reaches further; a new one grows out of the speaker as the old ones stay.',
    'At 0 or with `muted` the waves fade out as a red X draws in; the speaker keeps the text colour.',
    'Every change morphs over 390 ms on transform, opacity and stroke offset, so the box never moves.',
    'Under reduced motion the icon switches at once.',
    '[VolumeControl] and the [Video] bar draw it; use it alone beside a level shown somewhere else.',
  ],
  playground: Playground,
  variants: [Steps, Cycle, Live],
});

export default meta;
export { Cycle, Live, Overview, Playground, Steps };
