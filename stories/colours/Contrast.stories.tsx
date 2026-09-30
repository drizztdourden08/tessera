/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Text } from '../../src/primitives';
import { Demonstrator } from '../_template/Demonstrator';
import type { DemonstratorAxis } from '../_template/Demonstrator.type';
import { CONTRAST_PAIRS } from '../tokens/token-lists';
import { ContrastCell } from './ContrastCell';
import type { ContrastColumn } from './ContrastCell.type';

type ContrastArgs = {
  sample: string;
  textThreshold: number;
  largeThreshold: number;
};

const columnsFor = (args: ContrastArgs): readonly DemonstratorAxis<ContrastColumn>[] => [
  { key: 'sample', label: 'Sample' },
  { key: 'ratio', label: 'Ratio' },
  { key: 'text', label: `Text ${args.textThreshold}:1` },
  { key: 'large', label: `Large ${args.largeThreshold}:1` },
];

const ContrastTable = (args: ContrastArgs) => {
  const pairs = new Map(CONTRAST_PAIRS.map((pair) => [`${pair.text}/${pair.fill}`, pair]));
  return (
    <Box className="story-column">
      <Text className="story-label">
        Ratios are computed from the colours the page paints, per WCAG 2.1. Switch the palette or theme to re-measure.
      </Text>
      <Demonstrator
        corner="Pair"
        rows={[...pairs].map(([key, pair]) => ({ key, label: `${pair.text} on ${pair.fill}` }))}
        columns={columnsFor(args)}
        cell={(key, column) => {
          const pair = pairs.get(key);
          const thresholds = { text: args.textThreshold, large: args.largeThreshold };
          return pair ? <ContrastCell pair={pair} column={column} sample={args.sample} thresholds={thresholds} /> : null;
        }}
      />
    </Box>
  );
};

const ARGS: Partial<ContrastArgs> = { sample: '14 of 386 checks', textThreshold: 4.5, largeThreshold: 3 };

const ARG_TYPES: StoryLiteArgTypes<ContrastArgs> = {
    sample: { control: 'text' },
    textThreshold: { control: 'number', description: 'WCAG AA for body text is 4.5' },
    largeThreshold: { control: 'number', description: 'WCAG AA for large text is 3' },
  };

const meta = {
  title: 'Colours/Contrast',
  parameters: { renderer: 'react' },
} satisfies StoryLiteMeta<ContrastArgs>;

const Pairs = {
  name: 'Contrast',
  args: ARGS,
  argTypes: ARG_TYPES,
  render: (args) => <ContrastTable {...args} />,
} satisfies StoryLiteStoryDefinition<ContrastArgs>;

const Overview = overviewStory({
  component: 'Contrast',
  description: 'Every text and surface pair the roles produce, with its contrast ratio computed from the colours the page paints, per WCAG 2.1. Change the sample or the thresholds, or switch the palette or theme, to measure again.',
  playground: Pairs,
  code: false,
  variants: [],
});

export default meta;
export { Overview, Pairs };
