/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { SPACING } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Core · Tokens/Gap',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Gap',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Gap takes a step of the one spacing scale, never a raw length.</Text>
      <TokenTable entries={SPACING} specimen="gap" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Gap',
  description: 'The gap between items in a flex or grid layout, from the one spacing scale.',
  points: [
    'Gap takes a `--space-*` step, from `--space-2xs` to `--space-2xl`, never a raw length.',
    'Each row shows the step on a sample, beside its value.',
    'Gap keeps spacing on the parent, so a child added or removed leaves no stray margin.',
  ],
  instead: '[Padding] inside an element, or [Margin] outside one.',
  variants: [Values],
});

export default meta;
export { Overview, Values };
