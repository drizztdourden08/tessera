/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { SPACING } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Core · Tokens/Margin',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Margin',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Margin takes a step of the one spacing scale, never a raw length.</Text>
      <TokenTable entries={SPACING} specimen="margin" />
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Margin',
  description: 'The space outside an element, from the one spacing scale.',
  points: [
    'Margin takes a `--space-*` step, from `--space-2xs` to `--space-2xl`, never a raw length.',
    'Each row shows the step on a sample, beside its value.',
    'Vertical margins between stacked blocks collapse, so two margins can show as one.',
  ],
  instead: '[Gap] between items in a layout, or [Padding] inside an element.',
  variants: [Values],
});

export default meta;
export { Overview, Values };
