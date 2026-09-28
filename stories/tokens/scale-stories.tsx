/* @layer stories @kind logic */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { Box } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { ScaleRow } from './scale-row';
import type { Specimen } from './scale-row';
import './scale-stories.css';

interface ScaleStoriesParams {
  name: string;
  description: string;
  specimen: Specimen;
  tokens: readonly string[];
}

const scaleStories = (params: ScaleStoriesParams) => {
  const { name, description, specimen, tokens } = params;
  const Values = {
    name,
    render: () => (
      <Box className="scale-section">
        {tokens.map((token) => <ScaleRow key={token} token={token} specimen={specimen} />)}
      </Box>
    ),
  } satisfies StoryLiteStoryDefinition;
  const Overview = overviewStory({ component: name, description, variants: [Values] });
  return { Overview, Values };
};

export { scaleStories };
