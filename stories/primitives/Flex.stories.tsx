/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { Box, Flex, Text } from '../../src/primitives';
import type { FlexAlign, FlexJustify, SpaceToken } from '../../src/primitives';
import { axis } from '../_template/axis';
import { Demonstrator } from '../_template/Demonstrator';
import { overviewStory } from '../_template/overview-story';
import './Flex.stories.css';

type FlexArgs = {
  direction: 'row' | 'column';
  gap: SpaceToken;
  align: FlexAlign;
  justify: FlexJustify;
  wrap: boolean;
  inline: boolean;
};

const GAPS: readonly SpaceToken[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const ALIGNS: readonly FlexAlign[] = ['start', 'center', 'end', 'stretch', 'baseline'];
const JUSTIFIES: readonly FlexJustify[] = ['start', 'center', 'end', 'between', 'around'];
const PLAYERS = ['Aria', 'Brom', 'Cadence', 'Dov', 'Esker', 'Fen'];

const ARGS: Partial<FlexArgs> = { direction: 'row', gap: 'sm', align: 'center', justify: 'start', wrap: true, inline: false };

const ARG_TYPES: StoryLiteArgTypes<FlexArgs> = {
    direction: { control: 'select', options: ['row', 'column'] },
    gap: { control: 'select', options: [...GAPS] },
    align: { control: 'select', options: [...ALIGNS] },
    justify: { control: 'select', options: [...JUSTIFIES] },
    wrap: { control: 'boolean' },
    inline: { control: 'boolean' },
  };

const meta = {
  title: 'Primitives · Layout/Flex',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<FlexArgs>;

const Playground = {
  name: 'Playground',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => (
    <Flex
      className="flex-demo"
      direction={args.direction}
      gap={args.gap}
      align={args.align}
      justify={args.justify}
      wrap={args.wrap}
      inline={args.inline}
    >
      {PLAYERS.map((player, index) => (
        <Box key={player} className={`flex-demo__item${index === 1 ? ' flex-demo__item--tall' : ''}`}>
          {player}
        </Box>
      ))}
    </Flex>
  ),
} satisfies StoryLiteStoryDefinition<FlexArgs>;

const Justify = {
  name: 'Justify values',
  render: () => (
    <Demonstrator
      rows={axis(JUSTIFIES)}
      align="stretch"
      cell={(justify) => (
        <Flex className="flex-demo flex-demo--short" justify={justify} gap="sm">
          {PLAYERS.slice(0, 3).map((player) => (
            <Box key={player} className="flex-demo__item">{player}</Box>
          ))}
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<FlexArgs>;

const Align = {
  name: 'Align values',
  render: () => (
    <Demonstrator
      rows={axis(ALIGNS)}
      align="stretch"
      cell={(align) => (
        <Flex className="flex-demo flex-demo--short" align={align} gap="sm">
          <Box className="flex-demo__item flex-demo__item--tall">Room 0x12</Box>
          <Box className="flex-demo__item">Chest</Box>
          <Text variant="caption">3 of 5 checks</Text>
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<FlexArgs>;

const GapScale = {
  name: 'Gap scale',
  render: () => (
    <Demonstrator
      rows={axis(GAPS)}
      cell={(gap) => (
        <Flex gap={gap} align="center">
          {PLAYERS.slice(0, 4).map((player) => (
            <Box key={player} className="flex-demo__item">{player}</Box>
          ))}
        </Flex>
      )}
    />
  ),
} satisfies StoryLiteStoryDefinition<FlexArgs>;

const Overview = overviewStory({
  component: 'Flex',
  description: 'The layout primitive for a row or a column of items: a toolbar, a list entry, a label beside its value. Direction, gap, align and justify each take a small fixed set of values, and the gap comes from the space tokens. Wrap lets items flow onto new lines, inline makes it sit in a line of text, and the as prop picks the element it renders.',
  playground: Playground,
  variants: [Justify, Align, GapScale],
});

export default meta;
export { Align, GapScale, Justify, Overview, Playground };
