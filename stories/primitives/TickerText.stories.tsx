/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, TickerText } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import './TickerText.stories.css';

type TickerTextArgs = {
  text: string;
};

const LONG = 'Fix the login redirect that drops the return path after sign in on the mobile app';

const SHORT = 'Fix the login redirect';

const ARGS: Partial<TickerTextArgs> = { text: LONG };

const ARG_TYPES: PlaygroundArgTypes<TickerTextArgs> = {
  text: { group: 'Content', control: 'text', description: 'A long text slides; a short one stays still.' },
};

const meta = {
  title: 'Primitives · Display/TickerText',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<TickerTextArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="ticker-story__frame">
      <TickerText>{args.text}</TickerText>
    </Box>
  ),
} satisfies PlaygroundStory<TickerTextArgs>;

const Sliding = {
  name: 'A long line slides to its end and back, and stops on hover',
  render: () => (
    <Box className="ticker-story__frame">
      <TickerText>{LONG}</TickerText>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TickerTextArgs>;

const Fits = {
  name: 'A short line does not move',
  render: () => (
    <Box className="ticker-story__frame">
      <TickerText>{SHORT}</TickerText>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<TickerTextArgs>;

const CODE = `import { TickerText } from '@drizztdourden08/tessera';

<TickerText>Fix the login redirect that drops the return path after sign in</TickerText>`;

const Overview = overviewStory({
  component: 'TickerText',
  description: 'One line of text that slides back and forth when it is wider than its room.',
  points: [
    'The line never wraps; a line that fits stays still.',
    'A line that overflows slides to its end and back, pausing at each end.',
    'The slide stops on hover and while focus is inside it.',
    'Under reduced motion the slide is off and the text ends in an ellipsis.',
    'The full text is the title of the box while it overflows.',
  ],
  instead: '[FoldText] for text that wraps onto lines or cuts the middle of a path.',
  playground: Playground,
  variants: [Sliding, Fits],
  code: CODE,
});

export default meta;
export { Fits, Overview, Playground, Sliding };
