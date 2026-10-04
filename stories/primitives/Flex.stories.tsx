/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition } from '@storylite/storylite';
import type { PlaygroundArgTypes, PlaygroundStory } from '../_template/controls/playground.type';
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

const ARG_TYPES: PlaygroundArgTypes<FlexArgs> = {
    direction: { group: 'Layout', control: 'select', options: ['row', 'column'] },
    gap: { group: 'Layout', control: 'select', options: [...GAPS] },
    align: { group: 'Layout', control: 'select', options: [...ALIGNS] },
    justify: { group: 'Layout', control: 'select', options: [...JUSTIFIES] },
    wrap: { group: 'Layout', control: 'boolean' },
    inline: { group: 'Layout', control: 'boolean' },
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
} satisfies PlaygroundStory<FlexArgs>;

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
  description: 'Lays items out in a row or a column, such as a toolbar, a list entry or a label beside its value.',
  points: [
    '`direction`, `gap`, `align` and `justify` each take a small fixed set of values.',
    '`gap` takes a space token, so spacing stays on the scale.',
    '`wrap` lets items flow onto new lines; `inline` makes it sit in a line of text.',
    '`as` picks the element it renders.',
  ],
  instead: '[Stack] for a plain column, or [Grid] for equal columns.',
  playground: Playground,
  variants: [Justify, Align, GapScale],
});

export default meta;
export { Align, GapScale, Justify, Overview, Playground };
