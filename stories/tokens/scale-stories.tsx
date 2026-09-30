/* @layer stories @kind logic */
import type { StoryLiteStoryDefinition } from '@storylite/storylite';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import { SCALE_COLUMNS } from './ScaleSample.constants';
import { ScaleSample } from './ScaleSample';
import { TokenValue } from './TokenValue';
import type { ScaleStoriesParams } from './scale-stories.type';

const scaleStories = (params: ScaleStoriesParams) => {
  const { name, description, specimen, tokens } = params;
  const Values = {
    name,
    render: () => (
      <Demonstrator
        corner="Token"
        rows={axis(tokens)}
        columns={SCALE_COLUMNS}
        align="start"
        cell={(token, column) => (column === 'value' ? <TokenValue token={token} /> : <ScaleSample token={token} specimen={specimen} />)}
      />
    ),
  } satisfies StoryLiteStoryDefinition;
  const Overview = overviewStory({ component: name, description, variants: [Values] });
  return { Overview, Values };
};

export { scaleStories };
