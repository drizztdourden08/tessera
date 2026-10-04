/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { SIZE_GROUPS } from './dimension-lists';
import { TokenTable } from './token-table';

const meta = {
  title: 'Core · Tokens/Sizes',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta;

const Values = {
  name: 'Sizes',
  render: () => (
    <Box className="story-column">
      <Text className="story-label">Fixed dimensions: the widths, heights and diameters a component holds whatever its content.</Text>
      {SIZE_GROUPS.map((group) => (
        <Box key={group.title} className="scale-section">
          <Text variant="subtitle">{group.title}</Text>
          <TokenTable entries={group.entries} specimen="size" />
        </Box>
      ))}
    </Box>
  ),
} satisfies StoryLiteStoryDefinition;

const Overview = overviewStory({
  component: 'Sizes',
  description: 'Fixed dimensions: the widths, heights and diameters a component holds whatever its content.',
  points: [
    'Grouped by what they size, such as dialogs, controls, the side nav and widgets.',
    'Each one is a step of the [size scale](#/story/tokens-sizescale--overview).',
    'A component reads its own token, such as `--control-h-md`, so an app can change it in one place.',
  ],
  variants: [Values],
});

export default meta;
export { Overview, Values };
