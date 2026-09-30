/* @layer stories @kind story */
import type { StoryLiteMeta, StoryLiteStoryDefinition, StoryLiteArgTypes } from '@storylite/storylite';
import { overviewStory } from '../_template/overview-story';
import { Box, Status, Text } from '../../src/primitives';
import { CONTRAST_PAIRS } from '../tokens/token-lists';
import type { ContrastPair } from '../tokens/token-lists';
import { useContrast } from '../tokens/use-contrast';
import './Contrast.stories.css';

type ContrastArgs = {
  sample: string;
  textThreshold: number;
  largeThreshold: number;
};

const verdict = (ratio: number, threshold: number, label: string) => (
  <Status tone={ratio >= threshold ? 'success' : 'danger'}>
    {`${label} ${ratio >= threshold ? 'pass' : 'fail'}`}
  </Status>
);

const PairRow = ({ pair, args }: { pair: ContrastPair; args: ContrastArgs }) => {
  const { ref, measured } = useContrast();
  return (
    <Box className="contrast-row">
      <Box ref={ref} className="contrast-sample" style={{ color: `var(${pair.text})`, background: `var(${pair.fill})` }}>
        <Text>{args.sample}</Text>
        {' '}
        <Text className="contrast-sample__large">Aa</Text>
      </Box>
      <Box className="contrast-tokens">
        <Text>{pair.text}</Text>
        <Text>{`on ${pair.fill}`}</Text>
      </Box>
      <Text className="contrast-ratio">{measured ? `${measured.ratio.toFixed(2)}:1` : '...'}</Text>
      {measured ? verdict(measured.ratio, args.textThreshold, 'Text') : <Text>...</Text>}
      {measured ? verdict(measured.ratio, args.largeThreshold, 'Large') : <Text>...</Text>}
    </Box>
  );
};

const ContrastTable = (args: ContrastArgs) => (
  <Box className="story-column">
    <Text className="story-label">
      Ratios are computed from the colours the page paints, per WCAG 2.1. Switch the palette or theme to re-measure.
    </Text>
    <Box className="contrast-table">
      {['Sample', 'Pair', 'Ratio', `Text ${args.textThreshold}:1`, `Large ${args.largeThreshold}:1`].map((head) => (
        <Box as="span" key={head} className="story-label">{head}</Box>
      ))}
      {CONTRAST_PAIRS.map((pair) => <PairRow key={`${pair.text}/${pair.fill}`} pair={pair} args={args} />)}
    </Box>
  </Box>
);

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
