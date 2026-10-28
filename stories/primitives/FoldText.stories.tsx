/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
import { Box, FoldText } from '../../src/primitives';
import type { FoldOverflow } from '../../src/primitives';
import { overviewStory } from '../_template/overview-story';
import { FoldTextCells } from './_samples/FoldTextCells';
import { FoldTextHug } from './_samples/FoldTextHug';

type FoldTextArgs = {
  text: string;
  lines: number;
  overflow: FoldOverflow;
};

const LONG = 'Items the player starts the game with, on top of what the world gives. Each name must be an item of the game, and a count above the item limit is cut down to it. Leave the list empty to start with nothing extra.';

const SHORT = 'Items the player starts the game with.';

const FULL = `${LONG} Names are not case sensitive. Duplicates add up, so listing an item twice gives two of it.`;

const ARGS: Partial<FoldTextArgs> = { text: LONG, lines: 2, overflow: 'more' };

const ARG_TYPES: PlaygroundArgTypes<FoldTextArgs> = {
  text: { group: 'Content', control: 'text' },
  lines: { group: 'Appearance', control: 'number' },
  overflow: { group: 'Appearance', control: 'select', options: ['more', 'hint', 'clip'] },
};

const meta = {
  title: 'Primitives · Display/FoldText',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FoldTextArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Box className="story-column">
      <FoldText lines={args.lines} overflow={args.overflow}>{args.text}</FoldText>
    </Box>
  ),
} satisfies PlaygroundStory<FoldTextArgs>;

const Lines = {
  name: 'Two lines, then More and Less',
  render: () => (
    <Box className="story-column">
      <FoldText lines={2}>{LONG}</FoldText>
      <FoldText lines={4}>{LONG}</FoldText>
      <FoldText lines={2}>{SHORT}</FoldText>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const Clip = {
  name: 'Clipped at two lines, with no control',
  render: () => (
    <Box className="story-column">
      <FoldText lines={2} overflow="clip">{LONG}</FoldText>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const Hint = {
  name: 'Clamped to two lines, with the full text in a tip beside it',
  render: () => (
    <Box className="story-column">
      <FoldText lines={2} overflow="hint">{LONG}</FoldText>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const OwnHint = {
  name: 'A hint with its own text',
  render: () => (
    <Box className="story-column">
      <FoldText lines={2} overflow="hint" hint={FULL}>{LONG}</FoldText>
    </Box>
  ),
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const Fill = {
  name: 'fill: a long cell keeps its column width and shows a tip',
  render: () => <FoldTextCells middle={false} />,
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const Middle = {
  name: 'truncate="middle": a path keeps its start and end',
  render: () => <FoldTextCells middle />,
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const Hug = {
  name: 'hug: the text takes its own width and a button sits right after it',
  render: () => <FoldTextHug />,
} satisfies StoryLiteStoryDefinition<FoldTextArgs>;

const Overview = overviewStory({
  component: 'FoldText',
  description: 'A block of text clamped to a few lines, with a More control or a hint that reveals the rest.',
  points: [
    '`lines` sets how many lines show; with none, the text is never clamped.',
    '`overflow="more"` adds a More control that opens the text, and Less folds it again.',
    '`overflow="hint"` keeps the height and shows a tip beside the text; `hint` can give it other text.',
    '`overflow="clip"` cuts the text at `lines` with no control.',
    '`fill` contains the width, so a table cell holding the text does not widen.',
    '`truncate="middle"` keeps one line of a string and cuts the middle; `hug` takes only the width it needs.',
  ],
  instead: '[Disclosure] when a whole section hides behind a summary line.',
  playground: Playground,
  variants: [Lines, Clip, Hint, OwnHint, Fill, Middle, Hug],
});

export default meta;
export { Clip, Fill, Hint, Hug, Lines, Middle, Overview, OwnHint, Playground };
