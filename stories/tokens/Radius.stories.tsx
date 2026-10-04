/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { RADIUS } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Core · Tokens/Radius',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Radius',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Every rounded corner takes a step of this one scale.</Text>
      <TokenTable entries={RADIUS} specimen="radius" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Radius',
  description: 'Corner rounding: every rounded corner takes a step of this one scale.',
  points: [
    '`--radius-sm` to `--radius-xl` round chips, controls, cards and panels.',
    '`--radius-pill` gives a fully rounded end; `--radius-round` makes a circle.',
    'A corner never takes a raw length.',
  ],
  variants: [Values],
});

export default meta;
export { Overview, Values };
